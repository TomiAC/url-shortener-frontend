import { BarChart3, Link2, Settings, Shield, Zap } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to manage your links
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to create, manage, and analyze your shortened URLs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Fast Shortening</h3>
            <p className="text-center text-muted-foreground">
              Create short links instantly with our lightning-fast processing.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Detailed Analytics</h3>
            <p className="text-center text-muted-foreground">
              Track clicks, referrers, and geographic data for all your links.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <Link2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Link Management</h3>
            <p className="text-center text-muted-foreground">
              Edit, delete, and organize your links from a simple dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Secure & Reliable</h3>
            <p className="text-center text-muted-foreground">
              Your links are secure and always available when you need them.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Customizable</h3>
            <p className="text-center text-muted-foreground">
              Customize your short links to match your brand or preferences.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="rounded-full bg-primary p-2 text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">User Management</h3>
            <p className="text-center text-muted-foreground">
              Create teams and manage access to your organization's links.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

