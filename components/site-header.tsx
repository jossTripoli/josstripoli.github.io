"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { MouseEvent, useState } from "react"
import { scrollToHash } from "@/lib/scroll"

type SiteHeaderProps = {
  sectionBasePath?: "" | "/"
}

export function SiteHeader({ sectionBasePath = "" }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const hrefFor = (section: "about" | "work" | "contact") => `${sectionBasePath}#${section}`
  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, hash: "#about" | "#work" | "#contact") => {
    if (sectionBasePath) return
    event.preventDefault()
    scrollToHash(hash)
  }

  return (
    <header className="top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base font-semibold text-foreground uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Image src="/initials-logo.svg" alt="Logo" width={80} height={80} className="w-14 h-14" />
              <span className="ml-2">Joss Tripoli</span>
              <span className="rounded-full bg-secondary-purple px-3 py-1 text-xs tracking-wide text-primary">Portfolio</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8">
            <a
              href={hrefFor("about")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={(event) => handleSectionClick(event, "#about")}
            >
              About
            </a>
            <a
              href={hrefFor("work")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={(event) => handleSectionClick(event, "#work")}
            >
              Work
            </a>
            <a
              href={hrefFor("contact")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={(event) => handleSectionClick(event, "#contact")}
            >
              Contact
            </a>
          </div>

          <button
            className="rounded-md p-2 text-foreground transition-colors hover:bg-accent md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mt-2 flex flex-col gap-4 border-t border-border pb-4 pt-4">
              <a
                href={hrefFor("about")}
                className={`px-2 py-1 text-sm text-muted-foreground transition-all hover:text-foreground ${
                  mobileMenuOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"
                } duration-300`}
                onClick={(event) => {
                  handleSectionClick(event, "#about")
                  setMobileMenuOpen(false)
                }}
              >
                About
              </a>
              <a
                href={hrefFor("work")}
                className={`px-2 py-1 text-sm text-muted-foreground transition-all hover:text-foreground ${
                  mobileMenuOpen ? "translate-y-0 opacity-100 delay-150" : "-translate-y-2 opacity-0"
                } duration-300`}
                onClick={(event) => {
                  handleSectionClick(event, "#work")
                  setMobileMenuOpen(false)
                }}
              >
                Work
              </a>
              <a
                href={hrefFor("contact")}
                className={`px-2 py-1 text-sm text-muted-foreground transition-all hover:text-foreground ${
                  mobileMenuOpen ? "translate-y-0 opacity-100 delay-200" : "-translate-y-2 opacity-0"
                } duration-300`}
                onClick={(event) => {
                  handleSectionClick(event, "#contact")
                  setMobileMenuOpen(false)
                }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}