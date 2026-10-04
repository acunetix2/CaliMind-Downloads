import { useEffect, useRef, useState, type MouseEvent } from "react"
import {
  ChevronDown,
  CircleHelp,
  Download,
  Menu,
} from "lucide-react"

import { AboutPage } from "@/pages/AboutPage"
import { HelpPage } from "@/pages/HelpPage"
import { LegalPage } from "@/pages/LegalPage"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ReleaseDetailPage } from "@/pages/ReleaseDetailPage"
import { DownloadTray } from "@/components/DownloadTray"
import { SiteFooter } from "@/components/SiteFooter"
import { Button } from "@/components/ui/button"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Toaster, toast } from "@/components/ui/toast"
import {
  RELEASES_API,
  RELEASE_FOCUS_REFRESH_THRESHOLD_MS,
  RELEASE_REFRESH_INTERVAL_MS,
  formatSize,
  releasePath,
} from "@/lib/releases"
import type {
  DownloadJob,
  DownloadOption,
  GithubRelease,
  ReleaseState,
} from "@/lib/releases"
import "./App.css"

function isReleaseList(value: unknown): value is GithubRelease[] {
  if (!Array.isArray(value)) return false
  return value.every((item: unknown) => {
    if (!item || typeof item !== "object") return false
    const release = item as Record<string, unknown>
    return typeof release.id === "number" &&
      typeof release.tag_name === "string" &&
      Array.isArray(release.assets) &&
      typeof release.prerelease === "boolean"
  })
}

