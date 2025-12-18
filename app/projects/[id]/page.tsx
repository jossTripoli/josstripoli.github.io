import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { notFound } from "next/navigation"

const projectData: Record<
  string,
  {
    title: string
    description: string
    longDescription: string[]
    tech: string[]
    image: string
    liveUrl?: string
    githubUrl?: string
    challenge: string
    solution: string
    impact: string
  }
> = {
  "dart-academy": {
    title: "DART Academy",
    description: "A comprehensive learning platform with interactive simulations",
    longDescription: [
      "DART Academy is a full-featured learning management system designed specifically for computer science education. The platform combines interactive coding environments, real-time assessments, and adaptive learning pathways.",
      "Built with a focus on scalability and performance, the system handles thousands of concurrent users while providing instant feedback on code submissions and interactive exercises.",
      "The platform integrates seamlessly with existing educational infrastructure and provides comprehensive analytics for both students and educators.",
    ],
    tech: ["Next.js", "React", "PostgreSQL", "Node.js", "TypeScript", "Docker", "AWS"],
    image: "/learning-platform-dashboard.png",
    challenge:
      "Educational institutions needed a modern, scalable platform that could deliver interactive coding exercises and track student progress in real-time while handling thousands of concurrent users.",
    solution:
      "Architected a cloud-native learning platform using Next.js and PostgreSQL, implementing WebSocket connections for real-time collaboration, containerized microservices for code execution, and a sophisticated caching layer for optimal performance.",
    impact:
      "Successfully deployed to 15+ institutions, serving over 10,000 students with 99.9% uptime. Reduced average response time for code submissions by 60% and improved student engagement scores by 40%.",
  },
  "miniature-reserve": {
    title: "Miniature Reserve",
    description: "E-commerce platform for miniature collectibles",
    longDescription: [
      "Miniature Reserve is a specialized e-commerce platform catering to collectors of miniature figures and models. The platform provides advanced search and filtering capabilities, detailed product catalogs, and secure payment processing.",
      "The system includes inventory management tools, order tracking, and customer relationship management features designed specifically for small to medium-sized collectible businesses.",
      "Built with a focus on visual presentation and user experience, the platform showcases high-quality product imagery and provides detailed specifications for each item.",
    ],
    tech: ["React", "Express", "MongoDB", "Stripe", "AWS", "Redis"],
    image: "/ecommerce-miniatures-store.jpg",
    challenge:
      "Create a niche e-commerce platform that could handle complex inventory with multiple variants, high-resolution imagery, and integrate with various shipping providers while maintaining fast page loads.",
    solution:
      "Developed a React-based SPA with Express backend, implementing image optimization pipelines, Redis caching for frequently accessed products, and a flexible product variant system with MongoDB for schema flexibility.",
    impact:
      "Increased conversion rate by 35% compared to previous platform. Reduced page load times by 50% and successfully processed over $500K in transactions in the first year.",
  },
  "online-trolling-education": {
    title: "Online Trolling Education Module",
    description: "Interactive educational module teaching digital citizenship",
    longDescription: [
      "This interactive educational module addresses the critical issue of online trolling and cyberbullying through scenario-based learning and evidence-based pedagogical approaches.",
      "Students navigate realistic social media scenarios, learning to identify trolling behavior, understand its impact, and develop strategies for responding appropriately and seeking help when needed.",
      "The module includes pre and post-assessments, progress tracking, and generates detailed reports for educators to identify students who may need additional support.",
    ],
    tech: ["Vue.js", "Firebase", "Tailwind CSS", "Chart.js", "Nuxt"],
    image: "/educational-module-interface.jpg",
    challenge:
      "Develop an engaging educational experience that could sensitively address cyberbullying while providing measurable learning outcomes and protecting student privacy.",
    solution:
      "Created an interactive scenario-based learning system using Vue.js with Firebase for real-time data synchronization, implementing branching narratives and adaptive content delivery based on student responses.",
    impact:
      "Deployed in 50+ schools reaching 8,000+ students. Post-assessment data showed 75% improvement in recognizing trolling behavior and 60% increase in confidence responding to cyberbullying.",
  },
  "cs-documentation-site": {
    title: "CS Documentation Site",
    description: "Comprehensive documentation platform for computer science courses",
    longDescription: [
      "A modern documentation platform built to serve computer science course materials with advanced search capabilities, interactive code examples, and version control integration.",
      "The platform supports MDX for rich content creation, allowing educators to embed interactive components, code playgrounds, and assessments directly within documentation pages.",
      "Features include dark mode support, mobile-responsive design, and accessibility compliance to ensure all students can effectively access course materials.",
    ],
    tech: ["Next.js", "MDX", "Algolia", "Vercel", "TypeScript", "Tailwind CSS"],
    image: "/documentation-website.jpg",
    challenge:
      "Build a fast, searchable documentation system that could handle extensive course materials across multiple programming languages while remaining easy for non-technical educators to update.",
    solution:
      "Implemented a static site generator using Next.js and MDX, integrated Algolia for instant search across all content, and created a Git-based workflow allowing educators to update content through simple markdown files.",
    impact:
      "Reduced time-to-find information by 70% according to user surveys. Serves 5,000+ daily active users with sub-second page loads globally. Documentation update time reduced from hours to minutes.",
  },
  "success-in-cs-moodle": {
    title: "Success in CS Moodle Site",
    description: "Custom Moodle learning management system",
    longDescription: [
      "A heavily customized Moodle implementation designed to support introductory computer science courses with integrated coding assessments, progress dashboards, and predictive analytics.",
      "The system extends Moodle's core functionality with custom plugins for code submission and automated testing, peer review workflows, and early warning systems to identify struggling students.",
      "Integration with external tools provides a seamless experience for students, bringing together course materials, assignments, discussions, and grading in one cohesive platform.",
    ],
    tech: ["PHP", "MySQL", "Moodle", "JavaScript", "CSS", "Python"],
    image: "/moodle-learning-management-system.jpg",
    challenge:
      "Extend Moodle to support automated code grading, provide real-time analytics to instructors, and create an intuitive interface for students new to computer science.",
    solution:
      "Developed custom Moodle plugins using PHP and Python for secure code execution and grading, implemented JavaScript-based dashboards for student progress visualization, and created a custom theme optimized for coding coursework.",
    impact:
      "Supported 3,000+ students across multiple semesters. Automated grading reduced instructor workload by 15 hours per week. Early warning system helped identify at-risk students, contributing to a 25% reduction in course withdrawal rates.",
  },
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projectData[id]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <nav className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </nav>
      </header>

      {/* Hero Image */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Title and Links */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{project.title}</h1>
            <p className="text-xl text-foreground/70">{project.description}</p>
            <div className="flex gap-3 pt-2">
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Overview</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              {project.longDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Challenge */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">The Challenge</h2>
            <p className="text-foreground/80 leading-relaxed">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">The Solution</h2>
            <p className="text-foreground/80 leading-relaxed">{project.solution}</p>
          </div>

          {/* Impact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Impact</h2>
            <p className="text-foreground/80 leading-relaxed">{project.impact}</p>
          </div>

          {/* Back Link */}
          <div className="pt-8 border-t border-border">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Projects
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(projectData).map((id) => ({
    id,
  }))
}
