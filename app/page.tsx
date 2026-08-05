"use client"

import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Linkedin, Github, Mail, ExternalLink } from 'lucide-react'
import { FormEvent, MouseEvent, useState, useEffect, useId, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { SiteHeader } from "@/components/site-header"
import { getScrollBehavior, scrollToHash } from "@/lib/scroll"

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string
          action?: string
        },
      ) => number
      getResponse: (widgetId?: number) => string
      reset: (widgetId?: number) => void
    }
  }
}

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null)
  const recaptchaWidgetIdRef = useRef<number | null>(null)
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "6LdEvaosAAAAAB3wtdOMfHwlJ7hCWWBqyGujHmhP"
  const formSubmitEndpoint = "https://formsubmit.co/ajax/joss@josstripoli.com"
  // const { scrollY } = useScroll()
  // const parallaxOffset = useTransform(scrollY, [0, 500], [0, 250])
  // const imageOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0])

  const imageRef = useRef(null)
  const { scrollY } = useScroll()

  // Desktop: global scroll-based fade (same as before)
  const desktopParallax = useTransform(scrollY, [0, 500], [0, 250])
  const desktopOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0])

  // Mobile: element-relative scroll — only fades AFTER it enters the viewport
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })
  // 0 = top of element at bottom of viewport, 1 = bottom of element at top of viewport
  // Fades in as it enters, stays visible, fades out as it leaves
  // const mobileParallax = useTransform(scrollYProgress, [0, 1], [0, 150])
  const mobileOpacity = useTransform(scrollYProgress, [0, 0.17, 0.2, 0.33], [0, 1, 1, 0])

  // Simple check to disable parallax on mobile for better performance and UX
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !recaptchaSiteKey) return

    const initializeRecaptcha = () => {
      if (!window.grecaptcha || !recaptchaContainerRef.current || recaptchaWidgetIdRef.current !== null) return

      window.grecaptcha.ready(() => {
        if (!recaptchaContainerRef.current || recaptchaWidgetIdRef.current !== null) return

        recaptchaWidgetIdRef.current = window.grecaptcha!.render(recaptchaContainerRef.current, {
          sitekey: recaptchaSiteKey,
          action: "CONTACT_FORM",
        })
      })
    }

    initializeRecaptcha()
    const intervalId = window.setInterval(initializeRecaptcha, 250)

    return () => window.clearInterval(intervalId)
  }, [recaptchaSiteKey])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() })
  }

  const onCTASectionClick = (event: MouseEvent<HTMLAnchorElement>, hash: "#work" | "#contact") => {
    event.preventDefault()
    scrollToHash(hash)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!recaptchaSiteKey) {
      setSubmitStatus("error")
      setSubmitMessage("Captcha site key is missing. Please contact site owner.")
      return
    }

    if (!window.grecaptcha) {
      setSubmitStatus("error")
      setSubmitMessage("Captcha is still loading. Please wait a second and try again.")
      return
    }

    let captchaToken = ""
    try {
      captchaToken = window.grecaptcha.getResponse(recaptchaWidgetIdRef.current ?? undefined)
    } catch {
      setSubmitStatus("error")
      setSubmitMessage("Captcha needs to be reloaded. Please refresh and try again.")
      return
    }

    if (!captchaToken) {
      setSubmitStatus("error")
      setSubmitMessage("Please verify that you are human before sending your message.")
      return
    }

    setSubmitStatus("sending")
    setSubmitMessage("")

    try {
      const payload = {
        name: formState.name,
        email: formState.email,
        message: formState.message,
        _subject: "New portfolio contact form message",
      }

      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          _captcha: "false",
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Unable to send message.")

      setSubmitStatus("sent")
      setSubmitMessage("Thanks! Your message has been sent.")
      setFormState({ name: "", email: "", message: "" })
      window.grecaptcha?.reset(recaptchaWidgetIdRef.current ?? undefined)
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    }
  }

  const projects = [
    {
      id: "dart-academy",
      title: "DART Academy",
      description:
        "E-learning platform designed to empower older adults to recognize scams, improve their online awareness, and hone their digital skills.",
      tech: ["Next.js", "React", "PostgreSQL", "Prisma ORM", "Node.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Figma", "WordPress", "Adobe Illustrator", "Zustand", "Docker", "AWS", "TipTap", "OpenAI API", "HubSpot API", "Stripe API", "Google Analytics (GA4)"],
      image: "/demo/dart.gif",
    },
    {
      id: "miniature-reserve",
      title: "MiniNature Reserve",
      description:
        "Nonprofit website for a community-driven initiative restoring urban biodiversity through native plant gardens and environmental education.",
      tech: ["Payload CMS", "PostgreSQL", "Shopify", "Next.js", "React", "Figma", "Canva", "Tailwind CSS", "Shadcn/ui", "Node.js", "TypeScript", "Vercel", "Lexical", "ArcGIS", "Vercel Web Analytics"],
      image: "/demo/mininature.gif",
    },
    {
      id: "collaboreat",
      title: "Collaboreat",
      description:
        "A mobile app that helps groups decide where to eat by reducing choice overload and helping them reach a fair decision faster.",
      tech: ["React Native", "Expo", "Firebase", "Google Maps", "Fuzzy Logic", "Algorithmic Design", "Human-Computer Interaction", "IRB-Reviewed User Testing"],
      image: "/demo/collaboreat.gif",
    },
    {
      id: "online-trolling-education",
      title: "Disinformation Education Platform",
      description:
        "An interactive learning platform that translates disinformation research into realistic social media scenarios.",
      tech: ["Node.js", "Express.js", "Passport.js", "MongoDB", "Mongoose", "Pug", "Semantic UI", "jQuery", "Intro.js", "Slick.js", "Video.js"],
      image: "/demo/troll.gif",
    },
    {
      id: "cs-documentation-site",
      title: "Lehigh University Computer Science Documentation Websites",
      description:
        "Centralized resources that replace scattered documentation and reduce repetitive faculty support through structured, easy-to-navigate sites.",
      tech: ["Moodle LMS", "Bootstrap", "Markdown", "HTML", "CSS", "JavaScript"],
      image: "/demo/sics.gif",
    },
  ]

  const easeOut = "easeOut"

  const heroTimings = {
    image: { delay: 0.0, duration: 0.8 },
    hello: { delay: 0.85, duration: 0.45 },
    autograph: { delay: 1.20, duration: 0.15 }, 
    headline: { delay: 2.4, duration: 0.5 },
    ctas: { delay: 2.4, duration: 0.5 },
    socialsStart: 2.8,
    socialsStagger: 0.2,
    socialsDuration: 0.45,
  }

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  }


  const maskId = useId()

  const AUTOGRAPH_DELAY = heroTimings.autograph.delay


  return (
    <div className="min-h-screen">
      <Script id="recaptcha-api-script" src="https://www.google.com/recaptcha/api.js?render=explicit" async defer />
      <SiteHeader />

      <section className="overflow-hidden">

        <div className="particle-container">
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
            <div className="circle-container">
                <div className="circle"></div>
            </div>
        </div>





        
  <div className="grid md:grid-cols-2 items-center max-w-6xl mx-auto relative">
    <motion.div
      className="order-2 md:order-1"
      style={{
        y: isMobile ? 0 : desktopParallax,
        opacity: isMobile ? mobileOpacity : desktopOpacity,
      }}      
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: heroTimings.image.delay, duration: heroTimings.image.duration, ease: easeOut }}
    >
      <Image
        src="/headshot.png"
        alt="Joss Tripoli"
        width={400}
        height={500}
        className="w-full ml-0 md:ml-12"
      />
    </motion.div>
          
  <motion.div className="order-1 md:order-2 space-y-6 ml-0 pl-8 pt-14 pb-6 md:pt-0 md:ml-24 md:pb-0">
    <motion.p
      className="text-muted-foreground text-xl uppercase tracking-wider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: heroTimings.hello.delay, duration: heroTimings.hello.duration, ease: "easeOut" }}
    >
      Hello, I'm
    </motion.p>

    {/* 2) Autograph write (left -> right mask reveal) */}
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: heroTimings.autograph.delay, duration: heroTimings.autograph.duration, ease: "easeOut" }}
    >
      <motion.svg
        width="293"
        height="211.464"
        viewBox="0 0 999 721"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 md:ml-4"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="999" height="721">
            {/* animated reveal from left -> right */}
            <motion.rect
              x="0"
              y="0"
              height="721"
              initial={{ width: 0 }}
              animate={{ width: 999 }}
              transition={{ duration: heroTimings.autograph.delay, ease: "easeInOut", delay: AUTOGRAPH_DELAY }}
              fill="white"
            />
          </mask>
        </defs>

        {/* New autograph artwork, revealed by the existing mask animation */}
        <g mask={`url(#${maskId})`}>
          <path d="M366.903 0C376.253 2.07 372.933 15.85 365.443 15.61C363.063 15.53 361.653 13.99 359.593 13.67C345.883 11.57 331.023 32.74 327.193 44.22C314.463 82.37 343.503 111.74 376.593 124C382.173 126.07 387.513 128.88 390.613 122.56C394.743 114.14 397.543 101.18 401.573 91.75C407.853 77.05 416.683 58.13 431.853 51.18C462.693 37.07 479.113 70.22 470.223 96.54C463.323 116.96 440.663 133.19 420.333 137.82C415.063 139.02 406.473 138.02 403.803 142.6C401.503 146.55 397.953 163.77 396.603 169.41C394.753 177.13 393.813 184.89 391.793 192.78C388.573 205.38 380.143 225.54 378.903 237.3C378.903 237.3 386.263 249.25 390.533 254.9C395.163 261.03 411.083 297.67 412.883 305.38C415.263 315.59 405.653 315.14 400.383 308.23C392.643 298.09 388.353 277.31 381.953 265.48C372.493 246 368.903 269.28 365.143 277.85C337.353 341.28 301.963 368.73 234.333 383.7C171.053 397.7 36.2826 390.93 6.43258 319.97C3.28258 312.48 1.90258 304.52 0.122579 296.64C0.392579 292.86 -0.257421 288.67 0.122579 284.97C6.10258 226.24 81.8426 197.97 130.363 184.87C214.583 162.13 279.313 168.3 352.123 216.67C354.453 218.22 359.153 222.99 361.533 222.77C365.473 221.75 366.413 217.42 367.403 213.97C373.943 191.08 377.303 167.03 384.093 144.17C384.543 140.43 384.893 139.6 381.763 137.29C374.263 131.76 361.083 127.16 352.273 121.22C336.143 110.35 319.003 92.99 314.903 73.19C309.323 46.3 327.403 4.12 357.243 0.01H366.923L366.903 0ZM454.623 62.59C440.193 49.36 423.023 84.53 418.703 94.37C416.933 98.4 407.483 123.47 409.473 125.46C420.503 124.95 433.183 118.63 441.423 111.37C452.953 101.21 469.303 76.05 454.613 62.59H454.623ZM353.003 230.84C344.853 222.54 315.023 206.26 303.673 201.15C233.513 169.51 126.273 189.15 61.3926 227.41C-11.7674 270.56 4.85258 338.2 81.6226 362.05C137.893 379.53 193.023 380.86 249.323 362.78C308.133 343.9 334.563 314.34 354.063 256.02C356.983 247.29 360.413 238.4 352.993 230.84H353.003Z" fill="black"/>
          <path d="M704.893 224.41C711.032 234.599 714.406 244.009 715.273 256.29C716.383 271.75 711.053 289.14 698.753 298.99C662.203 328.25 608.912 258.481 659.102 232.391C666.952 228.311 674.538 221.354 681.218 216.874C682.718 215.864 689.542 231.77 689.902 229.87L660.472 185.83L657.652 186.69C641.993 207.05 626.493 214.5 602.493 222C607.493 235 609.803 255.93 609.833 262.16C610.013 303.54 556.132 317.57 530.912 286.93C511.542 263.41 527.103 246.44 548.953 235.01C554.503 232.1 579.652 224.25 580.612 220.11C582.422 212.28 563.462 191.45 559.742 183.08C541.892 143 599.363 114.25 623.193 149.46C627.563 155.92 635.613 179.08 623.763 180.86C612.703 182.52 616.262 170.82 615.592 163.91C613.332 140.6 595.072 142.69 581.232 155.6C569.493 175.32 587.192 193.95 596.222 212.55C600.492 216.36 616.732 209.55 621.782 207.05C630.532 202.72 638.752 194.93 644.622 187.21C659.332 167.86 662.823 135.08 695.443 138.12C719.833 140.39 733.093 158.17 730.823 182.41C730.103 190.08 722.942 192.6 716.872 188.56C709.252 183.48 719.232 164.62 710.482 155.11C700.842 144.63 669.222 158.12 671.972 175.32C673.282 183.52 694.532 205.92 700.592 215.62C701.882 217.68 703.863 223.4 704.893 224.41ZM576.993 230.5C567.26 233.319 558.773 238.38 553.493 241.5C542.033 248.28 524.783 268.76 541.583 281.06C556.633 292.08 586.263 282.83 589.253 263.81C590.033 258.81 587.993 238.5 586.493 235C585.993 233.5 584.673 228.76 582.993 229C582.993 229 579.993 229 576.993 230.5ZM686.808 225.239C683.428 223.109 665.633 235 659.102 240.094C646.709 253.659 643.972 277.09 660.112 286.44C688.312 302.78 700.982 270.21 695.802 247.17L686.808 225.239Z" fill="black"/>
          <path d="M477.032 125.75C492.972 124.12 505.142 130.19 514.952 142.5C519.022 147.61 521.713 156.43 525.993 161C530.903 159.64 586.803 129.26 591.993 134.5C599.043 141.61 531.803 163.74 529.493 170C527.343 175.81 531.032 192.62 531.062 200.02C531.192 236.07 511.342 278.75 473.392 287.42C430.682 297.17 416.682 257.42 419.172 222.24C421.312 192.1 441.932 129.33 477.032 125.74V125.75ZM502.042 142.34C496.342 136.69 488.352 136.49 482.042 141.49C476.472 145.89 478.272 152.1 482.042 157.5C488.493 170 501.323 169.87 510.993 164.83C513.423 160.78 505.132 145.4 502.052 142.34H502.042ZM468.162 153.74C443.493 170 426.272 279.96 465.022 275.13C503.772 270.3 523.142 215.42 516.682 181.61C516.682 168.5 504.882 176.75 496.112 176.02C488.492 175.38 482.012 170.51 477.252 164.83C475.482 162.72 470.682 153.3 468.172 153.74H468.162Z" fill="black"/>
          <path d="M998.853 487.278C986.289 511.058 967.385 533.743 943.784 547.063C930.692 554.448 902.535 566.985 902.95 540.912C902.969 540.016 905.176 529.197 902.101 532.234C898.233 543.044 883.292 555.646 872.623 559.033C862.974 562.098 854.361 553.609 853.031 544.374C849.702 521.33 873.793 491.871 876.519 468.931C867.605 470.204 862.879 480.712 859.653 488.211C852.003 505.964 850.22 517.491 836.826 533.159C811.235 563.098 774.937 562.938 777.899 516.142C778.88 500.616 784.125 492.598 787.775 479.279C788.105 478.081 788.794 475.836 786.615 476.279C783.851 479.429 778.795 482.052 776.069 484.948C769.051 492.428 768.448 510.586 763.75 521.188C756.128 538.403 726.5 566.409 706.795 554.637C694.947 547.563 699.286 536.498 706.7 528.074C723.727 508.737 754.647 497.757 756.006 467.535C754.874 464.667 758.609 452.112 755.543 451.49C732.971 464.158 715.133 486.778 702.597 509.265C679.808 550.138 660.791 595.123 638.737 636.825C628.965 655.304 604.553 704.92 589.8 716.079C577.877 725.097 565.029 718.343 566.388 703.572C569.934 665.161 617.466 612.451 639.916 581.124C653.122 562.702 668.441 540.96 676.176 519.547C671.931 516.623 638.916 556.718 623.032 555.307C612.976 554.414 608.175 537.168 609.137 526.348C609.439 522.971 610.482 516.623 609.939 516.623C607.788 512.473 586.093 537.573 571.623 548.289C562.935 552.93 549.295 556.269 542.013 547.742C533.014 537.186 540.249 521.434 544.975 510.501C552.286 493.569 562.577 477.298 569.736 460.196C569.378 455.913 550.003 463.177 547.522 464.45C538.467 469.101 527.675 493.56 521.412 503.351C514.158 514.689 505.329 526.924 496.726 537.253C493.463 541.177 479.351 557.995 475.257 557.929C468.145 557.816 477.616 548.468 478.465 547.336C484.379 539.507 490.114 531.432 495.67 523.339C500.066 516.934 530.628 470.959 530.335 467.686C529.364 464.111 525.355 462.639 524.072 459.356C520.205 449.48 531.316 432.152 541.466 430.766C548.296 429.832 551.078 433.671 551.559 439.991C551.805 443.179 549.484 452.499 552.097 453.272C563.048 451.018 573.292 443.915 584.168 441.642C594.46 439.491 601.374 439.925 594.818 451.423C589.869 460.116 535.221 547.742 564.605 537.573C585.829 525.792 612.58 495.937 624.38 474.713C628.059 468.091 640.378 436.661 645.293 435.18C651.245 433.388 656.339 439.387 657.207 444.839C659.404 458.63 636.558 494.079 633.823 499.795C631.842 503.934 617.4 544.167 637.718 535.809C645.019 532.8 665.29 507.218 671.101 499.635C685.448 480.91 692.221 464.648 703.607 445.151C707.993 437.633 714.916 430.002 723.623 437.727C731.603 444.802 726.839 453.103 725.906 461.592C735.537 454.367 754.138 431.492 767.297 440.632C776.06 446.726 770.645 461.752 773.371 470.77C774.645 471.006 775.626 470.515 776.758 470.044C802.896 459.206 825.544 417.201 855.531 443.689C860.427 448.009 862.332 453.64 867.067 457.772C868.718 458.074 885.754 448.16 887.489 446.217C892.13 441.038 893.696 430.454 896.177 424.021C905.864 398.949 932.078 330.835 954.708 318.629C973.583 308.451 971.036 346.502 969.338 356.256C961.924 398.855 928.994 419.692 904.346 449.65C894.8 461.252 878.113 509.756 872.85 526.244C871.19 531.461 868.879 536.724 869.218 542.318C872.85 548.789 885.112 540.912 895.96 525.207C904.327 515.831 911.873 501.115 918.335 490.305C926.126 477.279 931.691 460.932 940.04 448.82C945.077 441.51 950.585 436.076 957.613 445.679C964.508 455.102 957.792 464.469 953.359 473.204C944.058 491.56 932.022 508.662 923.202 527.301C919.306 535.545 909.572 551.713 926.956 544.836C941.209 539.196 973.884 512.85 979.582 498.644C981.921 492.815 978.912 486.768 982.402 481.297C986.77 474.477 995.599 475.666 998.834 482.674V487.259L998.853 487.278ZM961.584 331.646C959.282 331.212 958.65 332.797 957.377 334.136C951.689 340.079 940.03 362.727 935.71 371.075C927.164 387.601 920.174 404.967 913.052 422.144C915.165 424.144 925.683 414.551 927.154 412.768C953.359 390.129 962.999 360.416 964.414 344.38C964.538 342.968 964.885 333.532 961.584 331.646ZM539.664 442.33C537.108 439.991 534.024 443.406 532.863 444.839C530.326 447.98 528.062 454.216 532.373 457.517C537.382 460.026 540.721 445.736 539.655 442.33H539.664ZM838.816 445.264C834.826 446.481 834.968 454.961 835.496 458.338C836.732 466.129 847.098 466.865 852.814 463.913C857.05 455.451 848.636 442.264 838.816 445.264ZM824.959 462.545C812.546 471.761 803.717 490.607 798.915 505.162C796.142 513.576 792.849 542.318 803.547 540.092C831.345 536.055 844.08 501.153 847.853 487.476C852.814 471.44 843.136 475.685 837.477 473.798C834.647 473.091 829.006 468.77 824.959 462.554V462.545ZM746.894 507.464L727.292 522.16C720.482 529.263 710.879 536.649 709.464 546.902C719.152 548.534 726.641 542.601 732.754 535.913C739.508 528.518 746.148 517.547 746.884 507.464H746.894ZM621.532 623.591C619.532 621.525 605.392 644.456 604.119 646.079C594.629 658.266 572.132 690.988 573.358 706.081C573.49 707.713 573.915 708.807 575.254 709.797C578.763 711.401 589.262 692.837 590.951 689.715C600.817 671.377 609.052 651.012 618.174 632.222L621.532 623.591Z" fill="black"/>
          <path d="M978.403 393.299C980.365 395.279 983.072 399.92 983.261 402.713C983.912 412.287 966.225 429.643 957.255 422.352C950.19 416.607 959.981 408.523 962.198 403.42C963.584 400.222 964.546 392.063 966.386 390.195C969.433 387.101 975.922 390.789 978.413 393.299H978.403Z" fill="black"/>
          <path d="M659.81 384.808C664.046 383.384 673.045 389.308 675.129 393.043C681.676 404.797 665.913 425.983 654.339 414.852C648.463 409.192 654.415 405.287 656.235 399.599C657.188 396.637 657.952 385.44 659.81 384.808Z" fill="black"/>
          <path d="M697.454 210.408C710.097 206.557 728.636 203.381 752.516 205.857C765.509 207.204 776.418 211.921 784.179 219.37C825.88 255.551 770.741 314.514 745.556 326.164C688.73 367.267 614.12 380.507 546.155 363.966C525.43 377.188 509.506 410.637 493.466 447.949C474.392 492.318 466.181 557.963 458.744 589.994C450.776 624.316 429.522 656.086 406.792 683.498C389.481 704.374 364.687 710.705 348.253 708.325C342.614 708.232 337.825 705.581 333.645 701.601C329.444 697.601 325.585 692.008 321.751 685.541C317.902 679.049 313.907 671.373 309.538 663.1C305.148 654.786 300.334 645.782 294.771 636.455C279.438 610.75 258.436 582.642 225.345 560.662C198.303 577.14 174.71 590.419 153.548 597.008C133.435 603.27 117.788 607.492 101.019 605.66C85.8593 603.495 72.9247 599.648 69.5758 584.85C67.4431 559.616 78.7628 550.246 89.8844 541.884C114.063 525.419 146.738 524.719 174.704 527.799C192.856 530.191 211.35 541.695 225.345 550.502C248.411 536.098 273.28 518.512 298.881 495.956L304.171 501.958C279.424 523.761 256.245 541.528 233.652 555.88C265.69 571.268 287.23 596.69 305.726 630.317C317 645.394 334.4 693.169 350.505 695.918C366.609 698.668 380.772 685.185 390.552 673.391C407.195 653.32 425.572 622.774 435.35 580.957C443.529 525.019 460.121 475.505 476.898 436.479C491.911 401.556 498.807 375.268 523 358.416C473.018 345.465 428.761 329.272 376.098 341.394C340 352.81 320.878 370.735 310.57 388.014C304.171 407.128 306.824 421.615 321.232 436.479C348.229 457.127 369.532 458.644 390.552 449.565C401.597 444.794 426.304 426.286 432.266 415.356L438.421 420.269C435.872 424.941 430.348 431.627 422.788 438.296C415.169 445.017 405.248 451.931 393.725 456.908C365.496 469.102 334.847 466.934 310.57 448.148C292.928 430.162 282.044 405.112 296.202 381.378C308.015 361.576 336.95 345.362 373.833 333.72L373.983 333.672C428.376 321.202 481.963 333.147 534.916 346.351C592.203 360.635 663.129 370.13 740.093 318.428C771.333 296.128 809.705 225.571 751.691 213.815C728.962 211.458 711.497 214.493 699.787 218.061C693.927 219.846 689.499 221.768 686.568 223.221C685.103 223.947 684.013 224.556 683.305 224.973C682.952 225.181 682.694 225.34 682.533 225.443C682.452 225.494 682.396 225.531 682.364 225.552C682.348 225.562 682.338 225.569 682.335 225.571L682.337 225.57L682.339 225.569C682.339 225.569 682.341 225.566 680.093 222.257C677.89 219.014 677.848 218.949 677.849 218.946L677.853 218.944C677.856 218.942 677.86 218.939 677.863 218.937L677.972 218.864C678.039 218.82 678.131 218.761 678.247 218.687C678.481 218.538 678.815 218.332 679.246 218.078C680.11 217.57 681.369 216.869 683.013 216.054C686.302 214.423 691.138 212.333 697.454 210.408ZM173.344 537.366C132.2 532.736 109.662 539.497 97.7606 550.075C85.764 560.739 83.9845 574.115 85.3169 580.727C86.6088 587.137 92.0865 591.945 103.252 593.596C114.442 595.25 130.352 593.465 149.989 587.351C169.58 581.251 188.925 570.938 214.139 555.88C201.18 548.077 186.519 538.849 173.344 537.366Z" fill="black"/>
          <ellipse cx="433.396" cy="417.252" rx="6.0805" ry="6.85205" transform="rotate(40.5291 433.396 417.252)" fill="black"/>
        </g>
      </motion.svg>
    </motion.div>

      {/* 3) Headline fade in */}
      <motion.h1
        className="text-xl md:text-2xl font-bold text-foreground leading-tight text-balance"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: heroTimings.headline.delay, duration: heroTimings.headline.duration, ease: "easeOut" }}
      >
        <span className="text-primary">Full-Stack Software Engineer</span> building web applications
      </motion.h1>

      {/* 4) CTA buttons fade in */}
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: heroTimings.ctas.delay, duration: heroTimings.ctas.duration, ease: "easeOut" }}
      >
        <Button size="lg" className="rounded-full uppercase tracking-wide shadow-lg shadow-secondary-purple" asChild>
          <a href="#work" onClick={(event) => onCTASectionClick(event, "#work")}>View selected work</a>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full uppercase tracking-wide shadow-sm" asChild>
          <a href="#contact" onClick={(event) => onCTASectionClick(event, "#contact")}>Contact</a>
        </Button>
      </motion.div>

      {/* 5) Social circles staircase (left -> right) */}
      <div className="flex gap-4 pt-4">
        {[
          {
            href: "https://www.linkedin.com/in/joss-tripoli/",
            label: "LinkedIn",
            icon: <Linkedin className="h-5 w-5" />,
            external: true,
          },
          {
            href: "https://github.com/jossTripoli",
            label: "GitHub",
            icon: <Github className="h-5 w-5" />,
            external: true,
          },
          {
            href: "mailto:joss@josstripoli.com",
            label: "Email",
            icon: <Mail className="h-5 w-5" />,
            external: false,
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: heroTimings.socialsStart + i * 0.14, duration: heroTimings.socialsDuration, ease: "easeOut" }}
          >
            <Button
              variant="default"
              size="icon"
              asChild
              className="rounded-full text-primary bg-secondary-purple hover:bg-secondary-purple/90"
            >
              <a
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
        </div>
      </section>

      {/* <motion.section
        id="about"
        className="bg-primary py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      > */}
      <section id="about" className="relative bg-primary py-20">
        {/* <div className="pointer-events-none absolute left-0 right-0 -top-12 h-12 bg-linear-to-b from-primary/0 to-primary" /> */}

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[2fr_1fr] items-center gap-10 md:gap-12">
            <div>
              <motion.div
                className="relative inline-block mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-base uppercase tracking-widest text-primary-foreground mb-4">About</h3>
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">Designing & Building Web Applications</h2>
                <div className="absolute -bottom-3 left-0 w-20 h-1 bg-[#ECE5FF]"></div>
              </motion.div>
              <motion.div
                className="mt-4 space-y-4 text-lg text-primary-foreground/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p>
                  I’m a full-stack software engineer with significant experience in education technology. I’ve assembled and led a development team to build a production learning platform. This work included interactive simulations, AI-powered virtual instructors, gamification features, assessments, analytics, and custom management systems for multimedia learning content, scam-awareness news articles, donations, and learner engagement.
                </p>
                {/* <p>
                  I'm a full-stack software engineer with significant experience in education technology. I've built production learning platforms with interactive simulations, assessments, gamification, and custom learning management systems, including AI-powered voice facilitators that function as a virtual instructor teaching and guiding learners through material.
                </p>  
                <p>
                  I’ve owned this work end to end—from UX design to backend architecture and deployment—while also recruiting, leading, and mentoring a development team through the build and launch of these systems.
                </p> */}
                <p>
                  I’ve also built mobile apps and a range of marketing, ecommerce, and technical documentation websites. These projects use modern Content Management Systems (CMS) such as Payload, WordPress, and Shopify to help businesses launch and grow online.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="relative w-full h-72 md:h-[22rem]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-2xl">
                <Image
                  src="/about.png"
                  alt="Working on web application designs and builds"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      {/* </motion.section> */}
      </section>

      <section id="work" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative inline-block mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Work</h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary"></div>
          </motion.div>
          <div className="space-y-0">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="block group py-16"
                >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                {/* 16:9 container for 1280x720 demos */}
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    // Use contain to ensure the full 1280x720 fits without cropping
                    className="object-contain"
                    // optional: improves perceived quality while loading
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={false}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <p className="text-foreground/70 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
                  {index < projects.length - 1 && <div className="mt-24 -mb-8 border-b border-border/50"></div>}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        id="contact"
        className="bg-primary py-20 pb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Let's Connect</h2>
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-primary-foreground/80"></div>
            </motion.div>
            <motion.p
              className="text-lg text-primary-foreground/90 text-left mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just
              want to say hi, feel free to reach out!
            </motion.p>
            <motion.form
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
            >
              <div className="space-y-3">
                <label htmlFor="name" className="text-base font-medium text-primary-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-primary-foreground border-primary-foreground/30 text-primary placeholder:text-primary/50"
                  value={formState.name}
                  onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="text-base font-medium text-primary-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-primary-foreground border-primary-foreground/30 text-primary placeholder:text-primary/50"
                  value={formState.email}
                  onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="message" className="text-base font-medium text-primary-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-primary-foreground border-primary-foreground/30 text-primary placeholder:text-primary/50 resize-none"
                  value={formState.message}
                  onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                  required
                />
              </div>
              <div>
                {/* <p className="mb-3 text-sm font-medium text-primary-foreground">Are you a human?</p> */}
                <div
                  ref={recaptchaContainerRef}
                  className="g-recaptcha"
                />
              </div>
              {submitMessage && (
                <p className="text-sm text-primary-foreground" role="status" aria-live="polite">
                  {submitMessage}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#ECE5FF] text-primary hover:bg-[#ECE5FF]/90 cursor-pointer"
                disabled={submitStatus === "sending"}
              >
                {submitStatus === "sending" ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Joss Tripoli. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/joss-tripoli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/jossTripoli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:joss@josstripoli.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="fixed bottom-8 right-8 rounded-full shadow-lg z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
