"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const STICKY_TOP_OFFSET = 80

export function StickyBackLink() {
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const [isStuck, setIsStuck] = useState(false)
  const [triggerScrollY, setTriggerScrollY] = useState<number | null>(null)

  useEffect(() => {
    const measure = () => {
      const stickyEl = stickyRef.current
      if (!stickyEl) return

      const top = stickyEl.getBoundingClientRect().top + window.scrollY
      setTriggerScrollY(top)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const updateStickyState = () => {
      if (triggerScrollY === null) {
        setIsStuck(false)
        return
      }

      setIsStuck(window.scrollY > triggerScrollY - STICKY_TOP_OFFSET + 16)
    }

    updateStickyState()
    window.addEventListener("scroll", updateStickyState, { passive: true })
    return () => window.removeEventListener("scroll", updateStickyState)
  }, [triggerScrollY])

  return (
    <div ref={stickyRef} className="container static xl:sticky top-0 z-40 mx-auto px-6 pt-5">
      <Link
        href="/#work"
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all ${
          isStuck
            ? "border border-border bg-background/95 shadow-sm backdrop-blur hover:bg-muted"
            : "border border-transparent bg-transparent"
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Projects
      </Link>
    </div>
  )
}
