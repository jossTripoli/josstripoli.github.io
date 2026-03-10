import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectSections } from "@/components/project-sections"
import { StickyBackLink } from "@/components/sticky-back-link"
import { SiteHeader } from "@/components/site-header"
import type { Project, ProjectLink } from "@/lib/project-types"

const projectData: Record<string, Project> = {
  "dart-academy": {
    title: "DART Academy",
    description:
      "E-learning platform designed to help older adults build confidence online and recognize digital scams.",
    image: "/demo/dart.gif",
    liveUrl: "https://app.dartacademy.net/",
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
        heading: "The Rising Threat of Online Scams",
        paragraphs: [
          {
            text: "Online scams are a rapidly growing threat, particularly for older adults. In a single year, 147,127 Americans aged 60+ reported being victims of online scams, resulting in $4.8 billion in losses, according to the FBI's Annual Internet Crime Report.",
            links: [
              {
                label: "FBI's Annual Internet Crime Report",
                href: "https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report",
              },
            ],
          },
          {
            text: "Reporting by *The New York Times* has revealed that many of these scams are not isolated efforts by individual fraudsters, but highly organized, industrial-scale operations run by transnational crime syndicates. They run detailed internal \"playbooks\" that train workers step by step in how to manipulate victims and defraud them of their money. If criminal networks rely on structured training to carry out fraud at scale, people need equally structured education to recognize and resist these tactics.",
            links: [
              {
                label: "Reporting by *The New York Times*",
                href: "https://www.nytimes.com/2026/01/13/world/asia/myanmar-scam-complex-fraud.html",
              },
            ],
          },
        ],
      },
      {
        type: "image",
        src: "/dart/scam_stats.png",
        alt: "DART Academy platform overview",
        caption: {
          text: "Online scam complaints and losses by age group. Adults 60+ experience the greatest financial losses. Source: FBI Internet Crime Report.",
          links: [
            {
              label: "FBI Internet Crime Report",
              href: "https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report",
            },
          ],
        },
      },
      {
        type: "richText",
        heading: "Research collaboration",
        paragraphs: [
          "To address this problem, a multi-university research collaboration led by the University at Buffalo launched the Deception Awareness and Resilience Training (DART) initiative, supported by a $5 million National Science Foundation Convergence Accelerator grant. The project brings together researchers from institutions including Cornell University, Clemson University, Lehigh University, and the University of Illinois to develop tools that help people recognize and resist online deception.",
        ],
      },
      {
        type: "image",
        src: "/dart/dart_team.png",
        alt: "DART initiative research collaboration",
        caption: "Image 2",
      },
      {
        type: "richText",
        heading: "My role",
        paragraphs: [
          "As a technical lead and founding engineer, I worked with researchers and educators across the collaboration to design and build DART Academy, an interactive learning system that teaches users to identify scams through realistic simulations, structured lessons, and hands-on practice. I led product design and prototyping in Figma and participated in 100+ customer discovery interviews through the NSF National I-Corps program, translating user insights into the platform's learning flows and features.",
          "I architected and built the system's learning management infrastructure, including the course player, content authoring tools, and interactive training framework. I also assembled and led a rotating development team of student engineers over multiple years, mentoring developers through system design, implementation, and deployment as the platform evolved.",
        ],
      },
      {
        type: "infographic",
        src: "/dart/dart_architecture.png",
        alt: "DART Academy learning platform interface",
        caption: "Image 3",
      },
      
      {
        type: "gallery",
        heading: "DART Academy illustration gallery",
        intro: "Custom visual assets created for DART Academy experiences, grouped by instructional purpose.",
        categories: ["Scam", "Gamification", "Decorative"],
        images: [
          { src: "/dart/gallery/badges1.svg", alt: "Badges", category: "Gamification" },
          { src: "/dart/gallery/badges2.svg", alt: "Badges", category: "Gamification" },
          { src: "/dart/gallery/badges3.svg", alt: "Badges", category: "Gamification" },
          { src: "/dart/gallery/badges4.svg", alt: "Badges", category: "Gamification" },

          { src: "/dart/gallery/search_result_scam.png", alt: "Malicious search result illustration", category: "Scam" },
          { src: "/dart/gallery/identity_theft_phishing.png", alt: "Identity theft and phishing illustration", category: "Scam" },
          { src: "/dart/gallery/medical_information_identity_theft.svg", alt: "Medical information identity theft illustration", category: "Decorative" },
          { src: "/dart/gallery/credit_card.svg", alt: "Credit card security illustration", category: "Decorative" },
          { src: "/dart/gallery/megaphone.png", alt: "Megaphone communication illustration", category: "Decorative" },
          { src: "/dart/gallery/phishing_call.png", alt: "Phishing call illustration", category: "Scam" },
          { src: "/dart/gallery/grandparent_scam.png", alt: "Grandparent scam illustration", category: "Scam" },

          // { src: "/dart/gallery/female.png", alt: "Female character", category: "Scam" },
          // { src: "/dart/gallery/male.png", alt: "Male character", category: "Scam" },
          { src: "/dart/gallery/supplement.svg", alt: "Smishing text scam illustration", category: "Scam" },
          { src: "/dart/gallery/check_url.svg", alt: "Check URL scam recognition illustration", category: "Scam" },
          { src: "/dart/gallery/legal.svg", alt: "Legal threat scam illustration", category: "Decorative" },
          { src: "/dart/gallery/giftcard.svg", alt: "Gift card scam illustration", category: "Decorative" },

          { src: "/dart/gallery/progress.png", alt: "Progress tracking illustration", category: "Gamification" },
          { src: "/dart/gallery/progress2.png", alt: "Progress tracking illustration", category: "Gamification" },
          { src: "/dart/gallery/progress3.png", alt: "Progress tracking illustration", category: "Gamification" },
          { src: "/dart/gallery/red_flag.png", alt: "Red flag warning illustration", category: "Decorative" },
          { src: "/dart/gallery/reflection.svg", alt: "Reflection activity illustration", category: "Decorative" },
          { src: "/dart/gallery/sweepstake.svg", alt: "Sweepstake scam illustration", category: "Scam" },
          { src: "/dart/gallery/target.png", alt: "Target audience illustration", category: "Scam" },
          // { src: "/dart/gallery/anonymous_profiles.png", alt: "anonymous_profiles.png", category: "Decorative" },
          { src: "/dart/gallery/tax.png", alt: "IRS Tax Scam Mail", category: "Scam" },
          { src: "/dart/gallery/dont-close-browser.svg", alt: "Cross through mouse clicking the top right x button in the browser demonstrating not to click fake popups", category: "Scam" },
          { src: "/dart/gallery/romace_word_cloud.png", alt: "Word cloud of the emotional effects of romance scams", category: "Decorative" },
          { src: "/dart/gallery/emotional_words.png", alt: "Emotional words", category: "Decorative" },
          { src: "/dart/gallery/cert.png", alt: "Certificate example", category: "Decorative" },

          // { src: "/dart/gallery/fake_site.png", alt: "Certificate example", category: "Decorative" },
          // { src: "/dart/gallery/aging_scam.png", alt: "Certificate example", category: "Decorative" },
          // { src: "/dart/gallery/activity.png", alt: "Certificate example", category: "Decorative" },

        ],
      },

    ],
  },
  "miniature-reserve": {
    title: "MiniNature Reserve",
    description:
      "A nonprofit web platform for urban biodiversity programs, volunteers, and educational outreach.",
    image: "/demo/mininature.gif",
    liveUrl: "https://mininaturereserve.org/",
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
          "Students often understand that trolling is harmful but don't always recognize subtler forms like dogpiling, baiting, or sarcastic harassment.",
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
    liveUrl: "https://docs.cse.lehigh.edu/",
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

      <StickyBackLink />

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
                    <Button key={link.href + link.label} className="h-12 px-10 text-xl" variant={link.icon === "github" ? "outline" : "default"} asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="mr-2 h-5! w-5!" />
                        {link.label}
                        <ExternalLink className="ml-2 h-5! w-5!" />
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

          <ProjectSections sections={project.sections} />

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