export function shouldOpenInNewTab(href: string, openInNewTab?: boolean) {
  if (typeof openInNewTab === "boolean") {
    return openInNewTab
  }

  return !href.startsWith("/") && !href.startsWith("#")
}