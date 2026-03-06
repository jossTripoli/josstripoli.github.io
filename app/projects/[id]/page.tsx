import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

type ProjectSection =
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

type ProjectLink = {
  label: string
  href: string
  icon: "live" | "github"
}

type Project = {
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  links?: ProjectLink[]
  sections: ProjectSection[]
}

const projectData: Record<string, Project> = {
  "dart-academy": {
    title: "DART Academy",
    description:
      "E-learning platform designed to help older adults build confidence online and recognize digital scams.",
    image: "/demo/dart.gif",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Tailwind CSS",
      "Zustand",
      "OpenAI API",
      "Stripe API",
      "AWS",
    ],
    sections: [
      {
        type: "richText",
        heading: "Project Story",
        paragraphs: [
          "DART Academy started as a response to a growing pattern: older adults were being targeted by increasingly sophisticated phishing, romance, and impersonation scams.",
          "Rather than designing another static awareness site, the goal was to create a guided learning experience that feels supportive, practical, and confidence-building.",
        ],
      },
      {
        type: "timeline",
        heading: "How the experience is structured",
        steps: [
          {
            title: "Onboarding",
            detail: "Learners set goals and complete a lightweight baseline assessment.",
          },
          {
            title: "Scenario-driven modules",
            detail: "Lessons use realistic simulations (emails, texts, calls) and immediate feedback.",
          },
          {
            title: "Practice & reinforcement",
            detail: "Spaced review and mini challenges reinforce pattern recognition over time.",
          },
          {
            title: "Reflection",
            detail: "Learners receive plain-language summaries of growth and areas to revisit.",
          },
        ],
      },
      {
        type: "stats",
        heading: "Outcome snapshot",
        stats: [
          { label: "Learner completion rate", value: "87%" },
          { label: "Confidence increase", value: "+41%", detail: "Self-reported after module completion." },
          { label: "Avg. time per lesson", value: "9 min" },
        ],
      },
      {
        type: "quote",
        quote:
          "This project proved that digital safety education works best when it respects people’s pace and lived experience.",
        attribution: "Design principle used throughout DART Academy",
      },
    ],
  },
  "miniature-reserve": {
    title: "MiniNature Reserve",
    description:
      "A nonprofit web platform for urban biodiversity programs, volunteers, and educational outreach.",
    image: "/demo/mininature.gif",
    tech: ["Next.js", "Payload CMS", "Shopify", "TypeScript", "Tailwind CSS", "Vercel", "Lexical"],
    sections: [
      {
        type: "richText",
        heading: "Narrative focus",
        paragraphs: [
          "This site was intentionally designed like a campaign journal, not a standard nonprofit brochure.",
          "Each page balances storytelling and action: documenting restoration progress while guiding visitors toward volunteering, donating, or planting native species.",
        ],
      },
      {
        type: "bullets",
        heading: "Content architecture",
        intro: "The IA prioritizes recurring community interactions:",
        items: [
          "Program pages with seasonal updates and before/after visuals",
          "Volunteer hub with upcoming events and registration",
          "Education resources for teachers and neighborhood groups",
          "Native plant shop integration for at-home participation",
        ],
      },
      {
        type: "stats",
        heading: "Community signals",
        stats: [
          { label: "Volunteer signups", value: "+63%" },
          { label: "Returning visitors", value: "52%" },
          { label: "Avg. pages per session", value: "4.8" },
        ],
      },
    ],
  },
  "online-trolling-education": {
    title: "Online Trolling Education Module",
    description:
      "Interactive learning module that teaches students how to identify, de-escalate, and report harmful online behavior.",
    image: "/demo/troll.gif",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Semantic UI", "jQuery", "Video.js"],
    sections: [
      {
        type: "richText",
        heading: "Why this module exists",
        paragraphs: [
          "Students often understand that trolling is harmful but don’t always recognize subtler forms like dogpiling, baiting, or sarcastic harassment.",
          "The module is built around realistic social contexts where learners can safely practice decision-making before facing these moments in real life.",
        ],
      },
      {
        type: "timeline",
        heading: "Learning flow",
        steps: [
          { title: "Scenario setup", detail: "Learners meet a cast of peers in a simulated social feed." },
          { title: "Branching decisions", detail: "Multiple response options unlock different consequences." },
          { title: "Debrief", detail: "Facilitator notes and evidence-based guidance explain outcomes." },
        ],
      },
      {
        type: "bullets",
        heading: "Instructor toolkit",
        items: [
          "Pre/post check-ins to measure confidence and comprehension",
          "Printable discussion prompts for classroom facilitation",
          "Quick intervention guidance for escalating cases",
        ],
      },
    ],
  },
  "cs-documentation-site": {
    title: "Lehigh University Computer Science Documentation Websites",
    description:
      "Course documentation ecosystem that helps students find the right answer quickly across multiple classes.",
    image: "/demo/sics.gif",
    tech: ["Moodle LMS", "MkDocs", "Markdown", "HTML", "CSS", "JavaScript"],
    sections: [
      {
        type: "richText",
        heading: "Design objective",
        paragraphs: [
          "The challenge was not writing content — it was reducing search friction across many overlapping course resources.",
          "Instead of a single monolithic doc set, we created a documentation ecosystem with consistent patterns and course-specific voice.",
        ],
      },
      {
        type: "bullets",
        heading: "Information design choices",
        items: [
          "Shallow, predictable navigation for novice users",
          "Task-first page titles (e.g., 'Submit Assignment', 'Run Tests')",
          "Versioned pages for semester-specific differences",
          "Reusable snippets to keep guidance consistent across courses",
        ],
      },
      {
        type: "stats",
        heading: "Documentation impact",
        stats: [
          { label: "Time-to-answer reduction", value: "-70%" },
          { label: "Daily active users", value: "5,000+" },
          { label: "Global page speed", value: "<1s" },
        ],
      },
    ],
  },
  collaboreat: {
    title: "Collaboreat",
    description:
      "A collaborative meal-planning and kitchen workflow platform supporting teams, students, and community organizations.",
    image: "/demo/collaboreat.png",
    tech: ["PHP", "MySQL", "Moodle", "JavaScript", "CSS"],
    sections: [
      {
        type: "quote",
        quote: "Collaboration is the product: every screen should help groups decide, plan, and execute together.",
        attribution: "North-star statement for the project",
      },
      {
        type: "richText",
        heading: "Product framing",
        paragraphs: [
          "Collaboreat combines planning, assignment, and reflection in one workspace so food-centered teams can coordinate without scattered tools.",
          "The interface emphasizes role clarity and low-friction updates, especially for part-time or rotating contributors.",
        ],
      },
      {
        type: "timeline",
        heading: "Typical team journey",
        steps: [
          { title: "Plan", detail: "Draft menus and ingredient needs based on event goals and constraints." },
          { title: "Coordinate", detail: "Assign prep, purchasing, and timing responsibilities across the group." },
          { title: "Execute", detail: "Track progress with lightweight status updates and shared checklists." },
          { title: "Review", detail: "Capture lessons learned to improve future events and reduce waste." },
        ],
      },
    ],
  },
}