function App() {
  const [releases, setReleases] = useState<GithubRelease[]>([])
  const [releaseState, setReleaseState] = useState<ReleaseState>("loading")
  const [loadError, setLoadError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(null)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [downloadJobs, setDownloadJobs] = useState<DownloadJob[]>([])
  const hasLoadedReleases = useRef(false)
  const lastReleaseRequestAt = useRef(0)

  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname)
    window.addEventListener("popstate", syncPath)
    return () => window.removeEventListener("popstate", syncPath)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadReleases() {
      lastReleaseRequestAt.current = Date.now()
      setIsRefreshing(true)
      if (!hasLoadedReleases.current) setReleaseState("loading")
      setLoadError("")
      try {
        const response = await fetch(RELEASES_API, {
          cache: "no-store",
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(
            response.status === 403 || response.status === 429
              ? "GitHub is temporarily limiting release requests. Try again shortly."
              : `The release source returned ${response.status}.`,
          )
        }
        const data: unknown = await response.json()
        if (!isReleaseList(data)) {
          throw new Error("The release source returned an unexpected release list.")
        }
        setReleases(data)
        hasLoadedReleases.current = true
        setLastCheckedAt(new Date())
        setReleaseState("ready")
      } catch (error) {
        if (controller.signal.aborted) return
        setLoadError(error instanceof Error ? error.message : "Could not connect to the release source.")
        if (!hasLoadedReleases.current) setReleaseState("error")
      } finally {
        if (!controller.signal.aborted) setIsRefreshing(false)
      }
    }

    void loadReleases()
    return () => controller.abort()
  }, [refreshKey])

  useEffect(() => {
    const refreshIfStale = () => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - lastReleaseRequestAt.current > RELEASE_FOCUS_REFRESH_THRESHOLD_MS
      ) {
        setRefreshKey((value) => value + 1)
      }
    }
    const interval = window.setInterval(
      () => setRefreshKey((value) => value + 1),
      RELEASE_REFRESH_INTERVAL_MS,
    )
    window.addEventListener("focus", refreshIfStale)
    document.addEventListener("visibilitychange", refreshIfStale)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener("focus", refreshIfStale)
      document.removeEventListener("visibilitychange", refreshIfStale)
    }
  }, [])

  function navigateTo(path: string) {
    if (window.location.pathname !== path) window.history.pushState({}, "", path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function navigateToFeatures() {
    if (!isHome) navigateTo("/")
    window.setTimeout(() => {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
    }, isHome ? 0 : 80)
  }

  function navigateFromEvent(event: MouseEvent, path: string) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return
    event.preventDefault()
    navigateTo(path)
  }

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value)
      toast.add({ title: `${label} copied`, description: value, type: "success" })
    } catch {
      toast.add({
        title: `Could not copy ${label.toLowerCase()}`,
        description: "Clipboard access is unavailable in this browser.",
        type: "error",
      })
    }
  }

  async function downloadAsset(asset: DownloadOption) {
    const jobId = `${Date.now()}-${asset.id}`
    setDownloadJobs((jobs) => [
      ...jobs.filter((job) => job.status === "downloading"),
      { id: jobId, name: asset.name, status: "downloading", progress: 0 },
    ])
    try {
      const response = await fetch(asset.download_url)
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "This file is no longer available in the release."
            : `The download server returned ${response.status}.`,
        )
      }

      const contentLength = Number(response.headers.get("content-length")) || asset.size || 0
      const chunks: ArrayBuffer[] = []
      let receivedLength = 0
      if (response.body) {
        const reader = response.body.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (!value) continue
          const chunk = new ArrayBuffer(value.byteLength)
          new Uint8Array(chunk).set(value)
          chunks.push(chunk)
          receivedLength += value.length
          setDownloadJobs((jobs) => jobs.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  progress: contentLength > 0
                    ? Math.min(99, Math.round((receivedLength / contentLength) * 100))
                    : null,
                }
              : job,
          ))
        }
      } else {
        const buffer = await response.arrayBuffer()
        chunks.push(buffer)
        receivedLength = buffer.byteLength
      }

      if (receivedLength === 0) throw new Error("The downloaded file was empty.")
      const blob = new Blob(chunks, {
        type: response.headers.get("content-type") || "application/octet-stream",
      })
      const objectUrl = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = objectUrl
      anchor.download = asset.name
      anchor.style.display = "none"
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000)
      setDownloadJobs((jobs) => jobs.map((job) =>
        job.id === jobId
          ? { ...job, status: "complete", progress: 100, message: formatSize(receivedLength) }
          : job,
      ))
      toast.add({ title: "Download ready", description: `${asset.name} was saved by your browser.`, type: "success" })
    } catch (error) {
      const message = error instanceof Error
        ? error.message.includes("Failed to fetch")
          ? "The file server blocked this browser download. Try again or contact support."
          : error.message
        : "The download could not be completed."
      setDownloadJobs((jobs) => jobs.map((job) =>
        job.id === jobId ? { ...job, status: "error", progress: null, message } : job,
      ))
      toast.add({ title: "Download failed", description: message, type: "error" })
    }
  }

  function dismissDownload(jobId: string) {
    setDownloadJobs((jobs) => jobs.filter((job) => job.id !== jobId))
  }

  function retryLoading() {
    setRefreshKey((value) => value + 1)
  }

  let releaseTag: string | undefined
  if (currentPath.startsWith("/releases/")) {
    try {
      releaseTag = decodeURIComponent(currentPath.slice("/releases/".length))
    } catch {
      releaseTag = undefined
    }
  }
  const selectedRelease = releaseTag
    ? releases.find((release) => release.tag_name === releaseTag)
    : undefined
  const isHome = currentPath === "/" || currentPath === ""
  const isLegalPath = currentPath === "/terms" || currentPath === "/privacy"
  const isKnownPath = isHome || currentPath === "/about" || currentPath === "/help" || isLegalPath || Boolean(releaseTag)

  return (
    <Toaster>
      <div className="site-shell">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <header className="topbar">
          <a className="brand" href="/" onClick={(event) => navigateFromEvent(event, "/")} aria-label="CaliMind downloads home">
            <img src="/calimind_logo.svg" alt="" /><span>CaliMind</span>
          </a>
          <NavigationMenu className="desktop-nav">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" aria-current={isHome ? "page" : undefined} onClick={(event) => navigateFromEvent(event, "/")}>Downloads</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#features"
                  onClick={(event) => {
                    event.preventDefault()
                    navigateToFeatures()
                  }}
                >Features</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" aria-current={currentPath === "/about" ? "page" : undefined} onClick={(event) => navigateFromEvent(event, "/about")}>About CaliMind</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/help" aria-current={currentPath === "/help" ? "page" : undefined} onClick={(event) => navigateFromEvent(event, "/help")}>Help center</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu className="mobile-nav" aria-label="Main navigation">
            <NavigationMenuList>
              <NavigationMenuItem><NavigationMenuLink href="/" onClick={(event) => navigateFromEvent(event, "/")}>Downloads</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/#features" onClick={(event) => { event.preventDefault(); navigateToFeatures() }}>Features</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/about" onClick={(event) => navigateFromEvent(event, "/about")}>About</NavigationMenuLink></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="/help" onClick={(event) => navigateFromEvent(event, "/help")}>Help</NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="topbar-actions">
            <Menubar className="utility-menu">
              <MenubarMenu>
                <MenubarTrigger><Menu size={15} /> Explore <ChevronDown size={13} /></MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => isHome ? document.getElementById("releases")?.scrollIntoView({ behavior: "smooth" }) : navigateTo("/")}>
                    Downloads <MenubarShortcut><Download size={13} /></MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={navigateToFeatures}>Features</MenubarItem>
                  <MenubarItem onClick={() => navigateTo("/about")}>About CaliMind</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => navigateTo("/help")}>Help center <CircleHelp size={13} /></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Button
              className="github-button"
              nativeButton={false}
              render={<a href="/help" onClick={(event) => navigateFromEvent(event, "/help")}><CircleHelp /><span>Help</span></a>}
              variant="outline"
              size="sm"
            />
          </div>
        </header>

        <main id="top">
          {isHome && (
            <HomePage
              releases={releases}
              releaseState={releaseState}
              loadError={loadError}
              isRefreshing={isRefreshing}
              lastCheckedAt={lastCheckedAt}
              downloadJobs={downloadJobs}
              onDownload={downloadAsset}
              onCopy={(value, label) => void copyText(value, label)}
              onOpenRelease={(release) => navigateTo(releasePath(release))}
              onRetry={retryLoading}
              onRefresh={retryLoading}
              onNavigate={navigateTo}
            />
          )}
          {currentPath === "/about" && <AboutPage onNavigate={navigateTo} />}
          {currentPath === "/help" && <HelpPage onNavigate={navigateTo} />}
          {isLegalPath && (
            <LegalPage
              policy={currentPath === "/privacy" ? "privacy" : "terms"}
              onNavigate={navigateTo}
            />
          )}
          {releaseTag && releaseState === "loading" && !selectedRelease && (
            <section className="content-page route-loading"><span className="route-loading-icon"><Download /></span><h1>Loading release…</h1></section>
          )}
          {releaseTag && selectedRelease && (
            <ReleaseDetailPage
              release={selectedRelease}
              onBack={() => navigateTo("/")}
              onDownload={downloadAsset}
            />
          )}
          {!isKnownPath && <NotFoundPage onHome={() => navigateTo("/")} />}
          {releaseTag && releaseState === "ready" && !selectedRelease && (
            <NotFoundPage onHome={() => navigateTo("/")} />
          )}
          {releaseTag && releaseState === "error" && !selectedRelease && (
            <NotFoundPage onHome={() => navigateTo("/")} />
          )}
        </main>

        <SiteFooter onNavigate={navigateTo} />
        <DownloadTray jobs={downloadJobs} onDismiss={dismissDownload} />
      </div>
    </Toaster>
  )
}

export default App
