import { ArrowUp, ExternalLink, Heart } from "lucide-react"
import type { MouseEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
export function SiteFooter({
  onNavigate,
}: {
  onNavigate: (path: string) => void
}) {
  const year = new Date().getFullYear()

  function navigateLink(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <a className="footer-brand" href="/" onClick={(event) => navigateLink(event, "/")}>
            <img src="/calimind_logo.svg" alt="" />
            <span>CaliMind</span>
          </a>
          <p>Make space for what matters.</p>
          <a className="footer-company-link" href="https://aventorgo.vercel.app/" target="_blank" rel="noreferrer">
            Developed by Aventorgo LLC <ExternalLink size={12} />
          </a>
          <span className="footer-ceo">Led by CEO Iddy K. Chesire</span>
          <span className="footer-version">Download portal v{__APP_VERSION__}</span>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <NavigationMenu className="footer-navigation">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" onClick={(event) => navigateLink(event, "/")}>Downloads</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" onClick={(event) => navigateLink(event, "/about")}>About CaliMind</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/help" onClick={(event) => navigateLink(event, "/help")}>Help center</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="footer-column footer-support">
          <h2>Support</h2>
          <a href="#report-issue" onClick={(event) => {
            event.preventDefault()
            onNavigate("/")
            window.setTimeout(() => document.getElementById("report-issue")?.scrollIntoView({ behavior: "smooth" }), 0)
          }}>Report an issue</a>
          <a href="https://aventorgo.vercel.app/" target="_blank" rel="noreferrer">Contact the developer</a>
        </div>

        <div className="footer-top-action">
          <Button
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="icon"
            variant="outline"
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} <a href="https://aventorgo.vercel.app/" target="_blank" rel="noreferrer">Aventorgo LLC</a>. All rights reserved.</span>
        <span>Made with <Heart size={13} /> and a little more room to think.</span>
        <a href="#top" onClick={(event) => {
          event.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}>Back to top <ArrowUp size={13} /></a>
      </div>
    </footer>
  )
}
