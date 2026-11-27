import { useId, useState } from "react"

export default function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const contentId = useId()

  return (
    <div className={`accordion ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(value => !value)}
      >
        <span>{question}</span>
        <span aria-hidden="true" className="accordion-plus">+</span>
      </button>
      <div id={contentId} className="accordion-content" aria-hidden={!open} inert={!open}>
        <div className="accordion-content-inner"><p>{answer}</p></div>
      </div>
    </div>
  )
}
