import { ArrowRight, Brain, Heart, ListChecks, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export function AboutPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <section className="content-page">
      <Badge variant="outline" className="eyebrow"><Heart size={13} /> A little about us</Badge>
      <h1>Make room for<br /><span>what matters.</span></h1>
      <p className="page-lede">
        CaliMind is a thoughtful daily planning companion designed to make
        organizing your day feel a little lighter.
      </p>
      <div className="about-grid">
        <Card className="glass-card about-story">
          <CardHeader>
            <div className="page-icon"><Sparkles /></div>
            <CardTitle>Productivity, with a softer edge.</CardTitle>
            <CardDescription>Less pressure. More clarity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Your day is more than a checklist. CaliMind helps you gather
              tasks, plan with intention, and focus on one doable next step.
              The goal isn’t to fill every minute—it’s to make space for the
              things that matter to you.
            </p>
            <p>
              The CaliMind release portal is the official place to find
              available builds, read release notes, and download updates
              without leaving the page.
            </p>
            <Button onClick={() => onNavigate("/")} className="page-primary">
              Find a download <ArrowRight />
            </Button>
          </CardContent>
        </Card>

        <div className="about-values">
          <Card className="glass-card value-card">
            <CardHeader>
              <div className="page-icon"><Brain /></div>
              <CardTitle>Mindful by design</CardTitle>
              <CardDescription>Plans that work with your energy.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass-card value-card">
            <CardHeader>
              <div className="page-icon"><ListChecks /></div>
              <CardTitle>Clear next steps</CardTitle>
              <CardDescription>Turn the big picture into a doable today.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass-card community-card">
            <MessageGroup>
              <Message>
                <MessageAvatar><img src="/calimind_logo.svg" alt="CaliMind" /></MessageAvatar>
                <MessageContent>
                  <MessageHeader>CaliMind</MessageHeader>
                  <div className="message-bubble">You don’t have to do it all at once. What’s one thing that matters today?</div>
                  <MessageFooter>A calmer day starts with one step</MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </Card>
        </div>
      </div>
      <section className="onboarding-showcase" aria-label="CaliMind onboarding">
        <div className="onboarding-showcase-heading">
          <span className="page-icon"><Sparkles /></span>
          <div>
            <h2>A gentle start, from the very first screen.</h2>
            <p>Welcome into a calmer routine, then make the app your own.</p>
          </div>
        </div>
        <div className="onboarding-image-pair">
          <figure className="onboarding-image-card welcome-image-card">
            <img src="/images/welcome.jpeg" alt="CaliMind welcome screen introducing mindful planning and voice task capture" loading="lazy" />
            <figcaption><strong>Welcome to CaliMind</strong><span>Make room for what matters.</span></figcaption>
          </figure>
          <figure className="onboarding-image-card register-image-card">
            <img src="/images/register.jpeg" alt="CaliMind account creation screen" loading="lazy" />
            <figcaption><strong>Your space, your pace</strong><span>A simple start to a more intentional day.</span></figcaption>
          </figure>
        </div>
      </section>
    </section>
  )
}
