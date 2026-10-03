import { ArrowLeft, CircleHelp } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NotFoundPage({
  onHome,
}: {
  onHome: () => void
}) {
  return (
    <section className="content-page not-found-page">
      <span className="page-icon"><CircleHelp /></span>
      <h1>That page<br /><span>isn’t here.</span></h1>
      <p className="page-lede">The link may be out of date, or the release may no longer be available.</p>
      <Button onClick={onHome} className="page-primary"><ArrowLeft /> Back to downloads</Button>
    </section>
  )
}
