import { ArrowDownToLine, ArrowRight, CircleHelp, Download, FileCheck2, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const steps = [
  {
    icon: CircleHelp,
    title: "Choose a release",
    description: "Browse the release library or search by version, platform, or release code.",
  },
  {
    icon: FileCheck2,
    title: "Pick the right file",
    description: "Use the platform filter and check the file extension before downloading.",
  },
  {
    icon: Download,
    title: "Download in place",
    description: "Select a file. The portal streams it and displays progress while your browser saves it.",
  },
]

export function HelpPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <section className="content-page">
      <Badge variant="outline" className="eyebrow"><CircleHelp size={13} /> Help center</Badge>
      <h1>We’ll get you<br /><span>on your way.</span></h1>
      <p className="page-lede">
        A few quick answers to make finding and installing a CaliMind release easier.
      </p>

      <div className="help-page-grid">
        <div className="help-steps">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <Card className="glass-card help-step" key={title}>
              <CardHeader>
                <div className="step-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="page-icon"><Icon /></div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="glass-card download-help-card">
          <CardHeader>
            <div className="page-icon"><ShieldCheck /></div>
            <CardTitle>About downloads</CardTitle>
            <CardDescription>Files are requested from the official release source.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Progress appears in the download tray while a file is being
              transferred. Keep this tab open until it completes. If a transfer
              fails, the tray will show an error and you can retry.
            </p>
            <p>
              Large files are assembled in your browser before saving, so
              ensure your device has enough available memory and storage.
            </p>
            <div className="help-note"><ShieldCheck size={16} /> The portal never sends you to GitHub to start a file download.</div>
            <Button onClick={() => onNavigate("/")} className="page-primary">
              Browse downloads <ArrowDownToLine />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="support-callout glass-panel">
        <div>
          <span className="support-callout-icon"><CircleHelp /></span>
          <div><strong>Still need a hand?</strong><p>Head back to the release library and try another build or platform.</p></div>
        </div>
        <Button onClick={() => onNavigate("/")} variant="outline">Go to releases <ArrowRight /></Button>
      </div>
    </section>
  )
}
