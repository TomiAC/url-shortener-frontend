"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Plus } from "lucide-react"
import Cookies from "js-cookie"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { UrlTable } from "@/components/url-table"
import { CreateUrlDialog } from "@/components/create-url-dialog"

interface Url {
  id: string;
  short_code: string;
  long_url: string;
  clicks: number;
  created_at: string;
}

export default function DashboardPage() {
  const [urls, setUrls] = useState<Url[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const token = Cookies.get("access_token");
    console.log(token)
    if (!token) throw new Error("No token found");
    const loadUrls = async () => {

      const response = await fetch("https://url-shortener-gqch.onrender.com/url/get_urls",
        {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token
          }
        }
      )
      
      console.log(response)

      if (!response.ok) {
        if (response.status === 404){
          setUrls([])
          return
        }
      } 

      const data = await response.json()
      console.log("Data: ", data.urls)
      setUrls(data.urls)
    }
    

    loadUrls()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      Cookies.remove("access_token");

      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateUrl = async (long_url: string) => {
    const token = Cookies.get("access_token");
    console.log(token)
    if (!token) throw new Error("No token found");
    try {
      const response = await fetch("https://url-shortener-gqch.onrender.com/url/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ long_url }),
      })
      const data = await response.json()
      console.log("Data: ", data)

      // Create a mock new URL
      const newUrl = {
        id: data.id,
        short_code: data.short_code,
        long_url: data.long_url,
        clicks: data.clicks,
        created_at: data.created_at,
      }

      setUrls([newUrl, ...urls])
      setIsDialogOpen(false)

      toast({
        title: "URL shortened!",
        description: "Your new short URL has been created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create short URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUrl = async (id: string) => {
    const token = Cookies.get("access_token");
    console.log(token)
    if (!token) throw new Error("No token found");
    try {

      const response = await fetch(`https://url-shortener-gqch.onrender.com/url/delete/${id}`, 
      { method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token } }
      )

      if (!response.ok) throw new Error("Failed to delete URL")

      setUrls(urls.filter((url) => url.id !== id))

      toast({
        title: "URL deleted",
        description: "The URL has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditUrl = async (id: string, long_url: string) => {
    const token = Cookies.get("access_token");
    console.log(token)
    if (!token) throw new Error("No token found");
    try {
      const response = await fetch(`https://url-shortener-gqch.onrender.com/url/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ long_url }),
      })

      if (!response.ok) throw new Error("Failed to delete URL")

      setUrls(urls.map((url) => (url.id === id ? { ...url, long_url } : url)))

      toast({
        title: "URL updated",
        description: "The URL has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCopyUrl = (shortUrl: string) => {
    navigator.clipboard.writeText("https://url-shortener-gqch.onrender.com/"+ shortUrl)
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Short</span>Link
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoading}>
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your URLs</h1>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New URL
            </Button>
          </div>

          {urls.length === 0 ? (
            <p className="text-center text-gray-500">Aún no hay URLs registradas</p>
          ) : (
            <UrlTable urls={urls} onDelete={handleDeleteUrl} onEdit={handleEditUrl} onCopy={handleCopyUrl} />
          )}
        </div>
      </main>

      <CreateUrlDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSubmit={handleCreateUrl} />
    </div>
  )
}

