import type { MouseEvent, ReactNode } from "react"
import Icon from "./Icon"

interface ButtonProps {
  children: ReactNode
  href?: string
  secondary?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  href,
  secondary = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const combinedClass = `button ${secondary ? "button-secondary" : "button-primary"} ${className}`.trim()

  if (href) {
    return (
      <a className={combinedClass} href={href} onClick={onClick}>
        {children}
        <Icon name="arrow" />
      </a>
    )
  }

  return (
    <button
      className={combinedClass}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {children}
      <Icon name="arrow" />
    </button>
  )
}
