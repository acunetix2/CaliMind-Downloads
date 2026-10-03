import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Menu,
  PackageCheck,
  Search,
} from "lucide-react"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import {
  formatDate,
  formatSize,
  releaseDownloads,
  shortReleaseCode,
} from "@/lib/releases"
import type {
  DownloadJob,
  DownloadOption,
  GithubRelease,
  Platform,
} from "@/lib/releases"

export function ReleaseCard({
  release,
  index,
  platform,
  compact,
  onCopy,
  onDownload,
  downloadJobs,
  onOpen,
}: {
  release: GithubRelease
  index: number
  platform: Platform
  compact: boolean
  onCopy: (value: string, label: string) => void
  onDownload: (asset: DownloadOption) => void
  downloadJobs: DownloadJob[]
  onOpen: () => void
}) {
  const assets = releaseDownloads(release, platform)
  const notes = release.body?.trim() || "No release notes were added for this build."
  const excerpt = notes.length > 180 ? `${notes.slice(0, 180).trimEnd()}…` : notes
  const code = shortReleaseCode(release)

  return (
    <Card className={`release-card glass-card${compact ? " release-card-compact" : ""}`} style={{ animationDelay: `${index * 55}ms` }}>
      <CardHeader className="release-card-header">
        <div className="release-icon"><PackageCheck /></div>
        <div className="release-heading">
          <div className="release-badges">
            <Badge variant="outline" className="version-badge">{release.tag_name}</Badge>
            {release.prerelease && <Badge variant="secondary" className="pre-badge">Preview</Badge>}
          </div>
          <CardTitle>
            <button type="button" className="release-title-button" onClick={onOpen}>
              {release.name || release.tag_name}
            </button>
          </CardTitle>
          <CardDescription><Clock3 size={13} /> Published {formatDate(release.published_at)}</CardDescription>
        </div>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button aria-label={`More options for ${release.tag_name}`} size="icon-sm" variant="ghost" />}
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Release options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onCopy(release.tag_name, "Release tag")}>
                <Check /> Copy version tag
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopy(code, "Release code")}>
                <Search /> Copy release code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onOpen}>
                <BookOpen /> View release details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="release-notes">
        <p>{excerpt}</p>
        <div className="release-meta-row">
          <span><span className="release-code-label">Code</span> <code>{code}</code></span>
          <button type="button" onClick={onOpen}>Full release notes <ArrowRight size={13} /></button>
        </div>
      </CardContent>

      <CardFooter className="release-card-footer">
        <div className="asset-summary">
          <span className="asset-count">{assets.length}</span>
          <span>{assets.length === 1 ? "download" : "downloads"}</span>
          {assets.length > 0 && assets.every((asset) => asset.size !== null) && (
            <span className="asset-total">{formatSize(assets.reduce((sum, asset) => sum + (asset.size ?? 0), 0))}</span>
          )}
        </div>
        {assets.length > 0 ? (
          <div className="asset-actions">
            {assets.slice(0, 2).map((asset) => {
              const downloading = downloadJobs.some((job) => job.name === asset.name && job.status === "downloading")
              return (
                <Button
                  key={asset.id}
                  className="download-button"
                  onClick={() => onDownload(asset)}
                  disabled={downloading}
                  size="sm"
                >
                  {downloading ? <Spinner /> : <ArrowDownToLine />}
                  <span>{asset.name}</span>
                </Button>
              )
            })}
            {assets.length > 2 && (
              <Button className="more-assets" onClick={onOpen} size="sm" variant="outline">
                +{assets.length - 2} more
              </Button>
            )}
          </div>
        ) : (
          <Button className="download-button" onClick={onOpen} size="sm" variant="outline">
            View release <ArrowRight />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
