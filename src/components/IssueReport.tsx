import { ArrowRight, Bug, ExternalLink, MessageSquareWarning } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ISSUE_TRACKER_URL } from "@/lib/releases"

const newIssueUrl = `${ISSUE_TRACKER_URL}/new?title=${encodeURIComponent("Bug report: ")}&body=${encodeURIComponent(
  "## What happened?\n\n## What did you expect to happen?\n\n## Steps to reproduce\n1. \n\n## App version and device\n\n## Screenshots or logs (remove personal information)\n",
)}`

export function IssueReport() {
  return (
    <section className="issue-section" id="report-issue" aria-labelledby="issue-title">
      <Card className="issue-report-card glass-card">
        <div className="issue-decoration" aria-hidden="true">
          <span><Bug /></span><span><MessageSquareWarning /></span><span><ExternalLink /></span>
        </div>
        <CardHeader>
          <Badge variant="outline" className="eyebrow">
            <MessageSquareWarning size={13} /> Help us make it better
          </Badge>
          <CardTitle id="issue-title">Found a problem?</CardTitle>
          <CardDescription>
            Tell us what happened. A clear report helps us understand and fix
            issues for the whole CaliMind community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="issue-checklist">
            <span><Bug size={15} /> What you were doing</span>
            <span><MessageSquareWarning size={15} /> What went wrong</span>
            <span><ExternalLink size={15} /> Your app version and device</span>
          </div>
          <p className="issue-privacy-note">
            Issue reports open the project tracker. Please remove passwords,
            private notes, and other sensitive information before submitting.
          </p>
          <div className="issue-actions">
            <Button
              nativeButton={false}
              render={<a href={newIssueUrl} target="_blank" rel="noreferrer" />}
              className="issue-primary"
              size="lg"
            >
              Report an issue <ArrowRight data-icon="inline-end" />
            </Button>
            <a className="existing-issues-link" href={ISSUE_TRACKER_URL} target="_blank" rel="noreferrer">
              View existing reports <ExternalLink size={14} />
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