const projectOrder = [
  "dart-academy",
  "miniature-reserve",
  "online-trolling-education",
  "cs-documentation-site",
  "collaboreat",
] as const

function renderProjectSection(section: ProjectSection, index: number) {
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

  return (
    <section key={index} className="rounded-lg border-l-4 border-primary bg-primary/5 px-6 py-5">
      <blockquote className="space-y-3">
        <p className="text-lg italic text-foreground/90">“{section.quote}”</p>
        <footer className="text-sm text-muted-foreground">— {section.attribution}</footer>
      </blockquote>
    </section>
  )
}


export async function generateStaticParams() {
  return Object.keys(projectData).map((id) => ({ id }))
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projectData[id]
  const projectIndex = projectOrder.indexOf(id as (typeof projectOrder)[number])
  const previousProjectId = projectIndex > 0 ? projectOrder[projectIndex - 1] : null
  const nextProjectId = projectIndex >= 0 && projectIndex < projectOrder.length - 1 ? projectOrder[projectIndex + 1] : null

  if (!project) {
    notFound()
  }

  const actionLinks: ProjectLink[] = [
    ...(project.liveUrl ? [{ label: "Live Site", href: project.liveUrl, icon: "live" as const }] : []),
    ...(project.githubUrl ? [{ label: "GitHub", href: project.githubUrl, icon: "github" as const }] : []),
    ...(project.links ?? []),
  ]

  return (
    <div className="min-h-screen">
      <SiteHeader sectionBasePath="/" />

      <div className="container mx-auto px-6 pt-5">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Projects
        </Link>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 pb-20">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-bold text-foreground md:text-5xl">{project.title}</h1>
            <p className="text-xl text-foreground/70">{project.description}</p>
            {actionLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {actionLinks.map((link) => {
                  const Icon = link.icon === "github" ? Github : Globe
                  return (
                    <Button key={link.href + link.label} variant={link.icon === "github" ? "outline" : "default"} asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="mr-2 h-4 w-4" />
                        {link.label}
                        <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {project.sections.map((section, index) => renderProjectSection(section, index))}

          <div className="border-t border-border pt-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {previousProjectId ? (
                <Button variant="outline" asChild>
                  <Link href={`/projects/${previousProjectId}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Project
                  </Link>
                </Button>
              ) : (
                <span />
              )}

              {nextProjectId ? (
                <Button asChild>
                  <Link href={`/projects/${nextProjectId}`}>
                    Next Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
