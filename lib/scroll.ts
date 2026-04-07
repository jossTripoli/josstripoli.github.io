export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto"
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
}

export function scrollToHash(hash: string) {
  if (typeof window === "undefined") return

  const id = hash.replace("#", "")
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: getScrollBehavior(), block: "start" })
  window.history.pushState(null, "", `#${id}`)
}
