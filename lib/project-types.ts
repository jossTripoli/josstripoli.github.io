export type ProjectSection =
  | {
      type: "richText"
      heading: string
      paragraphs: string[]
    }
  | {
      type: "bullets"
      heading: string
      intro?: string
      items: string[]
    }
  | {
      type: "timeline"
      heading: string
      steps: {
        title: string
        detail: string
      }[]
    }
  | {
      type: "stats"
      heading: string
      stats: {
        label: string
        value: string
        detail?: string
      }[]
    }
  | {
      type: "quote"
      quote: string
      attribution: string
    }
  | {
      type: "image"
      src: string
      alt: string
      caption?: string
    }

export type ProjectLink = {
  label: string
  href: string
  icon: "live" | "github"
}

export type Project = {
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  links?: ProjectLink[]
  sections: ProjectSection[]
}
