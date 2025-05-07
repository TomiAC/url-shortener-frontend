"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Url {
  id: string
  short_code: string
  long_url: string
  clicks: number
  created_at: string
}

interface EditUrlDialogProps {
  url: Url
  isOpen: boolean
  onClose: () => void
  onSubmit: (long_url: string) => void
}

export function EditUrlDialog({ url, isOpen, onClose, onSubmit }: EditUrlDialogProps) {
  const [longUrl, setLongUrl] = useState(url.long_url)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!longUrl) {
      setError("Please enter a URL")
      return
    }

    try {
      new URL(longUrl)
    } catch (err) {
      setError("Please enter a valid URL")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await onSubmit(longUrl)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit URL</DialogTitle>
            <DialogDescription>
              Update the destination URL for <span className="font-medium">{url.short_code}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="longUrl">Destination URL</Label>
              <Input id="longUrl" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} disabled={isLoading} />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

