export type RichTextParagraph =
  | string
  | {
      text: string
      links: {
        label: string
        href: string
      }[]
    }

export type ProjectSection =
  | {
      type: "richText"
      heading: string
      paragraphs: RichTextParagraph[]
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
      caption?: RichTextParagraph
    }
  | {
      type: "infographic"
      src: string
      alt: string
      caption?: RichTextParagraph
    }
  | {
      type: "video"
      src: string
      title: string
      poster?: string
      caption?: RichTextParagraph
      autoplay?: boolean
      loop?: boolean
      muted?: boolean
      controls?: boolean
    }
  | {
      type: "gallery"
      heading: string
      intro?: string
      categories: string[]
      images: {
        src: string
        alt: string
        category: string
      }[]
    }
  | {
        type: "figmaEmbed"
        heading?: string
        src: string
        title: string
        caption?: RichTextParagraph
        height?: number
      }
      
export type ProjectLink = {
  label: string
  href: string
  icon: "live" | "github"
}

export type ProjectHeroMedia =
  | {
      type: "image"
      src: string
      alt?: string
    }
  | {
      type: "banner"
      src: string
      alt?: string
    }

export type Project = {
  title: string
  description: string
  image: string
  heroMedia?: ProjectHeroMedia
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  links?: ProjectLink[]
  sections: ProjectSection[]
}
