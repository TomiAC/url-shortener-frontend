// This file contains functions to interact with the backend API
// Replace these with actual API calls to your backend

export interface Url {
  id: string
  shortUrl: string
  longUrl: string
  clicks: number
  createdAt: string
}

// Function to get all URLs for the current user
export async function getUserUrls(): Promise<Url[]> {
  // Replace with actual API call
  // const response = await fetch('/api/urls')
  // return response.json()

  // Mock data for demonstration
  return [
    {
      id: "1",
      shortUrl: "short.ly/abc123",
      longUrl: "https://example.com/very/long/url/that/needs/shortening/1",
      clicks: 245,
      createdAt: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      shortUrl: "short.ly/def456",
      longUrl: "https://example.com/very/long/url/that/needs/shortening/2",
      clicks: 187,
      createdAt: "2023-06-20T14:45:00Z",
    },
    {
      id: "3",
      shortUrl: "short.ly/ghi789",
      longUrl: "https://example.com/very/long/url/that/needs/shortening/3",
      clicks: 92,
      createdAt: "2023-07-05T09:15:00Z",
    },
  ]
}

// Function to create a new short URL
export async function createShortUrl(longUrl: string): Promise<Url> {
  // Replace with actual API call
  // const response = await fetch('/api/urls', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ longUrl }),
  // })
  // return response.json()

  // Mock response for demonstration
  return {
    id: "4",
    shortUrl: `short.ly/${Math.random().toString(36).substring(2, 8)}`,
    longUrl,
    clicks: 0,
    createdAt: new Date().toISOString(),
  }
}

// Function to update an existing URL
export async function updateUrl(id: string, longUrl: string): Promise<Url> {
  // Replace with actual API call
  // const response = await fetch(`/api/urls/${id}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ longUrl }),
  // })
  // return response.json()

  // Mock response for demonstration
  return {
    id,
    shortUrl: "short.ly/abc123",
    longUrl,
    clicks: 245,
    createdAt: "2023-05-15T10:30:00Z",
  }
}

// Function to delete a URL
export async function deleteUrl(id: string): Promise<void> {
  // Replace with actual API call
  // await fetch(`/api/urls/${id}`, {
  //   method: 'DELETE',
  // })

  // Mock response for demonstration
  return Promise.resolve()
}

// Function to get statistics for a URL
export async function getUrlStats(id: string): Promise<any> {
  // Replace with actual API call
  // const response = await fetch(`/api/urls/${id}/stats`)
  // return response.json()

  // Mock response for demonstration
  return {
    clicksByDay: [
      { date: "2023-08-01", clicks: 12 },
      { date: "2023-08-02", clicks: 18 },
      { date: "2023-08-03", clicks: 25 },
      { date: "2023-08-04", clicks: 15 },
      { date: "2023-08-05", clicks: 30 },
    ],
    topReferrers: [
      { source: "Direct", clicks: 45 },
      { source: "Twitter", clicks: 32 },
      { source: "Facebook", clicks: 28 },
      { source: "LinkedIn", clicks: 15 },
    ],
    topLocations: [
      { country: "United States", clicks: 65 },
      { country: "United Kingdom", clicks: 23 },
      { country: "Canada", clicks: 18 },
      { country: "Germany", clicks: 12 },
    ],
  }
}

