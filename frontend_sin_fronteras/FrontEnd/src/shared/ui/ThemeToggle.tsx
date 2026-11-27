import { useEffect, useState } from "react"
import Icon from "./Icon"

type Theme = "light" | "dark"

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem("sf-theme")
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem("sf-theme", theme)
  }, [theme])

  const nextTheme: Theme = theme === "light" ? "dark" : "light"
  const label = theme === "light" ? "Activar modo oscuro" : "Activar modo claro"

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} />
      <span>{theme === "light" ? "Oscuro" : "Claro"}</span>
    </button>
  )
}
