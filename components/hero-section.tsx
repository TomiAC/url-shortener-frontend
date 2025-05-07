import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Shorten your links, expand your reach
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create short, memorable links that redirect to your long URLs. Track clicks, manage your links, and
                optimize your online presence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
          {/* <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-6 shadow-lg">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Shorten a URL</h3>
                  <p className="text-sm text-muted-foreground">Enter a long URL to create a short link</p>
                </div>
                <div className="space-y-2">
                  <input
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="https://example.com/very/long/url/that/needs/shortening"
                    disabled
                  />
                  <Button className="w-full" disabled>
                    Shorten URL
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Sign up to create and manage your short links
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

