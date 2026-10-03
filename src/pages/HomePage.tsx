import { useMemo, useState } from "react"
import {
  ArrowDownToLine,
  ArrowDownUp,
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  FileArchive,
  Heart,
  Laptop,
  ListFilter,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
} from "lucide-react"

import { ReleaseCard } from "@/components/ReleaseCard"
import { FeatureOverview } from "@/components/FeatureOverview"
import { IssueReport } from "@/components/IssueReport"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Toggle } from "@/components/ui/toggle"
import {
  assetMatchesPlatform,
  PAGE_SIZE,
  platformLabel,
  shortReleaseCode,
} from "@/lib/releases"
import type {
  DownloadJob,
  DownloadOption,
  GithubRelease,
  Platform,
  ReleaseState,
} from "@/lib/releases"

export function HomePage({
  releases,
  releaseState,
  loadError,
  isRefreshing,
  lastCheckedAt,
  downloadJobs,
  onDownload,
  onCopy,
  onOpenRelease,
  onRetry,
  onRefresh,
  onNavigate,
}: {
  releases: GithubRelease[]
  releaseState: ReleaseState
  loadError: string
  isRefreshing: boolean
  lastCheckedAt: Date | null
  downloadJobs: DownloadJob[]
  onDownload: (asset: DownloadOption) => void
  onCopy: (value: string, label: string) => void
  onOpenRelease: (release: GithubRelease) => void
  onRetry: () => void
  onRefresh: () => void
  onNavigate: (path: string) => void
}) {
  const [query, setQuery] = useState("")
  const [platform, setPlatform] = useState<Platform>("all")
  const [includePrereleases, setIncludePrereleases] = useState(false)
  const [releaseCode, setReleaseCode] = useState("")
  const [page, setPage] = useState(1)
  const [compactView, setCompactView] = useState(false)

  const filteredReleases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const normalizedCode = releaseCode.replace(/\D/g, "")
    return releases.filter((release) => {
      if (!includePrereleases && release.prerelease) return false
      if (
        platform !== "all" &&
        platform !== "source" &&
        !release.assets.some((asset) => assetMatchesPlatform(asset, platform))
      ) return false
      const searchable = [
        release.tag_name,
        release.name ?? "",
        release.body ?? "",
        ...release.assets.map((asset) => asset.name),
      ].join(" ").toLowerCase()
      return (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (!normalizedCode || shortReleaseCode(release).includes(normalizedCode))
    })
  }, [includePrereleases, platform, query, releaseCode, releases])

  const pageCount = Math.max(1, Math.ceil(filteredReleases.length / PAGE_SIZE))
  const visiblePage = Math.min(page, pageCount)
  const currentReleases = filteredReleases.slice(
    (visiblePage - 1) * PAGE_SIZE,
    visiblePage * PAGE_SIZE,
  )
  const latestRelease = releases.find((release) => !release.prerelease)
  const loadingProgress = releaseState === "loading" ? 35 : releaseState === "ready" ? 100 : 0
  const lastCheckedLabel = lastCheckedAt
    ? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(lastCheckedAt)
    : "Checking for releases"

  function resetPage(action: () => void) {
    action()
    setPage(1)
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount) return
    setPage(nextPage)
    document.getElementById("releases")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <Badge variant="outline" className="eyebrow">
            <span className="live-dot" />
            Official release center
          </Badge>
          <h1>A little more<br /><span>room to think.</span></h1>
          <p className="hero-description">
            Get the latest CaliMind release for your device. Thoughtful
            planning, calmer days, and all your tasks in one place.
          </p>
          <div className="hero-actions">
            <Button
              className="primary-cta"
              onClick={() => document.getElementById("releases")?.scrollIntoView({ behavior: "smooth" })}
              size="lg"
            >
              Explore downloads <ArrowRight data-icon="inline-end" />
            </Button>
            <Popover>
              <PopoverTrigger className="trust-trigger" render={<Button variant="ghost" size="lg" />}>
                <ShieldCheck /> Safe, official builds
              </PopoverTrigger>
              <PopoverContent className="trust-popover">
                <PopoverHeader>
                  <PopoverTitle>Download with confidence</PopoverTitle>
                  <PopoverDescription>
                    Release information comes from the official CaliMind
                    project. Files are downloaded through this page with visible progress.
                  </PopoverDescription>
                </PopoverHeader>
                <button type="button" onClick={() => onNavigate("/help")}>
                  How downloads work <ArrowRight size={14} />
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="hero-trust">
            <span><Check size={14} /> Official releases</span>
            <span><Check size={14} /> Free to download</span>
            <span><Check size={14} /> Thoughtful by design</span>
          </div>
        </div>

        <div className="hero-art" aria-label="CaliMind release preview">
          <div className="orb orb-back" />
          <div className="orb orb-front" />
          <div className="hero-screenshot-frame">
            <img
              className="hero-screenshot"
              src="/images/home.jpeg"
              alt="CaliMind tasks and calendar dashboard"
              loading="eager"
            />
            <span className="hero-screenshot-label"><Check size={12} /> A clearer view of today</span>
          </div>
          <Card className="preview-card glass-card">
            <CardHeader>
              <div className="preview-brand">
                <img src="/calimind_logo.svg" alt="" />
                <div>
                  <CardTitle>CaliMind</CardTitle>
                  <CardDescription>Daily planner · made for focus</CardDescription>
                </div>
              </div>
              <CardAction>
                <Badge variant="outline" className="preview-version">
                  {latestRelease?.tag_name ?? "Preview"}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="preview-label"><Sparkles size={14} /> A calmer kind of productive</div>
              <div className="preview-task">
                <span className="task-check"><Check size={13} /></span>
                <span>Make space for what matters</span>
                <span className="task-time">25 min</span>
              </div>
              <div className="preview-task muted-task">
                <span className="task-circle" />
                <span>Plan the week ahead</span>
                <span className="task-time">Today</span>
              </div>
            </CardContent>
            <CardFooter className="preview-footer">
              <div className="mini-avatars" aria-hidden="true"><span>C</span><span>M</span><span>+</span></div>
              <span>Make today feel manageable.</span>
            </CardFooter>
          </Card>
          <div className="floating-chip chip-top">
            <span className="chip-icon"><ArrowDownToLine size={16} /></span>
            <span><strong>Download here</strong><small>Progress shown as you go</small></span>
          </div>
          <div className="floating-chip chip-bottom">
            <span className="chip-sparkle"><Sparkles size={16} /></span>
            <span><strong>One clear next step</strong><small>Your day, in focus</small></span>
          </div>
          <div className="floating-chip chip-focus">
            <span className="chip-focus-icon"><Timer size={15} /></span>
            <span><strong>Focus, one thing at a time</strong><small>Build a little momentum</small></span>
          </div>
          <div className="floating-chip chip-plan">
            <span className="chip-plan-icon"><CalendarDays size={15} /></span>
            <span><strong>A plan that can flex</strong><small>Adjust as your day changes</small></span>
          </div>
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
        </div>
      </section>

      <section className="release-panel glass-panel" id="releases">
        <div className="section-heading">
          <div>
            <Badge variant="outline" className="eyebrow section-eyebrow">
              <ArrowDownToLine size={13} /> The release library
            </Badge>
            <h2>Find your next update.</h2>
            <p>Choose a release, pick your platform, and download without leaving this page.</p>
          </div>
          <div className="release-count">
            <div className="release-count-total">
              <span className="count-number">{releaseState === "ready" ? releases.length : "—"}</span>
              <span>available releases</span>
            </div>
            <span className="release-refresh-label">
              {isRefreshing ? <><RefreshCw className="refresh-spinning" size={12} /> Checking now</> : `Checked ${lastCheckedLabel}`}
            </span>
            <Button
              aria-label="Refresh release list"
              className="refresh-releases-button"
              disabled={isRefreshing}
              onClick={onRefresh}
              size="icon-xs"
              variant="ghost"
            >
              <RefreshCw className={isRefreshing ? "refresh-spinning" : ""} />
            </Button>
          </div>
        </div>

        {latestRelease && (
          <button
            type="button"
            className="latest-release-strip"
            onClick={() => onOpenRelease(latestRelease)}
          >
            <span className="latest-release-icon"><Sparkles size={15} /></span>
            <span className="latest-release-copy">
              <strong>Latest stable release</strong>
              <span>{latestRelease.name || latestRelease.tag_name}</span>
            </span>
            <Badge variant="outline" className="version-badge">{latestRelease.tag_name}</Badge>
            <ArrowRight size={16} />
          </button>
        )}

        <Alert className="source-alert">
          <ShieldCheck />
          <div>
            <AlertTitle>Official files, downloaded here</AlertTitle>
            <AlertDescription>
              Release information is checked against the official project. Your
              browser stays on this portal and shows download progress.
            </AlertDescription>
          </div>
        </Alert>
        {releaseState === "ready" && loadError && (
          <div className="refresh-warning" role="status">
            Couldn’t check for newer releases. Showing the last loaded release list.
            <button type="button" onClick={onRetry}>Try again</button>
          </div>
        )}

        <div className="filter-toolbar">
          <div className="search-field">
            <Search size={17} />
            <Input
              aria-label="Search releases"
              placeholder="Search releases, versions, or assets..."
              value={query}
              onChange={(event) => resetPage(() => setQuery(event.target.value))}
            />
          </div>
          <div className="filter-group">
            <div className="platform-select">
              <Laptop size={15} />
              <Select
                value={platform}
                onValueChange={(value) => resetPage(() => setPlatform(value as Platform))}
              >
                <SelectTrigger aria-label="Filter by platform">
                  <SelectValue>{platformLabel(platform)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all"><Laptop /> All platforms</SelectItem>
                  <SelectItem value="android"><Smartphone /> Android</SelectItem>
                  <SelectItem value="ios"><Smartphone /> iOS</SelectItem>
                  <SelectItem value="source"><FileArchive /> Source archives</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Label className="prerelease-filter">
              <Checkbox
                checked={includePrereleases}
                onCheckedChange={(checked) => resetPage(() => setIncludePrereleases(checked === true))}
              />
              Include pre-releases
            </Label>
            <Toggle
              aria-label="Toggle compact release list"
              aria-pressed={compactView}
              onPressedChange={setCompactView}
              pressed={compactView}
              variant="outline"
              size="sm"
            >
              <ListFilter /> Compact
            </Toggle>
          </div>
        </div>

        <div className="quick-code">
          <div className="quick-code-copy">
            <div className="quick-code-icon"><Search size={16} /></div>
            <div>
              <Label htmlFor="release-code">Jump to a release code</Label>
              <p>Enter the six-digit code shown on a release card.</p>
            </div>
          </div>
          <div className="code-entry">
            <InputOTP
              id="release-code"
              aria-label="Six-digit release code"
              maxLength={6}
              value={releaseCode}
              onChange={(value) => resetPage(() => setReleaseCode(value))}
              inputMode="numeric"
              pattern="[0-9]*"
            >
              <InputOTPGroup>{[0, 1, 2].map((index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>{[3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
            </InputOTP>
            {releaseCode && <Button variant="ghost" size="sm" onClick={() => resetPage(() => setReleaseCode(""))}>Clear code</Button>}
          </div>
        </div>

        <div className="results-toolbar">
          <div className="results-label">
            <span>{filteredReleases.length} {filteredReleases.length === 1 ? "release" : "releases"}</span>
            <span className="results-divider">/</span>
            <span>{platformLabel(platform)}</span>
          </div>
          <div className="sort-note"><ArrowDownUp size={14} /> Newest first</div>
        </div>

        {releaseState === "loading" && (
          <Card className="loading-card">
            <CardContent><Spinner /><span>Finding the latest CaliMind releases…</span></CardContent>
            <Progress value={loadingProgress} className="loading-progress">
              <ProgressLabel>Connecting to official release source</ProgressLabel>
              <ProgressValue />
            </Progress>
          </Card>
        )}

        {releaseState === "error" && (
          <Empty className="empty-state glass-card">
            <EmptyHeader>
              <EmptyMedia variant="icon"><CircleHelp /></EmptyMedia>
              <EmptyTitle>We couldn’t reach the release shelf.</EmptyTitle>
              <EmptyDescription>{loadError}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={onRetry}><ArrowRight /> Try again</Button>
            </EmptyContent>
          </Empty>
        )}

        {releaseState === "ready" && filteredReleases.length === 0 && (
          <Empty className="empty-state glass-card">
            <EmptyHeader>
              <EmptyMedia variant="icon"><Search /></EmptyMedia>
              <EmptyTitle>
                {releases.length === 0 ? "No public releases yet." : "No releases match those filters."}
              </EmptyTitle>
              <EmptyDescription>
                {releases.length === 0
                  ? "When a release is published, its downloads will appear here."
                  : "Try another search, platform, or release code."}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              {(query || releaseCode || platform !== "all" || includePrereleases) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("")
                    setReleaseCode("")
                    setPlatform("all")
                    setIncludePrereleases(false)
                    setPage(1)
                  }}
                >
                  Clear filters
                </Button>
              )}
              <Button onClick={() => onNavigate("/help")} variant="ghost">Download help <CircleHelp /></Button>
            </EmptyContent>
          </Empty>
        )}

        {releaseState === "ready" && currentReleases.length > 0 && (
          <>
            <div className={`release-grid${compactView ? " compact-grid" : ""}`}>
              {currentReleases.map((release, index) => (
                <ReleaseCard
                  key={release.id}
                  release={release}
                  index={(visiblePage - 1) * PAGE_SIZE + index}
                  platform={platform}
                  compact={compactView}
                  onCopy={onCopy}
                  onDownload={onDownload}
                  downloadJobs={downloadJobs}
                  onOpen={() => onOpenRelease(release)}
                />
              ))}
            </div>
            {pageCount > 1 && (
              <div className="pagination-wrap">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#releases" aria-disabled={visiblePage <= 1} onClick={(event) => { event.preventDefault(); changePage(visiblePage - 1) }} />
                    </PaginationItem>
                    {Array.from({ length: pageCount }, (_, index) => index + 1)
                      .slice(Math.max(0, visiblePage - 3), visiblePage + 2)
                      .map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink href="#releases" isActive={pageNumber === visiblePage} aria-label={`Page ${pageNumber}`} onClick={(event) => { event.preventDefault(); changePage(pageNumber) }}>
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    {pageCount > 5 && visiblePage < pageCount - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                    <PaginationItem>
                      <PaginationNext href="#releases" aria-disabled={visiblePage >= pageCount} onClick={(event) => { event.preventDefault(); changePage(visiblePage + 1) }} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <Progress value={(visiblePage / pageCount) * 100} className="page-progress">
                  <ProgressLabel>Release pages</ProgressLabel><ProgressValue />
                </Progress>
              </div>
            )}
          </>
        )}
      </section>

      <section className="help-section" id="about">
        <div className="help-copy">
          <Badge variant="outline" className="eyebrow"><Heart size={13} /> Made for your everyday</Badge>
          <h2>Less noise.<br /><span>More you.</span></h2>
          <p>
            CaliMind brings your tasks, voice notes, and daily plan together so
            you can spend less energy keeping track—and more on what matters.
          </p>
          <div className="help-links">
            <Button onClick={() => onNavigate("/about")} variant="outline">About CaliMind <ArrowRight /></Button>
            <Button onClick={() => onNavigate("/help")} variant="ghost">Get help <CircleHelp /></Button>
          </div>
        </div>
        <Card className="help-card glass-card">
          <CardHeader>
            <div className="help-card-icon"><Sparkles /></div>
            <CardTitle>New to CaliMind?</CardTitle>
            <CardDescription>A gentle start, whenever you’re ready.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="message-bubble">
              Start with one task. We’ll help you find a little space for it.
            </p>
          </CardContent>
          <CardFooter className="help-card-footer">
            <button type="button" onClick={() => onNavigate("/help")}>How to install <ArrowRight size={15} /></button>
          </CardFooter>
        </Card>
      </section>
      <FeatureOverview />
      <IssueReport />
    </>
  )
}
