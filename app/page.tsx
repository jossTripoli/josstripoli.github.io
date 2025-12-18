"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, Linkedin, Github, Mail, ExternalLink } from "lucide-react"
import { useRef, useState } from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

const staggeredChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const projectCard = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay: index * 0.08,
    },
  }),
}

const projects = [
  {
    id: "dart-academy",
    title: "DART Academy",
    description:
      "A comprehensive learning platform with interactive simulations, real-time assessments, and adaptive content delivery for computer science education.",
    tech: ["Next.js", "React", "PostgreSQL", "Node.js", "TypeScript"],
    image: "/learning-platform-dashboard.png",
  },
  {
    id: "miniature-reserve",
    title: "Miniature Reserve",
    description:
      "E-commerce platform for miniature collectibles with inventory management, user authentication, and payment processing.",
    tech: ["React", "Express", "MongoDB", "Stripe", "AWS"],
    image: "/ecommerce-miniatures-store.jpg",
  },
  {
    id: "online-trolling-education",
    title: "Online Trolling Education Module",
    description:
      "Interactive educational module teaching digital citizenship and online safety through scenario-based learning and quizzes.",
    tech: ["Vue.js", "Firebase", "Tailwind CSS", "Chart.js"],
    image: "/educational-module-interface.jpg",
  },
  {
    id: "cs-documentation-site",
    title: "CS Documentation Site",
    description:
      "Comprehensive documentation platform for computer science courses with search functionality, code examples, and version control.",
    tech: ["Next.js", "MDX", "Algolia", "Vercel"],
    image: "/documentation-website.jpg",
  },
  {
    id: "success-in-cs-moodle",
    title: "Success in CS Moodle Site",
    description:
      "Custom Moodle learning management system with integrated assessments, progress tracking, and student analytics.",
    tech: ["PHP", "MySQL", "Moodle", "JavaScript", "CSS"],
    image: "/moodle-learning-management-system.jpg",
  },
]

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const aboutRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, (value) => value * 0.35)
  const aboutInView = useInView(aboutRef, { amount: 0.2, margin: "-20% 0px" })

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 500)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-foreground">
              Joss Tripoli
            </Link>
            <div className="flex gap-8">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Work
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      <section className="px-6 pt-20 pb-20 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            className="order-2 md:order-1"
            style={{ y: heroParallax }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: aboutInView ? 0 : 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="transition-transform duration-700"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <Image
                src="/headshot.png"
                alt="Joss Tripoli"
                width={400}
                height={500}
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="order-1 md:order-2 space-y-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg">Hello, I'm</p>
            <div className="space-y-4">
              <svg width="293" height="230" viewBox="0 0 293 230" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M292.701 141.666C288.457 149.722 282.071 157.408 274.099 161.92C269.676 164.423 260.164 168.67 260.304 159.837C260.311 159.533 261.056 155.868 260.017 156.897C258.711 158.178 258.116 160.761 258.057 162.442C257.783 170.237 260.585 177.381 260.635 185.113C260.691 193.634 257.786 209.053 247.662 210.56C240.851 211.573 234.065 209.175 227.366 208.353C218.107 207.212 208.631 206.877 199.502 204.973C195.925 204.221 188.734 203.712 186.589 200.605C185.661 199.246 184.57 193.006 187.19 193.552C186.469 185.182 183.26 172.693 185.1 164.637C187.105 155.801 190.321 147.947 192.542 139.271C196.32 124.291 202.424 109.8 202.171 94.1162C202.015 84.3109 197.899 70.5901 185.665 69.8307C173.057 69.0478 159.887 71.0314 147.3 71.4832C141.135 71.7071 135.198 70.4359 129.142 70.4368C125.415 70.4374 121.807 70.925 118.053 70.4107C114.718 69.954 114.2 69.924 114.5 66.3046C114.543 65.7858 115.175 65.1881 115.257 64.4698C113.707 63.5513 111.851 62.136 110.129 61.5325C101.865 58.6997 91.7401 59.5562 86.7558 50.988C83.3176 45.0438 84.1462 38.0944 81.7831 32.1712C78.1442 22.995 71.9429 20.2613 62.406 22.8925C48.4525 26.7678 26.5181 46.0631 40.6327 61.0247C42.4494 62.974 44.9015 64.3488 47.6179 65.0548C45.8341 71.0552 50.9719 79.1591 54.2234 83.6619C57.9116 88.7389 63.6066 93.3542 69.7944 94.9871C74.847 96.3332 79.8912 93.9703 85.063 96.511C90.2486 99.06 93.2775 105.268 97.2036 109.201C106.448 118.467 119.101 124.348 129.581 131.552C136.547 136.31 143.368 141.19 150.549 145.523C152.936 146.964 157.415 149.713 154.968 153.078C152.274 156.799 146.223 154.979 142.694 154.186C130.671 151.517 118.293 152.16 106.037 151.438C101.964 151.197 98.2755 150.993 97.5975 155.423C99.4353 157.107 104.918 157.494 104.659 160.513C104.442 162.945 101.231 163.663 99.4149 164.31C88.3343 168.239 77.752 171.956 67.601 177.776C63.8901 179.919 60.9551 183.934 62.1485 188.25C63.5096 193.158 68.0847 194.472 72.8087 194.467C83.5153 194.454 94.1424 189.374 104.369 186.832C113.443 184.56 123.09 183.775 132.243 181.663C136.192 180.761 141.842 178.574 144.665 182.596C145.392 183.624 145.154 187.616 145.693 187.674C146.018 187.709 146.292 185.451 146.445 185.129C147.145 183.675 147.465 182.692 148.869 181.637C150.337 180.534 151.774 179.274 153.151 178.062C154.12 177.207 155.322 176.29 156.099 175.249C163.257 165.562 179.341 182.023 181.837 188.786C183.016 191.917 183.325 195.145 183.348 198.433C183.357 199.64 184.057 202.611 183.136 203.519C181.544 205.09 172.693 204.436 170.583 204.484C163.416 204.649 156.226 203.272 149.02 203.357C143.436 203.417 137.638 203.841 132.07 203.02C129.092 202.581 126.508 201.58 123.7 200.339C120.111 198.743 117.226 195.897 113.593 194.373C111.235 193.396 107.634 192.245 105.021 192.877C103.386 193.272 102.097 194.472 100.432 194.912C91.141 197.368 82.039 201.587 72.4244 202.976C59.9864 204.797 46.2234 204.32 34.6584 198.713C28.2345 195.57 22.207 191.678 17.3223 186.403C12.1796 180.844 9.58861 174.06 6.10312 167.477C5.05562 165.514 3.99939 163.634 3.81883 161.375C3.53012 157.747 2.3617 147.927 4.16934 144.865C6.58688 140.756 12.4873 139.409 14.8038 135.21C15.8812 133.287 18.5977 124.858 17.4264 123.214C14.2122 118.633 3.37212 126.233 0.775345 128.28C-4.86062 132.67 1.40213 134.996 5.75766 136.162C7.33039 136.588 11.1223 136.75 10.6801 139.214C9.85791 143.833 0.181534 145.544 0.000489107 150.564C-0.156705 154.974 4.20477 165.35 6.84083 168.493C10.2041 172.541 20.7784 184.155 24.8713 179.665C28.3252 175.884 27.2694 167.527 28.2853 162.777C29.2208 158.411 33.1029 155.379 36.7997 153.367C42.262 150.4 47.8079 154.658 53.7625 151.994C59.8474 149.276 61.1278 140.689 59.6477 135.26C57.8322 128.521 56.7626 121.725 54.1761 115.176C53.1959 112.744 51.5799 109.598 51.905 106.989C52.1875 104.747 54.1267 102.319 55.1419 100.256C55.8245 98.8757 57.1474 94.9976 58.0381 93.9467C59.651 92.0771 60.921 92.7265 63.0633 93.0916C66.7618 93.7242 67.8893 90.2047 69.5168 87.6428C71.3485 84.7614 74.1873 82.7285 77.2569 84.8249C80.248 86.8696 81.2565 90.912 83.6384 93.3888C86.4482 96.3014 89.8368 98.1588 93.4612 100.201C96.1748 101.716 99.823 103.995 100.542 107.274C101.434 111.404 97.3696 113.008 94.6474 114.954C90.5207 117.979 90.2436 121.301 95.799 122.509C104.1 124.332 115.421 122.059 123.639 118.982C126.282 117.994 129.762 116.981 131.541 114.74C132.815 113.103 132.907 109.938 134.092 108.208C135.291 106.45 141.957 105.503 143.984 105.182C148.328 104.487 152.792 103.349 157.121 102.881C160.773 102.493 164.466 102.202 168.122 101.826C170.815 101.546 173.35 101.31 176.026 101.118C178.578 100.936 181.206 101.548 182.53 98.8304C184.104 95.5937 182.312 91.9473 179.074 90.7589C169.234 87.2434 162.705 94.8772 153.847 97.8426C148.616 99.5961 142.663 98.4475 137.291 98.2645C134.09 98.154 130.578 98.0601 127.466 97.1602C123.925 96.1305 122.657 94.6302 121.945 91.0032C120.861 85.5379 124.845 83.853 129.566 83.525C134.94 83.1534 140.205 82.4629 145.571 82.0814C148.558 81.8687 157.6 79.8636 152.005 78.7622C150.442 78.4513 146.093 78.5312 145.888 76.393C145.619 73.5676 149.737 72.3376 151.822 71.6168C156.11 70.1345 167.581 67.7659 169.63 63.544C171.516 59.6664 165.153 55.2562 162.061 54.1256C146.083 48.1903 125.927 44.8358 111.518 34.4152C108.273 32.0386 99.6547 23.9466 100.643 19.7987C101.402 16.5959 102.169 9.36158 99.7404 6.75846C97.6186 4.48925 94.4707 4.49913 91.7719 5.60192C84.9456 8.41526 79.3313 16.0847 78.2145 23.1132C75.5188 39.8813 93.7115 39.7886 104.031 44.8385C107.982 46.745 114.08 50.5483 117.705 46.0646C119.771 43.525 116.792 37.3165 119.671 35.5452C121.592 34.3429 124.375 35.2981 126.4 34.597C133.36 32.1386 138.702 30.4039 146.241 31.173C156.683 32.2502 163.807 42.1628 173.923 44.8597C180.184 46.5231 184.548 44.0946 189.297 39.7786C193.075 36.3984 197.782 31.5037 197.955 26.2001C198.215 18.336 190.156 15.5809 183.714 14.7726C169.302 12.94 153.901 15.3378 139.411 13.0722C131.067 11.7779 123.871 5.07083 116.913 0C119.892 0.661526 118.834 5.0653 116.448 4.98861C115.689 4.96304 115.24 4.47089 114.583 4.36863C110.215 3.69751 105.48 10.463 104.259 14.1317C100.203 26.3236 91.1935 28.2567 86.0737 40.1869C86.0737 40.1869 86.0737 230 86.0737 230C86.0737 230 85.0539 229.793 84.8405 230H84.8405C84.4995 229.585 83.9037 229.345 83.5978 228.92C82.3614 227.207 80.561 220.25 79.825 217.805C74.8158 201.161 66.5342 166.257 53.5333 155.104C50.8726 152.83 48.457 152.012 45.1032 152.455C43.3886 152.681 36.657 152.065 36.1149 154.409C35.4397 157.401 41.7078 159.026 43.3475 159.582C48.2932 161.293 53.4822 163.854 54.2011 169.77C55.5368 180.63 60.2446 193.165 68.4176 200.632C69.6664 201.789 70.9925 202.968 72.5049 203.811C82.0462 209.086 93.1217 207.341 103.209 205.031C108.202 203.918 112.543 201.447 117.59 200.459C118.629 200.255 122.363 198.519 123.174 199.076C123.79 199.5 123.916 201.759 124.033 202.438C125.99 213.999 129.873 215.602 141.45 217.442C153.512 219.361 165.878 218.835 178.056 218.423C185.495 218.167 192.944 218.271 200.384 218.2C203.928 218.167 211.336 218.485 211.617 213.515C211.835 209.667 208.471 207.175 205.809 205.35C196.416 198.861 196.998 187.901 195.716 177.35C195.086 172.167 192.189 157.324 199.352 155.527C203.016 154.623 210.917 162.07 213.682 164.424C221.556 171.208 232.866 179.06 231.473 191.101C230.683 197.893 224.536 199.344 218.951 196.121C216.667 194.779 211.13 190.765 209.672 194.564C205.96 204.176 216.026 206.481 223.243 209.04C229.948 211.421 241.201 211.699 245.233 204.777C247.523 200.841 247.838 195.578 247.829 191.222C247.812 182.853 241.746 168.638 245.228 161.007C246.833 157.476 252.47 152.204 254.872 158.431C255.489 160.065 255.828 166.26 258.459 165.81C264.332 164.827 265.016 154.039 265.107 149.723C265.332 138.724 272.478 124.863 286.782 125.04C288.781 125.05 292.684 126.538 292.701 128.254C292.743 134.678 292.689 141.1 292.701 141.666Z" />
                <path d="M116.913 0C119.892 0.661526 118.834 5.0653 116.448 4.98861C115.689 4.96304 115.24 4.47089 114.583 4.36863C110.215 3.69751 105.48 10.463 104.259 14.1317C100.203 26.3236 91.1935 28.2567 86.0737 40.1869C86.0737 40.1869 86.0737 230 86.0737 230C86.0737 230 85.0539 229.793 84.8405 230H84.8405C84.4995 229.585 83.9037 229.345 83.5978 228.92C82.3614 227.207 80.561 220.25 79.825 217.805C74.8158 201.161 66.5342 166.257 53.5333 155.104C50.8726 152.83 48.457 152.012 45.1032 152.455C43.3886 152.681 36.657 152.065 36.1149 154.409C35.4397 157.401 41.7078 159.026 43.3475 159.582C48.2932 161.293 53.4822 163.854 54.2011 169.77C55.5368 180.63 60.2446 193.165 68.4176 200.632C69.6664 201.789 70.9925 202.968 72.5049 203.811C82.0462 209.086 93.1217 207.341 103.209 205.031C108.202 203.918 112.543 201.447 117.59 200.459C118.629 200.255 122.363 198.519 123.174 199.076C123.79 199.5 123.916 201.759 124.033 202.438C125.99 213.999 129.873 215.602 141.45 217.442C153.512 219.361 165.878 218.835 178.056 218.423C185.495 218.167 192.944 218.271 200.384 218.2C203.928 218.167 211.336 218.485 211.617 213.515C211.835 209.667 208.471 207.175 205.809 205.35C196.416 198.861 196.998 187.901 195.716 177.35C195.086 172.167 192.189 157.324 199.352 155.527C203.016 154.623 210.917 162.07 213.682 164.424C221.556 171.208 232.866 179.06 231.473 191.101C230.683 197.893 224.536 199.344 218.951 196.121C216.667 194.779 211.13 190.765 209.672 194.564C205.96 204.176 216.026 206.481 223.243 209.04C229.948 211.421 241.201 211.699 245.233 204.777C247.523 200.841 247.838 195.578 247.829 191.222C247.812 182.853 241.746 168.638 245.228 161.007C246.833 157.476 252.47 152.204 254.872 158.431C255.489 160.065 255.828 166.26 258.459 165.81C264.332 164.827 265.016 154.039 265.107 149.723C265.332 138.724 272.478 124.863 286.782 125.04C288.781 125.05 292.684 126.538 292.701 128.254C292.743 134.678 292.689 141.1 292.701 141.666Z" />
                <path d="M86.0737 230H84.8405C84.4995 229.585 83.9037 229.345 83.5978 228.92C82.3614 227.207 80.561 220.25 79.825 217.805C74.8158 201.161 66.5342 166.257 53.5333 155.104C50.8726 152.83 48.457 152.012 45.1032 152.455C43.3886 152.681 36.657 152.065 36.1149 154.409C35.4397 157.401 41.7078 159.026 43.3475 159.582C48.2932 161.293 53.4822 163.854 54.2011 169.77C55.5368 180.63 60.2446 193.165 68.4176 200.632C69.6664 201.789 70.9925 202.968 72.5049 203.811C82.0462 209.086 93.1217 207.341 103.209 205.031C108.202 203.918 112.543 201.447 117.59 200.459C118.629 200.255 122.363 198.519 123.174 199.076C123.79 199.5 123.916 201.759 124.033 202.438C125.99 213.999 129.873 215.602 141.45 217.442C153.512 219.361 165.878 218.835 178.056 218.423C185.495 218.167 192.944 218.271 200.384 218.2C203.928 218.167 211.336 218.485 211.617 213.515C211.835 209.667 208.471 207.175 205.809 205.35C196.416 198.861 196.998 187.901 195.716 177.35C195.086 172.167 192.189 157.324 199.352 155.527C203.016 154.623 210.917 162.07 213.682 164.424C221.556 171.208 232.866 179.06 231.473 191.101C230.683 197.893 224.536 199.344 218.951 196.121C216.667 194.779 211.13 190.765 209.672 194.564C205.96 204.176 216.026 206.481 223.243 209.04C229.948 211.421 241.201 211.699 245.233 204.777C247.523 200.841 247.838 195.578 247.829 191.222C247.812 182.853 241.746 168.638 245.228 161.007C246.833 157.476 252.47 152.204 254.872 158.431C255.489 160.065 255.828 166.26 258.459 165.81C264.332 164.827 265.016 154.039 265.107 149.723C265.332 138.724 272.478 124.863 286.782 125.04C288.781 125.05 292.684 126.538 292.701 128.254C292.743 134.678 292.689 141.1 292.701 141.666Z" />
                <path d="M224.612 71.7164C224.998 72.0935 225.635 72.0967 226.142 72.0456C229.134 71.7484 239.856 67.2551 242.399 65.4048C244.897 63.5864 243.601 62.1611 244.432 59.6843C245.436 56.6177 247.352 53.652 248.304 50.5348C248.621 49.4649 248.809 47.9226 248.12 47.0095C246.732 45.1439 242.787 47.9453 241.03 48.4078C237.645 49.3102 233.34 49.4485 229.649 50.1185C228.061 50.4062 225.337 51.1296 223.897 50.8094C221.01 50.1686 219.967 42.3115 218.04 40.1199C215.469 37.1555 210.898 40.7909 207.985 41.7256C203.687 43.064 195.987 46.1482 195.067 51.1014C194.175 55.8846 198.262 61.1172 201.707 63.8923C209.382 70.0834 231.398 69.4891 224.612 71.7164Z" />
                <path d="M152.005 40.1869C157.084 39.666 160.962 41.6058 164.088 45.5398C165.385 47.1729 166.242 49.9915 167.606 51.452C169.171 51.0174 186.983 41.3086 188.637 42.9832C190.884 45.3092 186.829 50.4708 185.018 52.3782C181.076 56.574 176.219 60.876 170.881 63.3855C162.338 67.5464 150.326 69.0015 142.878 74.8199C141.333 75.9941 139.468 80.6636 136.96 80.7711C134.72 80.8656 133.877 78.2142 134.113 76.4098C134.796 71.2254 141.444 66.9975 146.651 66.6696C148.558 66.5504 152.56 67.0408 152.005 64.5688C150.848 59.2855 146.065 59.5135 142.678 57.0812C137.395 53.2616 144.712 50.4353 147.482 48.5483C148.777 47.6613 150.325 46.669 150.888 45.1727C151.496 43.56 151.309 41.7905 152.005 40.1869Z" />
                <path d="M285.793 109.826C286.456 110.497 287.37 112.069 287.434 113.015C287.654 116.259 281.679 122.139 278.649 119.669C276.262 117.723 279.57 114.984 280.319 113.255C280.787 112.19 281.071 110.924 281.76 109.981C283.312 107.68 285.872 109.837 285.793 109.826Z" />
                <path d="M178.17 106.95C179.6 106.467 182.64 108.474 183.344 109.74C185.556 113.722 180.231 120.899 176.321 117.128C174.336 115.211 176.347 113.888 176.962 111.961C177.284 110.913 177.535 107.965 178.17 106.95Z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight text-balance">
              Full-Stack Software Engineer building educational technology
            </h1>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full" asChild>
                <a href="#work">See selected work</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="#contact">Contact</a>
              </Button>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="default" size="icon" asChild className="rounded-full bg-primary hover:bg-primary/90">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="default" size="icon" asChild className="rounded-full bg-primary hover:bg-primary/90">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="default" size="icon" asChild className="rounded-full bg-primary hover:bg-primary/90">
                <a href="mailto:joss@example.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="about"
        ref={aboutRef}
        className="bg-primary py-20"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggeredChildren} className="space-y-8 px-6">
            <motion.div variants={fadeInUp} className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">About</h2>
              <div className="absolute -bottom-2 left-0 w-20 h-1 bg-primary-foreground/80"></div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4 text-lg text-primary-foreground/90 leading-relaxed">
              <p>
                I'm a full-stack software engineer with a strong focus on education technology. I've built production
                learning platforms with interactive simulations, assessments, and large-scale content systems, owning
                everything from UX design to backend architecture and deployment.
              </p>
              <p>
                I'm especially interested in systems that help people acquire skills, build confidence, and navigate
                complex digital environments.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="work"
        className="px-6 py-20"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="relative inline-block mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Work</h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary"></div>
          </motion.div>
          <motion.div variants={staggeredChildren} className="space-y-0">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block group">
                <motion.div
                  className="py-16"
                  variants={projectCard}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-32 h-40 bg-muted rounded-lg shadow-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} mobile`}
                          fill
                          className="object-cover rounded-lg"
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
                  {index < projects.length - 1 && <div className="mt-16 border-b border-border/50"></div>}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="bg-primary py-20"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={staggeredChildren} className="max-w-2xl mx-auto">
            <motion.div variants={fadeInUp} className="relative inline-block mb-8 mx-auto block text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Let's Connect</h2>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary-foreground/80"></div>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-primary-foreground/90 text-center mb-12 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want
              to say hi, feel free to reach out!
            </motion.p>
            <motion.form variants={fadeInUp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-primary-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-primary-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-primary-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Send Message
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      <footer className="border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Joss Tripoli. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:joss@example.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button onClick={scrollToTop} size="icon" className="fixed bottom-8 right-8 rounded-full shadow-lg z-50" aria-label="Scroll to top">
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
