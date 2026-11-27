import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"
import { useRouter } from "@/app/providers/RouterProvider"

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
}

const EXTERNAL_PROTOCOLS = ["http://", "https://", "tel:", "mailto:"]

export default function Link({ href, className = "", children, onClick, ...props }: LinkProps) {
  const { navigate, currentPath } = useRouter()
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    const isModifiedClick = event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
    if (event.defaultPrevented || isModifiedClick || EXTERNAL_PROTOCOLS.some(protocol => href.startsWith(protocol))) return
    event.preventDefault()
    navigate(href)
  }

  const isActive = currentPath === href || (href !== "/" && currentPath.startsWith(href))
  return <a href={href} className={`${className} ${isActive ? "active" : ""}`.trim()} onClick={handleClick} {...props}>{children}</a>
}
