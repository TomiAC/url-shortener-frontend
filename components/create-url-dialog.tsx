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

interface CreateUrlDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (longUrl: string) => void
}

export function CreateUrlDialog({ isOpen, onClose, onSubmit }: CreateUrlDialogProps) {
  const [longUrl, setLongUrl] = useState("")
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
      setLongUrl("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Short URL</DialogTitle>
            <DialogDescription>Enter a long URL to generate a shortened link.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="longUrl">URL to shorten</Label>
              <Input
                id="longUrl"
                placeholder="https://example.com/very/long/url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                disabled={isLoading}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Short URL"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

