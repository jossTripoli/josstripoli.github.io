"use client"

import Image from "next/image"
import { Expand, X } from "lucide-react"
import { useState } from "react"

import type { ProjectSection } from "@/lib/project-types"

export function ProjectSections({ sections }: { sections: ProjectSection[] }) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      {sections.map((section, index) => {
        if (section.type === "richText") {
          return (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
            </section>
          )
        }

        if (section.type === "bullets") {
          return (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              {section.intro && <p className="text-foreground/80">{section.intro}</p>}
              <ul className="space-y-3 text-foreground/80">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        }

        if (section.type === "timeline") {
          return (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              <ol className="space-y-4 border-l border-border pl-6">
                {section.steps.map((step, stepIndex) => (
                  <li key={step.title} className="relative">
                    <span
                      className="absolute -left-[29px] top-2 h-3 w-3 rounded-full border border-primary bg-background"
                      aria-hidden
                    />
                    <p className="font-semibold text-foreground">
                      {stepIndex + 1}. {step.title}
                    </p>
                    <p className="text-foreground/80">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </section>
          )
        }

        if (section.type === "stats") {
          return (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.stats.map((stat) => (
                  <article key={stat.label} className="rounded-lg border border-border bg-card p-5">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-sm font-medium text-foreground/80">{stat.label}</p>
                    {stat.detail && <p className="mt-2 text-sm text-muted-foreground">{stat.detail}</p>}
                  </article>
                ))}
              </div>
            </section>
          )
        }

        if (section.type === "image") {
          return (
            <section key={index} className="space-y-2">
              <div className="relative overflow-hidden rounded-lg border border-border bg-muted/50">
                <Image src={section.src} alt={section.alt} width={1400} height={900} className="h-auto w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedImage({ src: section.src, alt: section.alt })}
                  className="absolute right-3 top-3 rounded-full border border-white/50 bg-black/45 p-2 text-white transition hover:bg-black/65"
                  aria-label="View image fullscreen"
                >
                  <Expand className="h-4 w-4" />
                </button>
              </div>
              {section.caption && <p className="text-sm text-muted-foreground">{section.caption}</p>}
            </section>
          )
        }

        return (
          <section key={index} className="rounded-lg border-l-4 border-primary bg-primary/5 px-6 py-5">
            <blockquote className="space-y-3">
              <p className="text-lg italic text-foreground/90">“{section.quote}”</p>
              <footer className="text-sm text-muted-foreground">— {section.attribution}</footer>
            </blockquote>
          </section>
        )
      })}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full border border-white/40 bg-black/55 p-2 text-white hover:bg-black/75"
            onClick={() => setSelectedImage(null)}
            aria-label="Close fullscreen image"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-h-[90vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1920}
              height={1200}
              className="max-h-[90vh] w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
