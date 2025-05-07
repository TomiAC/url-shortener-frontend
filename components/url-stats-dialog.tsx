"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format, set } from "date-fns"

interface Url {
  id: string
  short_code: string
  long_url: string
  clicks: number
  created_at: string
}

// Mock data for statistics
interface ClickData {
  date: string
  clicks: number
}

interface ReferrerData {
  source: string
  clicks: number
}

interface LocationData {
  country: string
  clicks: number
}

interface UrlStatsDialogProps {
  url: Url
  isOpen: boolean
  onClose: () => void
}

export function UrlStatsDialog({ url, isOpen, onClose }: UrlStatsDialogProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [clicksByDay, setClicksByDay] = useState<ClickData[]>([])
  const [topReferrers, setTopReferrers] = useState<ReferrerData[]>([])
  const [topLocations, setTopLocations] = useState<LocationData[]>([])
  const [totalClicks, setTotalClicks] = useState(0)
  const [createdAt, setCreatedAt] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)

      try {
        // This would connect to your backend API
        const response = await fetch(`https://url-shortener-gqch.onrender.com/url/stats/${url.id}`)
        const data = await response.json()
        console.log(data)
        setTotalClicks(data.clicks)
        setCreatedAt(data.created_at)

        // Mock data
        setClicksByDay([
          { date: "2023-08-01", clicks: 12 },
          { date: "2023-08-02", clicks: 18 },
          { date: "2023-08-03", clicks: 25 },
          { date: "2023-08-04", clicks: 15 },
          { date: "2023-08-05", clicks: 30 },
        ])

        setTopLocations([
        ])
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchStats()
    }
  }, [isOpen, url.id])

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>URL Statistics</DialogTitle>
          <DialogDescription>
            Performance metrics for{" "}
            <a
              href={url.short_code}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline inline-flex items-center"
            >
              {url.short_code}
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{totalClicks}</CardTitle>
                <CardDescription>Total Clicks</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{formatDate(createdAt)}</CardTitle>
                <CardDescription>Created On</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading statistics...</div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Clicks by Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {clicksByDay.map((item) => (
                      <div key={item.date} className="flex items-center justify-between">
                        <span>{formatDate(item.date)}</span>
                        <span className="font-medium">{item.clicks} clicks</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topLocations.map((item) => (
                      <div key={item.country} className="flex items-center justify-between">
                        <span>{item.country}</span>
                        <span className="font-medium">{item.clicks}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )} */}
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

