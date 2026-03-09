"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function StickyBackLink() {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px",
      },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden />
      <div className="container sticky top-20 z-40 mx-auto px-6 pt-5">
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
    </>
  )
}
