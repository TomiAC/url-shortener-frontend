import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Short</span>Link
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline">
            Login
          </Link>
          <Button asChild size="sm">
            <Link href="/register">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  )
}

