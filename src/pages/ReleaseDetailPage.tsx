import { ArrowDownToLine, ArrowLeft, CalendarDays, FileArchive, PackageCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDate, formatSize, releaseDownloads } from "@/lib/releases"
import type { GithubRelease } from "@/lib/releases"

export function ReleaseDetailPage({
  release,
  onBack,
  onDownload,
}: {
  release: GithubRelease
  onBack: () => void
  onDownload: (asset: ReturnType<typeof releaseDownloads>[number]) => void
}) {
  const assets = releaseDownloads(release, "all")

  return (
    <section className="content-page release-detail-page">
      <Button className="back-button" onClick={onBack} variant="ghost"><ArrowLeft /> All releases</Button>
      <Badge variant="outline" className="eyebrow"><PackageCheck size={13} /> Release details</Badge>
      <div className="detail-heading">
        <div>
          <div className="release-badges">
            <Badge variant="outline" className="version-badge">{release.tag_name}</Badge>
            {release.prerelease && <Badge variant="secondary" className="pre-badge">Preview</Badge>}
          </div>
          <h1>{release.name || release.tag_name}</h1>
          <p className="detail-date"><CalendarDays size={15} /> Published {formatDate(release.published_at)}</p>
        </div>
      </div>

      <div className="detail-grid">
        <Card className="glass-card detail-notes">
          <CardHeader>
            <CardTitle>Release notes</CardTitle>
            <CardDescription>What’s included in this version.</CardDescription>
          </CardHeader>
          <CardContent>
            {release.body?.trim()
              ? <div className="release-markdown">{release.body}</div>
              : <p className="detail-empty-notes">No release notes were added for this build.</p>}
          </CardContent>
        </Card>

        <Card className="glass-card detail-assets">
          <CardHeader>
            <div className="page-icon"><FileArchive /></div>
            <CardTitle>Available files</CardTitle>
            <CardDescription>{assets.length} {assets.length === 1 ? "download" : "downloads"} in this release.</CardDescription>
          </CardHeader>
          <CardContent>
            {assets.length > 0 ? (
              <ul className="asset-list">
                {assets.map((asset) => (
                  <li key={asset.id}>
                    <div className="asset-file-icon"><FileArchive /></div>
                    <div className="asset-file-info">
                      <strong>{asset.name}</strong>
                      <span>{asset.size ? formatSize(asset.size) : "Size unavailable"}</span>
                    </div>
                    <Button
                      aria-label={`Download ${asset.name}`}
                      className="asset-download-button"
                      onClick={() => onDownload(asset)}
                      size="icon-sm"
                    >
                      <ArrowDownToLine />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="detail-empty-notes">No installable assets were attached to this release.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
