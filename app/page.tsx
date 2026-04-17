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
      tech: ["Next.js", "React", "PostgreSQL", "Prisma ORM", "Node.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Figma", "Adobe Illustrator", "Zustand", "Docker", "AWS", "TipTap", "OpenAI API", "HubSpot API", "Stripe API"],
      image: "/demo/dart.gif",
    },
    {
      id: "miniature-reserve",
      title: "MiniNature Reserve",
      description:
        "Nonprofit website for a community-driven initiative restoring urban biodiversity through native plant gardens and environmental education.",
      tech: ["Payload CMS", "Shopify", "Next.js", "React", "Figma", "Canva", "Tailwind CSS", "Shadcn/ui", "Node.js", "TypeScript", "Vercel", "Lexical", "ArcGIS"],
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
    signature: { delay: 1.20, duration: 0.15 }, 
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

  const SIGNATURE_DELAY = heroTimings.signature.delay


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

    {/* 2) Signature write (left -> right mask reveal) */}
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: heroTimings.signature.delay, duration: heroTimings.signature.duration, ease: "easeOut" }}
    >
      <motion.svg
        width="293"
        height="230"
        viewBox="0 0 293 230"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 md:ml-4"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="293" height="230">
            {/* animated reveal from left -> right */}
            <motion.rect
              x="0"
              y="0"
              height="230"
              initial={{ width: 0 }}
              animate={{ width: 293 }}
              transition={{ duration: heroTimings.signature.delay, ease: "easeInOut", delay: SIGNATURE_DELAY }}
              fill="white"
            />
          </mask>
        </defs>

        {/* keep your original filled paths, just wrap them in a masked group */}
        <g mask={`url(#${maskId})`}>
                    <path d="M292.701 141.666C288.457 149.722 282.071 157.408 274.099 161.92C269.676 164.423 260.164 168.67 260.304 159.837C260.311 159.533 261.056 155.868 260.017 156.897C258.711 160.559 253.664 164.829 250.06 165.976C246.8 167.014 243.891 164.138 243.441 161.01C242.317 153.202 250.455 143.222 251.376 135.45C248.365 135.881 246.768 139.441 245.678 141.982C243.094 147.996 242.492 151.902 237.967 157.21C229.322 167.353 217.061 167.299 218.061 151.445C218.392 146.184 220.164 143.468 221.397 138.956C221.509 138.55 221.741 137.789 221.005 137.939C220.072 139.007 218.364 139.895 217.443 140.876C215.072 143.41 214.868 149.562 213.281 153.154C210.707 158.987 200.698 168.475 194.041 164.487C190.039 162.09 191.505 158.341 194.01 155.487C199.761 148.936 210.206 145.216 210.665 134.977C210.283 134.005 211.545 129.752 210.509 129.541C202.884 133.833 196.858 141.496 192.623 149.115C184.925 162.962 178.501 178.203 171.051 192.331C167.75 198.592 159.503 215.402 154.519 219.182C150.492 222.237 146.152 219.949 146.611 214.945C147.809 201.931 163.865 184.073 171.449 173.46C175.91 167.219 181.085 159.853 183.698 152.598C182.264 151.608 171.111 165.192 165.745 164.713C162.349 164.411 160.727 158.568 161.052 154.902C161.154 153.758 161.506 151.608 161.323 151.608C160.596 150.201 153.267 158.705 148.379 162.336C145.444 163.908 140.837 165.039 138.377 162.15C135.337 158.574 137.781 153.237 139.377 149.534C141.847 143.797 145.323 138.284 147.742 132.49C147.621 131.04 141.076 133.5 140.238 133.932C137.179 135.507 133.533 143.794 131.418 147.111C128.967 150.952 125.985 155.097 123.079 158.597C121.976 159.926 117.209 165.624 115.826 165.602C113.423 165.564 116.623 162.397 116.909 162.013C118.907 159.361 120.845 156.625 122.722 153.883C124.207 151.713 134.531 136.137 134.432 135.028C134.104 133.817 132.749 133.318 132.316 132.206C131.01 128.86 134.763 122.989 138.192 122.52C140.499 122.203 141.439 123.504 141.602 125.645C141.684 126.725 140.9 129.883 141.783 130.145C145.483 129.381 148.943 126.975 152.617 126.204C156.094 125.476 158.429 125.623 156.215 129.518C154.543 132.463 136.082 162.15 146.008 158.705C153.178 154.714 162.215 144.599 166.201 137.409C167.444 135.165 171.605 124.517 173.266 124.015C175.276 123.408 176.997 125.441 177.29 127.288C178.033 131.96 170.315 143.97 169.391 145.906C168.722 147.309 163.843 160.939 170.707 158.108C173.173 157.088 180.021 148.421 181.984 145.852C186.83 139.508 189.118 133.999 192.964 127.393C194.446 124.846 196.785 122.261 199.726 124.878C202.422 127.275 200.813 130.087 200.497 132.963C203.751 130.515 210.034 122.766 214.479 125.862C217.44 127.927 215.611 133.018 216.532 136.073C216.962 136.153 217.293 135.987 217.676 135.827C226.505 132.155 234.156 117.924 244.286 126.898C245.94 128.362 246.583 130.269 248.183 131.669C248.741 131.771 254.495 128.413 255.082 127.754C256.649 126 257.178 122.414 258.016 120.235C261.289 111.74 270.144 88.6636 277.788 84.5283C284.165 81.08 283.304 93.9718 282.731 97.2762C280.226 111.708 269.102 118.768 260.776 128.918C257.551 132.848 251.914 149.281 250.136 154.867C249.575 156.635 248.795 158.418 248.909 160.313C250.136 162.505 254.279 159.837 257.943 154.516C260.769 151.339 263.319 146.354 265.501 142.691C268.133 138.278 270.013 132.74 272.833 128.636C274.535 126.16 276.396 124.319 278.77 127.572C281.099 130.765 278.83 133.938 277.333 136.897C274.191 143.116 270.125 148.91 267.146 155.225C265.83 158.018 262.541 163.496 268.414 161.166C273.229 159.255 284.267 150.329 286.191 145.516C286.981 143.541 285.965 141.493 287.144 139.639C288.619 137.329 291.602 137.732 292.695 140.106V141.659L292.701 141.666ZM280.111 88.9384C279.334 88.7914 279.12 89.3283 278.69 89.7821C276.769 91.7955 272.83 99.4685 271.371 102.297C268.484 107.896 266.123 113.779 263.717 119.599C264.431 120.276 267.984 117.026 268.481 116.422C277.333 108.752 280.589 98.6855 281.067 93.2527C281.109 92.7743 281.227 89.5775 280.111 88.9384ZM137.583 126.438C136.72 125.645 135.678 126.802 135.286 127.288C134.429 128.352 133.664 130.464 135.12 131.583C136.812 132.433 137.94 127.591 137.58 126.438H137.583ZM238.639 127.432C237.291 127.844 237.339 130.717 237.518 131.861C237.935 134.501 241.437 134.75 243.368 133.75C244.799 130.883 241.956 126.415 238.639 127.432ZM233.958 133.286C229.765 136.408 226.782 142.794 225.161 147.725C224.224 150.575 223.111 160.313 226.725 159.559C236.116 158.191 240.417 146.367 241.692 141.733C243.368 136.3 240.099 137.738 238.187 137.099C237.231 136.859 235.325 135.395 233.958 133.289V133.286ZM207.587 148.504L200.966 153.484C198.665 155.89 195.421 158.392 194.943 161.866C198.216 162.419 200.746 160.409 202.811 158.143C205.092 155.637 207.335 151.921 207.584 148.504H207.587ZM165.239 187.848C164.563 187.148 159.787 194.917 159.357 195.466C156.151 199.595 148.551 210.682 148.965 215.795C149.01 216.348 149.153 216.718 149.606 217.054C150.791 217.597 154.338 211.308 154.908 210.25C158.241 204.037 161.023 197.138 164.104 190.772L165.239 187.848Z" fill="black"/>
                    <path d="M116.913 0C119.892 0.661526 118.834 5.0653 116.448 4.98861C115.689 4.96304 115.24 4.47089 114.583 4.36863C110.215 3.69751 105.48 10.463 104.259 14.1317C100.203 26.3236 109.456 35.7096 120 39.6276C121.779 40.2892 123.48 41.1872 124.468 39.1674C125.784 36.4766 126.676 32.3349 127.96 29.3212C129.961 24.6235 132.775 18.577 137.609 16.356C147.436 11.8467 152.668 22.4407 149.835 30.852C147.637 37.3778 140.416 42.5645 133.938 44.0442C132.259 44.4277 129.522 44.1081 128.671 45.5718C127.938 46.8341 126.807 52.3372 126.377 54.1396C125.787 56.6068 125.488 59.0867 124.844 61.6082C123.818 65.6348 121.132 72.0775 120.737 75.8358C120.737 75.8358 123.082 79.6547 124.442 81.4603C125.918 83.4193 130.991 95.1287 131.564 97.5926C132.323 100.855 129.26 100.712 127.581 98.5034C125.115 95.2629 123.748 88.6221 121.708 84.8415C118.694 78.6161 117.55 86.0559 116.352 88.7946C107.497 109.065 96.2198 117.838 74.6696 122.622C54.5056 127.096 11.5614 124.932 2.04973 102.255C1.04599 99.8616 0.606253 97.3178 0.0390594 94.7995C0.125094 93.5915 -0.0820268 92.2525 0.0390594 91.07C1.94457 72.3012 26.079 63.2668 41.5398 59.0803C68.3763 51.8131 89.0024 53.7849 112.203 69.2429C112.946 69.7382 114.443 71.2626 115.202 71.1923C116.457 70.8663 116.757 69.4826 117.072 68.38C119.156 61.0649 120.227 53.379 122.39 46.0735C122.534 44.8783 122.645 44.613 121.648 43.8748C119.258 42.1075 115.058 40.6375 112.251 38.7392C107.111 35.2654 101.65 29.7175 100.343 23.3899C98.565 14.7964 104.326 1.31666 113.835 0.00319578H116.919L116.913 0ZM144.865 20.0024C140.266 15.7744 134.795 27.0139 133.419 30.1585C132.855 31.4464 129.844 39.4582 130.478 40.0942C133.992 39.9312 138.033 37.9115 140.658 35.5914C144.332 32.3445 149.542 24.3039 144.861 20.0024H144.865ZM112.484 73.7713C109.887 71.1188 100.381 65.9161 96.7647 64.283C74.4083 54.1716 40.2365 60.4481 19.5626 72.6751C-3.74967 86.4649 1.54626 108.081 26.0089 115.703C43.9392 121.289 61.5063 121.714 79.4461 115.936C98.1858 109.903 106.608 100.456 112.821 81.8183C113.752 79.0283 114.845 76.1873 112.48 73.7713H112.484Z" fill="black"/>
                    <path d="M86.0737 230H84.8405C84.4995 229.585 83.9037 229.345 83.5978 228.92C82.3614 227.207 80.561 220.25 79.825 217.805C74.8158 201.161 66.5342 166.257 53.5333 155.104C50.8726 152.819 46.7812 149.757 43.2123 151.211C39.379 152.774 38.047 155.992 32.5376 156.615C22.1051 157.798 20.2952 148.754 28.9146 144.881C34.9593 142.164 36.6418 144.781 41.8389 144.845C47.5173 144.916 52.2747 136.699 56.4936 133.823C58.3258 132.574 59.9732 132.657 59.0905 135.188C57.953 138.444 54.0495 142.64 51.5418 144.996C50.9873 145.517 48.7568 146.827 48.8492 147.482C50.9204 149.31 53.4855 150.556 55.6874 152.311C74.3729 167.203 76.5015 197.199 83.9164 218.665C84.0343 219.003 84.1426 220 84.6843 219.742C87.2781 214.344 89.2028 208.544 91.4811 202.97C102.631 175.697 113.742 148.377 126.784 121.976C126.854 121.714 126.443 121.216 126.319 121.216H104.734C102.028 121.216 94.008 124.798 92.0802 126.799C87.6701 131.375 84.6875 144.104 89.4704 149.032C94.8938 154.618 101.276 145.536 103.405 141.01C103.905 139.943 105.505 135.677 105.505 134.737V129.455L104.877 129.122L97.6374 135.133C95.9581 134.974 98.3002 130.615 98.7813 129.825C101.687 125.051 108.092 121.535 110.453 128.815C112.196 134.181 109.995 139.93 107.175 144.5C102.497 152.084 92.8003 161.591 85.9462 150.406C79.1877 139.374 83.9196 125.249 95.4292 119.918C105.588 115.211 116.788 118.301 127.246 117.176C130.844 116.79 131.937 112.763 133.807 110.114C137.347 105.096 147.378 93.6491 153.767 93.5308C157.317 93.4637 160.969 97.0558 161.319 100.546C162.167 108.979 152.104 116.86 144.861 118.771C141.662 119.615 136.818 119.691 134.11 120.679C133.371 120.947 133.154 121.085 132.685 121.73C130.595 124.626 127.686 132.021 126.109 135.616C118.4 153.177 111.24 170.971 103.794 188.653C100.148 197.314 95.9454 205.786 92.402 214.469C90.7418 218.537 89.1072 225.427 87.2399 228.846C86.9372 229.399 86.4879 229.594 86.0705 230H86.0737ZM155.924 98.056C153.245 97.9761 145.533 103.828 143.43 105.828C141.327 107.829 139.068 110.663 137.723 113.131C137.188 114.112 135.92 115.927 137.943 115.869C142.239 115.748 149.81 112.172 152.999 109.254C155.501 106.966 159.022 101.702 156.986 98.3852C156.661 98.1871 156.307 98.0688 155.928 98.056H155.924ZM29.332 152.295C30.0808 152.308 30.8265 152.346 31.5721 152.221C32.834 152.01 39.0062 149.361 38.5824 147.798C35.5106 145.855 29.5359 148.645 29.332 152.295Z" fill="black"/>
                    <path d="M224.612 71.7164C224.998 72.0935 225.635 72.0967 226.142 72.0456C229.134 71.7484 239.856 67.2551 242.399 65.4048C244.897 63.5864 243.601 62.1611 244.432 59.6843C245.436 56.6995 247.765 56.0987 249.645 58.7639C254.75 66.0024 239.857 69.6551 234.841 71.5854C233.353 72.1574 228.064 74.3018 227.034 75.7399C226.247 76.8392 227.824 80.5464 227.92 81.9046C228.274 86.8452 226.575 92.4027 222.656 95.5505C211.009 104.901 194.143 86.6087 210.136 78.271C212.638 76.9671 216.767 76.101 218.896 74.6693C219.374 74.3465 219.721 74.0685 219.836 73.4613L210.458 59.3871L209.559 59.662C204.569 66.1686 199.63 68.5494 191.983 70.9462C193.576 75.1007 194.312 81.7895 194.322 83.7805C194.379 97.0046 177.21 101.488 169.174 91.6964C163.002 84.1799 167.96 78.7567 174.922 75.1039C176.691 74.174 184.705 71.6653 185.011 70.3422C185.588 67.8399 179.546 61.1831 178.361 58.5083C172.673 45.6996 190.985 36.5118 198.579 47.7641C199.971 49.8286 202.536 57.23 198.76 57.7988C195.236 58.3293 196.371 54.5903 196.157 52.382C195.437 44.9326 189.618 45.6005 185.208 49.7263C181.467 56.0284 187.107 61.9821 189.985 67.9262C191.345 69.1438 196.52 66.9675 198.129 66.1686C200.918 64.7848 203.537 62.2953 205.407 59.8281C210.095 53.6443 211.207 43.1686 221.601 44.1401C229.373 44.8655 233.598 50.5476 232.875 58.2942C232.645 60.7453 230.364 61.5507 228.43 60.2596C226.002 58.6361 229.182 52.6089 226.394 49.5697C223.322 46.2205 213.246 50.5316 214.122 56.0284C214.54 58.6489 221.311 65.8074 223.242 68.9073C223.653 69.5657 224.284 71.3937 224.612 71.7164ZM183.857 73.6626C180.756 74.5637 178.052 76.1809 176.369 77.178C172.717 79.3447 167.221 85.8897 172.574 89.8205C177.37 93.3422 186.811 90.3861 187.764 84.3078C188.012 82.7099 187.362 76.2193 186.884 75.1007C186.725 74.6214 186.305 73.1066 185.769 73.1833C185.769 73.1833 184.813 73.1833 183.857 73.6626ZM220.82 77.178C219.743 76.4973 212.134 79.7346 210.783 80.5336C206.905 82.8249 205.2 88.5518 210.343 91.5398C219.329 96.7617 223.366 86.3531 221.716 78.99L220.82 77.178Z" fill="black"/>
                    <path d="M152.005 40.1869C157.084 39.666 160.962 41.6058 164.088 45.5398C165.385 47.1729 166.242 49.9915 167.606 51.452C169.171 51.0174 186.983 41.3086 188.637 42.9832C190.884 45.2554 169.458 52.3276 168.722 54.3282C168.036 56.1849 169.212 61.5571 169.222 63.9219C169.263 75.4427 162.938 89.0823 150.845 91.853C137.236 94.9689 132.775 82.2657 133.568 71.0229C134.25 61.3909 140.821 41.331 152.005 40.1837V40.1869ZM159.975 45.4887C158.158 43.6831 155.612 43.6192 153.602 45.2171C151.827 46.6232 152.4 48.6078 153.602 50.3335C155.657 54.3282 159.745 54.2867 162.827 52.676C163.601 51.3817 160.959 46.4666 159.978 45.4887H159.975ZM149.179 49.1319C141.318 54.3282 135.831 89.469 148.178 87.9254C160.526 86.3818 166.698 68.8434 164.64 58.0385C164.64 53.8488 160.88 56.4854 158.085 56.2521C155.657 56.0475 153.592 54.4912 152.075 52.676C151.511 52.0017 149.982 48.9913 149.182 49.1319H149.179Z" fill="black"/>
                    <path d="M285.793 109.826C286.456 110.497 287.37 112.069 287.434 113.015C287.654 116.259 281.679 122.139 278.649 119.669C276.262 117.723 279.57 114.984 280.319 113.255C280.787 112.172 281.112 109.407 281.733 108.775C282.763 107.726 284.955 108.976 285.796 109.826H285.793Z" fill="black"/>
                    <path d="M178.17 106.95C179.6 106.467 182.64 108.474 183.344 109.74C185.556 113.722 180.231 120.899 176.321 117.128C174.336 115.211 176.347 113.888 176.962 111.961C177.284 110.957 177.542 107.164 178.17 106.95Z" fill="black"/>
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
