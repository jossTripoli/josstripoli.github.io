"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import type { ProjectSection } from "@/lib/project-types"

const FBI_REPORT_TEXT = "FBI’s Annual Internet Crime Report"
const FBI_REPORT_URL = "https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report"

type ModalState = {
  images: { src: string; alt: string }[]
  index: number
}

function renderParagraph(paragraph: string) {
  if (!paragraph.includes(FBI_REPORT_TEXT)) {
    return paragraph
  }

  const [before, after] = paragraph.split(FBI_REPORT_TEXT)

  return (
    <>
      {before}
      <a
        href={FBI_REPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4"
      >
        {FBI_REPORT_TEXT}
      </a>
      {after}
    </>
  )
}

export function ProjectSections({ sections }: { sections: ProjectSection[] }) {
  const [modalState, setModalState] = useState<ModalState | null>(null)
  const [activeFilters, setActiveFilters] = useState<Record<number, string>>({})

  useEffect(() => {
    if (!modalState) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [modalState])

  useEffect(() => {
    if (!modalState) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalState(null)
      }

      if (event.key === "ArrowRight") {
        setModalState((current) => {
          if (!current) return current
          return { ...current, index: (current.index + 1) % current.images.length }
        })
      }

      if (event.key === "ArrowLeft") {
        setModalState((current) => {
          if (!current) return current
          return { ...current, index: (current.index - 1 + current.images.length) % current.images.length }
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalState])

  const activeModalImage = useMemo(() => {
    if (!modalState) return null
    return modalState.images[modalState.index]
  }, [modalState])

  return (
    <>
      {sections.map((section, index) => {
        if (section.type === "richText") {
          return (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{renderParagraph(paragraph)}</p>
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
                <button
                  type="button"
                  onClick={() => setModalState({ images: [{ src: section.src, alt: section.alt }], index: 0 })}
                  className="block w-full cursor-zoom-in"
                  aria-label="View image fullscreen"
                >
                  <Image src={section.src} alt={section.alt} width={1400} height={900} className="h-auto w-full object-cover" />
                </button>
                <button
                  type="button"
                  onClick={() => setModalState({ images: [{ src: section.src, alt: section.alt }], index: 0 })}
                  className="absolute right-3 top-3 rounded-full border border-white/50 bg-black/45 p-2 text-white transition hover:bg-black/65"
                  aria-label="Open fullscreen image"
                >
                  <Expand className="h-4 w-4" />
                </button>
              </div>
              {section.caption && <p className="text-sm text-muted-foreground">{section.caption}</p>}
            </section>
          )
        }

        if (section.type === "gallery") {
          const activeFilter = activeFilters[index] ?? "All"
          const filterCategories = ["All", ...section.categories]
          const filteredImages =
            activeFilter === "All" ? section.images : section.images.filter((image) => image.category === activeFilter)

          return (
            <section key={index} className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
              {section.intro && <p className="text-foreground/80">{section.intro}</p>}

              <div className="flex flex-wrap gap-2">
                {filterCategories.map((category) => {
                  const isActive = category === activeFilter

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveFilters((current) => ({ ...current, [index]: category }))}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/60 hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredImages.map((image, imageIndex) => (
                  <button
                    key={`${image.src}-${image.alt}`}
                    type="button"
                    onClick={() =>
                      setModalState({
                        images: filteredImages.map((galleryImage) => ({ src: galleryImage.src, alt: galleryImage.alt })),
                        index: imageIndex,
                      })
                    }
                    className="group relative overflow-hidden rounded-lg border border-border bg-muted/40 text-left"
                    aria-label={`Open ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1000}
                      height={700}
                      className="aspect-[4/3] w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs text-white">
                      {image.category}
                    </div>
                  </button>
                ))}
              </div>
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

      {modalState && activeModalImage && (
        <div
          className="fixed inset-0 z-50 h-[100dvh] w-screen bg-black/80 shadow-[0_0_120px_rgba(0,0,0,0.8)]"
          onClick={() => setModalState(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-10 rounded-full border border-white/40 bg-black/55 p-2 text-white hover:bg-black/75"
            onClick={() => setModalState(null)}
            aria-label="Close fullscreen image"
          >
            <X className="h-5 w-5" />
          </button>

          {modalState.images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/40 bg-black/55 p-2 text-white hover:bg-black/75 sm:left-6"
                onClick={(event) => {
                  event.stopPropagation()
                  setModalState((current) => {
                    if (!current) return current
                    return { ...current, index: (current.index - 1 + current.images.length) % current.images.length }
                  })
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/40 bg-black/55 p-2 text-white hover:bg-black/75 sm:right-6"
                onClick={(event) => {
                  event.stopPropagation()
                  setModalState((current) => {
                    if (!current) return current
                    return { ...current, index: (current.index + 1) % current.images.length }
                  })
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="flex h-full w-full items-center justify-center p-4" onClick={(event) => event.stopPropagation()}>
            <Image
              src={activeModalImage.src}
              alt={activeModalImage.alt}
              width={2400}
              height={1600}
              className="h-auto max-h-[90dvh] w-auto max-w-[90vw] rounded-md object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}