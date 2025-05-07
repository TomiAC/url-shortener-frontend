"use client"

import { useState } from "react"
import { BarChart2, Copy, Edit, ExternalLink, MoreHorizontal, Trash } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditUrlDialog } from "@/components/edit-url-dialog"
import { UrlStatsDialog } from "@/components/url-stats-dialog"

const BASE_URL = "https://url-shortener-gqch.onrender.com/"

interface Url {
  id: string
  short_code: string
  long_url: string
  clicks: number
  created_at: string
}

interface UrlTableProps {
  urls: Url[]
  onDelete: (id: string) => void
  onEdit: (id: string, longUrl: string) => void
  onCopy: (shortUrl: string) => void
}

export function UrlTable({ urls, onDelete, onEdit, onCopy }: UrlTableProps) {
  const [editingUrl, setEditingUrl] = useState<Url | null>(null)
  const [viewingStats, setViewingStats] = useState<Url | null>(null)

  const handleEdit = (url: Url) => {
    setEditingUrl(url)
  }

  const handleViewStats = (url: Url) => {
    setViewingStats(url)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short URL</TableHead>
              <TableHead className="hidden md:table-cell">Long URL</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No URLs found. Create your first short URL to get started.
                </TableCell>
              </TableRow>
            ) : (
              urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <a
                        href={BASE_URL + url.short_code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center"
                      >
                        {url.short_code}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-muted-foreground">{truncateUrl(url.long_url)}</span>
                  </TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(url.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onCopy(url.short_code)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewStats(url)}>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          View Stats
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(url)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(url.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingUrl && (
        <EditUrlDialog
          url={editingUrl}
          isOpen={!!editingUrl}
          onClose={() => setEditingUrl(null)}
          onSubmit={(longUrl) => {
            onEdit(editingUrl.id, longUrl)
            setEditingUrl(null)
          }}
        />
      )}

      {viewingStats && (
        <UrlStatsDialog url={viewingStats} isOpen={!!viewingStats} onClose={() => setViewingStats(null)} />
      )}
    </>
  )
}

