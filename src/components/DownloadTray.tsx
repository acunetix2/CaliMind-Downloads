import { CheckCircle2, CircleAlert, Download, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import type { DownloadJob } from "@/lib/releases"

export function DownloadTray({
  jobs,
  onDismiss,
}: {
  jobs: DownloadJob[]
  onDismiss: (id: string) => void
}) {
  if (!jobs.length) return null

  return (
    <aside className="download-tray" aria-label="Downloads">
      {jobs.map((job) => (
        <Card key={job.id} className={`download-job glass-card download-${job.status}`}>
          <CardHeader>
            <span className="download-job-icon">
              {job.status === "complete" ? <CheckCircle2 /> : job.status === "error" ? <CircleAlert /> : <Download />}
            </span>
            <CardTitle>{job.name}</CardTitle>
            <Button
              aria-label={`Dismiss ${job.name} download status`}
              onClick={() => onDismiss(job.id)}
              size="icon-xs"
              variant="ghost"
            >
              <X />
            </Button>
          </CardHeader>
          <CardContent>
            {job.status === "downloading" ? (
              <Progress value={job.progress} className="download-progress">
                <ProgressLabel>
                  {job.progress === null ? "Downloading file…" : "Downloading"}
                </ProgressLabel>
                <ProgressValue />
              </Progress>
            ) : (
              <p>{job.message}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </aside>
  )
}
