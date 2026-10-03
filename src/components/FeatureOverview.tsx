import {
  AudioLines,
  CalendarClock,
  CheckCheck,
  Repeat2,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: CheckCheck,
    title: "A clear place for tasks",
    description: "Capture what needs doing, keep it organized, and make the next step feel manageable.",
  },
  {
    icon: AudioLines,
    title: "Voice-powered capture",
    description: "Get an idea out of your head quickly with voice input and review it before it becomes a task.",
  },
  {
    icon: CalendarClock,
    title: "Plan around your day",
    description: "Shape a realistic schedule and review your plan when the day changes.",
  },
  {
    icon: Repeat2,
    title: "Routines that repeat",
    description: "Set recurring tasks so the important regular things don’t have to be recreated each time.",
  },
  {
    icon: Timer,
    title: "Make room for focus",
    description: "Use focused work sessions to give one task your attention, with breaks when you need them.",
  },
  {
    icon: TrendingUp,
    title: "See your progress",
    description: "Review weekly progress and celebrate steady effort—not just a perfect to-do list.",
  },
]

export function FeatureOverview() {
  return (
    <section className="feature-section" id="features" aria-labelledby="features-title">
      <div className="feature-section-heading">
        <div>
          <Badge variant="outline" className="eyebrow">
            <CheckCheck size={13} /> A kinder toolkit for your day
          </Badge>
          <h2 id="features-title">More clarity, built into the everyday.</h2>
          <p>
            CaliMind brings planning, focus, and reflection together to help you
            move forward at a pace that works for you.
          </p>
        </div>
        <div className="feature-heading-mark" aria-hidden="true">
          <span><CheckCheck /></span><span><Timer /></span><span><TrendingUp /></span>
        </div>
      </div>
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, description }, index) => (
          <Card className="feature-card glass-card" key={title} style={{ animationDelay: `${index * 45}ms` }}>
            <CardHeader>
              <span className="feature-icon"><Icon /></span>
              <span className="feature-number">{String(index + 1).padStart(2, "0")}</span>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="feature-visual-grid">
        <article className="feature-visual-card schedule-visual">
          <img src="/images/schedule.jpeg" alt="CaliMind calendar and daily schedule view" loading="lazy" />
          <div className="feature-visual-caption">
            <span className="feature-visual-icon"><CalendarClock /></span>
            <span><strong>See your day take shape</strong><small>Calendar, time blocks, and room to replan.</small></span>
          </div>
          <span className="visual-float visual-float-top">Plan with intention</span>
        </article>
        <article className="feature-visual-card settings-visual">
          <img src="/images/settings.jpeg" alt="CaliMind settings for voice and account preferences" loading="lazy" />
          <div className="feature-visual-caption">
            <span className="feature-visual-icon"><Sparkles /></span>
            <span><strong>Make it feel like yours</strong><small>Voice tools, profile, and useful preferences.</small></span>
          </div>
          <span className="visual-float visual-float-bottom">Thoughtful by design</span>
        </article>
      </div>
      <p className="feature-footnote">
        Feature availability can vary by platform and release. Check the release
        notes for the latest changes.
      </p>
    </section>
  )
}
