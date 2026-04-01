import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectSections } from "@/components/project-sections"
import { StickyBackLink } from "@/components/sticky-back-link"
import { SiteHeader } from "@/components/site-header"
import type { Project, ProjectLink } from "@/lib/project-types"
import { text } from "stream/consumers"

const projectData: Record<string, Project> = {
  "dart-academy": {
    title: "DART Academy",
    description:
      "E-learning platform designed to empower older adults to recognize scams, improve their online awareness, and hone their digital skills.",
    image: "/demo/dart.gif",
    heroMedia: {
      type: "banner",
      src: "/dart/banner.png",
      alt: "DART Academy banner with logo, tagline, and illustrated learners",
    },
    liveUrl: "https://app.dartacademy.net/",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma ORM", "Node.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Figma", "Adobe Illustrator", "Zustand", "Docker", "AWS", "TipTap", "OpenAI API", "HubSpot API", "Stripe API"],
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
        heading: "Building Defenses Through Research Collaboration",
        paragraphs: [
          {
            text: "To address this problem, a multi-university research collaboration led by the University at Buffalo launched DART Collective (Deception Awareness and Resilience Training), a nonprofit supported by a $5 million National Science Foundation Convergence Accelerator grant. The project brings together researchers from institutions including Cornell University, Lehigh University, Clemson University, Northeastern University, and the University of Illinois to develop tools that help people recognize and resist online deception.",
            links: [
              {
                label: "DART Collective (Deception Awareness and Resilience Training)",
                href: "https://dartcollective.net/",
              },
                            {
                label: "$5 million National Science Foundation Convergence Accelerator grant",
                href: "https://arts-sciences.buffalo.edu/news-and-events/recent-news/2022/october/dart-online-scams.html",
              },
            ],
          },
        ],
      },
      {
        type: "image",
        src: "/dart/dart_team.png",
        alt: "DART initiative research collaboration",
        caption: "Partner institutions collaborating on the DART project to research and develop tools that help people recognize and resist online scams.",
      },
      {
        type: "richText",
        heading: "Product Design and Development",
        paragraphs: [
          "As a technical lead and founding engineer, I worked with researchers and educators across the collaboration to design and build **DART Academy**, an interactive learning system that teaches users to identify scams through realistic simulations, structured lessons, and hands-on practice. I led product design and prototyping in Figma and contributed to NSF National I-Corps customer discovery interviews, translating insights from 109 interviews into the platform’s user flows and features.",
        ],
      },
      {
        type: "infographic",
        src: "/dart/interviews.png",
        alt: "DART Academy NSF National I-Corps customer discovery interviews infographic",
        caption: "Organizations interviewed during the NSF National I-Corps customer discovery process, including stakeholders across aging services, education, and financial services sectors. Insights from these 109 interviews informed the design of the DART Academy platform.",
      },
      {
        type: "infographic",
        src: "/dart/website_design_system.png",
        alt: "DART Academy design system",
        caption: "DART Academy design system and UI component library.",
      },
      {
        type: "richText",
        heading: "Platform Architecture & Engineering Leadership",
        paragraphs: [
          "I architected and built the system's learning management infrastructure, including the course player, content authoring tools, and interactive training framework. I also assembled and led a rotating development team of student engineers over multiple years, mentoring developers through system design, implementation, and deployment as the platform evolved.",
        ],
      },
      {
        type: "infographic",
        src: "/dart/dart_architecture.png",
        alt: "DART Academy learning platform architecture diagram",
        caption: "High-level architecture of the DART Academy platform, including frontend, backend, infrastructure, and content systems supporting scalable, interactive learning experiences.",
      },

      {
        type: "richText",
        heading: "Course Builder Authoring Tools",
        paragraphs: [
          "",
        ],
      },
      {
        type: "image",
        src: "/dart/course_builder.gif",
        alt: "DART initiative research collaboration",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "A course authoring system for cybersecurity and scam awareness training that enables educators to easily create interactive lessons. Built as a custom content management system, it supports continuous content creation so learners receive timely, relevant, and engaging training on emerging scams. A block-based interface makes it possible to build rich end-to-end learning experiences that combine content, interaction, and assessment.",        ],
      }, 
      {
        type: "richText",
        heading: "AI Voice Over Narration",
        paragraphs: [
          "",
        ],
      },
      {
        type: "video",
        src: "/dart/dart_ai_demo.mp4",
        title: "DART AI Voiceover demo",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "An AI-powered voice generation system that transforms course content into natural, instructor-ready narration. It generates speaker notes from lesson content, prepares them for voice output, and integrates directly into the editor for quick review and refinement. The system uses the OpenAI API for content generation and AWS Polly for voice synthesis, with a focus on producing clear and engaging narration that presents material in an accessible way for older adult learners. This streamlines the content creation process while enhancing the learning experience with high-quality audio narration.",
        ],
      }, 


      {
        type: "richText",
        heading: "Learning Course Player",
        paragraphs: [
          "",
        ],
      },
      {
        type: "image",
        src: "/dart/course_player.gif",
        alt: "DART initiative research collaboration",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "A modular course delivery system designed to guide learners smoothly through structured lessons and real-world scam scenarios. Built as a single-page application with preloaded content and seamless fading transitions, it reduces friction and creates a continuous learning experience. A sidebar supports self-paced navigation across chapters and lessons, while a presentation mode with voiceover narration allows content to be delivered in guided sessions. This helps learners stay engaged and better recognize scam patterns through practice.",
        ],
      }, 
      {
        type: "richText",
        heading: "Simulations",
        paragraphs: [
          "Learners practice scam recognition through realistic simulations. Each module mirrors common fraud patterns and gives immediate feedback on choices.",
        ],
      },
      {
        type: "image",
        src: "/dart/identity_sim.gif",
        alt: "Identity scam simulation preview",
        caption: {
          text: "Identity theft phishing email inbox scam simulation — Visit the live page.",
          links: [{ label: "Visit the live page", href: "https://app.dartacademy.net/practice/identity" }],
        },
      },
      {
        type: "image",
        src: "/dart/tech_sim.gif",
        alt: "Tech support popup and phone call scam simulation preview",
        caption: {
          text: "Tech support popup and phone call scam simulation — Visit the live page.",
          links: [{ label: "Visit the live page", href: "https://app.dartacademy.net/practice/tech" }],
        },
      },
      {
        type: "image",
        src: "/dart/medication_sim.gif",
        alt: "Medication scam drug website simulation preview",
        caption: {
          text: "Medication scam drug website simulation preview — Visit the live page.",
          links: [{ label: "Visit the live page", href: "https://app.dartacademy.net/practice/medication" }],
        },
      },
      {
        type: "image",
        src: "/dart/romance_sim.gif",
        alt: "Romance scam text message inbox choose-your-path simulation preview",
        caption: {
          text: "Romance scam text message inbox choose-your-path simulation preview — Visit the live page.",
          links: [{ label: "Visit the live page", href: "https://app.dartacademy.net/practice/romance" }],
        },
      },
      {
        type: "image",
        src: "/dart/grandparent_sim.gif",
        alt: "Grandparent scam phonecall under distress simulation preview",
        caption: {
          text: "Grandparent scam emergency phonecall simulation — Visit the live page.",
          links: [{ label: "Visit the live page", href: "https://app.dartacademy.net/practice/grandparent" }],
        },
      },  
      {
        type: "richText",
        heading: "Curated News System",
        paragraphs: [
          "",
        ],
      },
      {
        type: "image",
        src: "/dart/news.gif",
        alt: "Curated news system demo",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "The Alert Hub ensures learners are exposed to the latest scam tactics as they evolve, reinforcing training with timely, real-world context. The system automatically updates with relevant news, with the ability for teams to review and refine content as needed to maintain accuracy and quality.",
        ],
      }, 

      // {
      //   type: "richText",
      //   heading: "Analytics Dashboard",
      //   paragraphs: [
      //     "Info.",
      //   ],
      // }, 
      {
        type: "richText",
        heading: "Multilingual Support",
        paragraphs: [
          "",
        ],
      },
      {
        type: "image",
        src: "/dart/multilingual.gif",
        alt: "DART initiative research collaboration",
        caption: "",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "A multilingual support system with locale-aware routing for English, Spanish, French, and Chinese, designed to scale to additional languages. It includes internationalization (enabling locale-based routing and language support without code changes) and localization (adapting content, metadata, interface text, and URLs for each language) to ensure accessibility across diverse user populations. The system is production-ready, with translated content currently in development.",
        ],
      }, 
      {
        type: "gallery",
        heading: "DART Academy Illustration Gallery",
        intro: "Visual assets created for DART Academy, grouped by instructional purpose.",
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
      "Nonprofit website for a community-driven initiative restoring urban biodiversity through native plant gardens and environmental education.",
    image: "/demo/mininature.gif",
    liveUrl: "https://mininature.org/",
    tech: ["Payload CMS", "Shopify", "Next.js", "React", "Figma", "Canva", "Tailwind CSS", "Shadcn/ui", "Node.js", "TypeScript", "Vercel", "Lexical", "ArcGIS"],
    sections: [
      {
        type: "richText",
        heading: "Loss of Native Ecosystems in Cities",
        paragraphs: [
          {
            text: "Urban development is rapidly replacing natural ecosystems with concrete, eliminating native plants and reducing biodiversity. In Ventura County, the fastest-warming county in the continental United States, this is accelerating drought, extreme heat, and wildfire risk.",
            links: [
              {
                label: "fastest-warming county",
                href: "https://www.theguardian.com/environment/2022/feb/05/americans-above-average-temperature-increase-climate-crisis",
              },
            ],
          },
          {
            text: "Based in the region, MiniNature Reserve is a grassroots nonprofit working to restore native plants and biodiversity in urban environments. Through community-built green spaces, they transform underutilized land into ecosystems that support wildlife and improve climate resilience.",
            links: [],
          },
        ],
      },
      {
        type: "richText",
        heading: "Outgrowing a Dysfunctional Wix Site",
        paragraphs: [
          "MiniNature Reserve approached me to redesign and rebuild their website, moving away from Wix to a custom solution tailored to their needs. As the organization expanded and began applying for major grants, the limitations of the existing site became clear. Important information was buried, the site suffered from slow load times, and the experience broke down on mobile.",
          "They needed a platform that could scale with their growth. It had to allow them to easily create and update content, present a modern, clean brand experience, and support e-commerce.",
        ],
      },
      {
        type: "image",
        src: "/mininature/mininature_before_after.png",
        alt: "Before and after redesign of the MiniNature Reserve website's landing page.",
        caption: "Before and after redesign of the MiniNature Reserve website's landing page.",
      },
      {
        type: "richText",
        heading: "Creating a Scalable Visual Foundation",
        paragraphs: [
          "I created a design system to bring consistency and structure across the site. Working within their desire for a monochromatic green palette, I paid close attention to color contrast to ensure readability and accessibility, and introduced flexible content blocks that highlight their nature and event photography instead of relying on carousel-heavy layouts. I also introduced dark mode and subtle animations to create a more modern and engaging experience.",
          "Built around reusable components, the system allows new content to be created quickly while maintaining structure, clarity, and consistency as the site grows."
        ],
      },
      {
        type: "infographic",
        src: "/mininature/mininature_design_system.png",
        alt: "Design system overview for the MiniNature Reserve website.",
        caption: "Design system overview for the MiniNature Reserve website.",
      },
      {
        type: "richText",
        heading: "Clearer Storytelling, Stronger Impact",
        paragraphs: [
          "I redesigned the information architecture to make the site easier to navigate and understand. Pages were consolidated and content was reorganized into a clear, story-driven flow that guides users from understanding the mission to taking action.",
          "The navigation system includes a responsive mega menu and global search, surfacing key content and reducing complexity so users can quickly find information or explore the site.",
        ],
      },
      {
        type: "figmaEmbed",
        title: "MiniNature Reserve Figma",
        src: "https://www.figma.com/design/3T9uEsjMRCWcfE9G2Tx6q3/Mininature-Reserve?node-id=0-1&t=F7IDZ09PB62HoGBz-1",
        caption: "Explore the full MiniNature Reserve design system and page layouts in Figma.",
        height: 620,
      },
      {
        type: "richText",
        heading: "Making Content Easy to Create and Update",
        paragraphs: [
          "",
        ],
      },
      {
        type: "image",
        src: "/mininature/content_management.gif",
        alt: "Demo of the custom content management system for the MiniNature Reserve website.",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "A flexible block-based content management system that allows the team to manage content without engineering support. It includes features like draft versioning, split-screen live preview, rich text editing, and SEO tools, enabling confident publishing while maintaining structure, consistency, and performance across the site.",
        ],
      },
      // {
      //   type: "richText",
      //   heading: "Flexible Content Blocks in Practice",
      //   paragraphs: [
      //     "The platform is built around flexible content blocks that can be reused across different pages and layouts. A single block can adapt to multiple use cases, allowing the team to create rich, varied content while maintaining consistency and reducing development overhead.",
      //   ],
      // },
      {
        type: "richText",
        heading: "Migrating E-commerce to a Scalable Shopify Platform",
        paragraphs: [
          "",
        ],
      },
      {
        type: "image",
        src: "/mininature/shop_demo.gif",
        alt: "Before and after redesign of the MiniNature Reserve website's landing page.",
      },
      {
        type: "richText",
        heading: "",
        paragraphs: [
          "I migrated the e-commerce system from Wix to Shopify, including all products, customers, and order history. The new system supports filtering, sorting, standard shipping, local pickup for live plants, and digital downloads, giving the team flexibility in how they sell and manage products.",
        ],
      },
      {
        type: "richText",
        heading: "Making Local Impact Discoverable",
        paragraphs: [
          "A “Find a MiniNature Reserve Near You” feature using ArcGIS to map active locations and make them easily accessible to the community. Users can explore nearby projects, learn about each site, and connect with local restoration efforts.",
        ],
      },
      {
        type: "image",
        src: "/mininature/map.gif",
        alt: "Interactive map showing MiniNature Reserve locations.",
      },
      {
        type: "richText",
        heading: "Publishing and Storytelling Through the News Blog",
        paragraphs: [
          "A built-in blog system allows the team to publish updates, educational content, and community stories. Paired with a rich text editor, it supports structured, media-rich content that is easy to create and edit without technical knowledge.",
        ],
      },
      {
        type: "image",
        src: "/mininature/news_blog.gif",
        alt: "Demo of the news blog content management system for the MiniNature Reserve website.",
      },
      {
        type: "richText",
        heading: "Fast, Site-Wide Search",
        paragraphs: [
          "A global search system that allows users to quickly find content across pages, programs, and resources. Designed for speed and relevance, it reduces friction and helps users access information without navigating through multiple pages.",
        ],
      },
      {
        type: "image",
        src: "/mininature/search.gif",
        alt: "Demo of the global search functionality on the MiniNature Reserve website.",
      },
      {
        type: "richText",
        heading: "Dark Mode for Accessibility and Preference",
        paragraphs: [
          "A built-in dark mode provides a more comfortable viewing experience, especially for younger users and low-light environments. It improves readability while maintaining visual consistency across the site.",
        ],
      },
      {
        type: "image",
        src: "/mininature/dark_mode.gif",
        alt: "Demo of the dark mode feature on the MiniNature Reserve website.",
      },
      {
        type: "richText",
        heading: "Fully Responsive Across Devices",
        paragraphs: [
          "The site is designed to be fully responsive, ensuring a seamless experience across mobile, tablet, and desktop. Navigation, layouts, and content adapt fluidly so users can access information and take action from any device.",
        ],
      },
      {
        type: "richText",
        heading: "Structured Team and Leadership Profiles",
        paragraphs: [
          "Custom team profile pages highlight contributors, advisors, and board members with clear organization and hierarchy. This makes it easy to showcase leadership, build credibility, and support grant and partnership efforts.",
        ],
      },
      {
        type: "richText",
        heading: "Flexible Rich Text Editing",
        paragraphs: [
          "The rich text editor supports formatted content, media embedding, and structured layouts, giving the team control over how information is presented. It enables clear, readable content while maintaining consistency across the site. Additional support was implemented for Spanish characters and accent marks to ensure accurate multilingual content.",
        ],
      },
      {
        type: "richText",
        heading: "Sharing Reports with Embedded PDFs",
        paragraphs: [
          "A built-in PDF viewer allows the team to embed reports and documents directly into pages. This makes it easy to share impact reports, guides, and resources without requiring downloads, improving accessibility and user experience.",
        ],
      },
      // {
      //   type: "richText",
      //   heading: "E-commerce Integration",
      //   paragraphs: [
      //     "As part of the transition, I migrated existing e-commerce data from Wix into Shopify, establishing a dedicated and scalable storefront. This separates commerce from the content platform while allowing the organization to expand into merchandise, apparel, and plant sales.",
      //   ],
      // },


      // {
      //   type: "bullets",
      //   heading: "Content architecture",
      //   intro: "Info:",
      //   items: [
      //     "Info coming soon.",
      //   ],
      // },
      // {
      //   type: "stats",
      //   heading: "Community signals",
      //   stats: [
      //     { label: "Volunteer signups", value: "+63%" },
      //     { label: "Returning visitors", value: "52%" },
      //     { label: "Avg. pages per session", value: "4.8" },
      //   ],
      // },
    ],
  },
  "online-trolling-education": {
    title: "Online Trolling Education Module",
    description:
      "Interactive learning module that teaches students how to identify, de-escalate, and report harmful online behavior.",
    image: "/demo/troll.gif",
    tech: ["Node.js", "Express.js", "Passport.js", "MongoDB", "Mongoose", "Pug", "Semantic UI", "jQuery", "Intro.js", "Slick.js", "Video.js"],
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
    tech: ["React Native", "Expo", "MongoDB", "Firebase"],
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

  const heroMedia = project.heroMedia ?? {
    type: "image" as const,
    src: project.image,
    alt: project.title,
  }
  const heroWrapperClassName =
    heroMedia.type === "banner"
      ? "relative mb-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm"
      : "relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted"
  const heroImageClassName = heroMedia.type === "banner" ? "h-auto w-full object-cover" : "object-cover"
  const heroAlt = heroMedia.alt || project.title

  return (
    <div className="min-h-screen">
      <SiteHeader sectionBasePath="/" />

      <StickyBackLink />

      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className={heroWrapperClassName}>
            {heroMedia.type === "banner" ? (
              <Image
                src={heroMedia.src || "/placeholder.svg"}
                alt={heroAlt}
                width={2048}
                height={512}
                priority
                className={heroImageClassName}
              />
            ) : (
              <Image src={heroMedia.src || "/placeholder.svg"} alt={heroAlt} fill className={heroImageClassName} />
            )}
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