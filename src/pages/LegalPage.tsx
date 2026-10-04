import { ArrowLeft, FileText, ShieldCheck } from "lucide-react"
import { useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type LegalPolicy = "terms" | "privacy"

const policyCopy = {
  terms: {
    title: "Terms of Service",
    lede: "These terms explain the ground rules for using CaliMind and its release portal.",
    sections: [
      {
        heading: "Using CaliMind",
        paragraphs: [
          "CaliMind provides tools to capture tasks, organize schedules, and review personal progress. You are responsible for the information you add and for checking plans before relying on them.",
          "Keep your sign-in details secure. Use the app lawfully and do not interfere with its services or other users.",
        ],
      },
      {
        heading: "AI suggestions and planning",
        paragraphs: [
          "Voice parsing and optional Aventor Eye insights use AI to help organize information. AI output can be incomplete or incorrect; review suggestions and schedules before acting on them.",
          "Aventor Eye is optional and off by default. When enabled, relevant task titles, categories, priorities, and timing may be sent to Groq to produce schedule-aware suggestions. Do not submit information you do not want processed by these services.",
        ],
      },
      {
        heading: "Notifications and integrations",
        paragraphs: [
          "Reminders and notifications depend on device permissions, connectivity, operating-system behavior, and third-party services. They are not guaranteed delivery and should not be used as the sole reminder for critical matters.",
          "Calendar events and Clock alarms are prepared for you to review and confirm in the relevant device app. CaliMind does not guarantee that an event or alarm has been saved until you confirm it there.",
        ],
      },
      {
        heading: "Availability and changes",
        paragraphs: [
          "Features, downloads, and integrations may change or be unavailable from time to time. We aim to keep release information accurate, but make no promise that every build or third-party service will always be available.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms can be sent through the CaliMind help center or the developer contact linked below.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lede: "This page describes the information CaliMind uses to provide planning, account, and optional AI features.",
    sections: [
      {
        heading: "Information you add",
        paragraphs: [
          "Tasks, schedules, notes, and account information are used to provide the planner. Account and planning data are handled by the configured Supabase service.",
        ],
      },
      {
        heading: "AI processing",
        paragraphs: [
          "When you use voice task capture, the audio or transcript needed for that feature is sent to the Groq-powered CaliMind Edge Function for transcription or command parsing.",
          "Aventor Eye is optional and off by default. If enabled, the app sends a limited snapshot of relevant task titles, categories, priorities, durations, deadlines or reminders, and schedule time blocks to the Aventor Eye Edge Function. If you have separately enabled calendar busy-time access, busy time ranges may also be included; event titles and descriptions are not read or sent. The function sends the snapshot to Groq to generate short planning suggestions. Task notes and account identifiers are not included. Generated cards are cached on your device and are removed when you turn Aventor Eye off.",
          "Groq processes information under its own service terms and privacy practices. Review the provider's current terms before enabling AI features if you have questions about its processing or retention.",
        ],
      },
      {
        heading: "Device permissions and integrations",
        paragraphs: [
          "If you grant calendar access on Android, CaliMind reads event busy intervals for planning; event titles and descriptions are not read by the busy-time feature. Adding an event opens a calendar app for you to review and save.",
          "Local reminders and optional Clock handoffs use device features. Push notifications require a device token and the configured notification service. You can manage permissions and integrations in Settings.",
        ],
      },
      {
        heading: "Storage and choices",
        paragraphs: [
          "The app stores selected preferences and cached Aventor Eye cards on your device. Turning Aventor Eye off removes its locally cached insight cards. You can also manage notification, calendar, and widget settings in the app.",
          "Information handled by Supabase and Groq is subject to their services and configured retention. Contact the developer for questions about account data or a privacy request.",
        ],
      },
      {
        heading: "Updates and contact",
        paragraphs: [
          "This policy may be updated as CaliMind changes. The date above indicates when this version was last updated. For questions or requests, contact the developer through the links on this site.",
        ],
      },
    ],
  },
} satisfies Record<
  LegalPolicy,
  {
    title: string
    lede: string
    sections: { heading: string; paragraphs: string[] }[]
  }
>

export function LegalPage({
  policy,
  onNavigate,
}: {
  policy: LegalPolicy
  onNavigate: (path: string) => void
}) {
  const content = policyCopy[policy]

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${content.title} · CaliMind`
    return () => {
      document.title = previousTitle
    }
  }, [content.title])

  return (
    <section className="content-page legal-page">
      <Badge variant="outline" className="eyebrow">
        {policy === "privacy" ? <ShieldCheck size={13} /> : <FileText size={13} />}
        CaliMind legal
      </Badge>
      <h1>{content.title}</h1>
      <p className="page-lede">{content.lede}</p>
      <p className="legal-updated">Last updated October 4, 2026</p>
      <div className="legal-sections">
        {content.sections.map((section, index) => (
          <section className="legal-section glass-panel" key={section.heading}>
            <span className="legal-section-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </div>
      <Button className="page-primary legal-back" onClick={() => onNavigate("/")}>
        <ArrowLeft /> Back to CaliMind
      </Button>
    </section>
  )
}
