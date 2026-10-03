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
            For help, contact CaliMind’s developer. Please do not share passwords,
            private notes, or other sensitive information.
          </p>
          <div className="issue-actions">
            <Button
              nativeButton={false}
              render={<a href="https://aventorgo.vercel.app/" target="_blank" rel="noreferrer" />}
              className="issue-primary"
              size="lg"
            >
              Contact the developer <ArrowRight data-icon="inline-end" />
            </Button>
            <a className="existing-issues-link" href="/help">Download help <ExternalLink size={14} /></a>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
