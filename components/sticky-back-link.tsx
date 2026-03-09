"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const STICKY_TOP_OFFSET = 80

export function StickyBackLink() {
  const thresholdRef = useRef<HTMLDivElement | null>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const updateStickyState = () => {
      const thresholdEl = thresholdRef.current
      if (!thresholdEl) return

      const thresholdTop = thresholdEl.getBoundingClientRect().top + window.scrollY
      setIsStuck(window.scrollY >= thresholdTop - STICKY_TOP_OFFSET)
    }

    updateStickyState()
    window.addEventListener("scroll", updateStickyState, { passive: true })
    window.addEventListener("resize", updateStickyState)

    return () => {
      window.removeEventListener("scroll", updateStickyState)
      window.removeEventListener("resize", updateStickyState)
    }
  }, [])

  return (
    <div className="container mx-auto px-6 pt-5">
      <div className="sticky top-20 z-40 inline-block">
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
      <div ref={thresholdRef} className="mt-2 h-px" aria-hidden />
    </div>
  )
}
