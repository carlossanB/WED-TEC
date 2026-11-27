import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "@/app/navigation/Link"
import Icon from "@/shared/ui/Icon"

type Message = { role: "assistant" | "user"; text: string }

const suggestions = ["¿Qué servicios ofrecen?", "¿Cómo empiezo mi caso?", "¿Qué necesito para asilo?"]

function getMockReply(question: string) {
  const value = question.toLocaleLowerCase("es")
  if (/asilo|persecuci[oó]n|refugio/.test(value)) {
    return "En la página de Asilo encontrarás los criterios de elegibilidad, el proceso paso a paso y una guía de documentos. Cada situación requiere una evaluación individual."
  }
  if (/document|requisito|papel/.test(value)) {
    return "Los documentos dependen del servicio. Abre la página del trámite que te interesa y revisa la sección “Documentación que solemos requerir”."
  }
  if (/contact|tel[eé]fono|whatsapp|cita|evaluaci[oó]n|empez/.test(value)) {
    return "Puedes solicitar una evaluación inicial desde el botón del encabezado o llamar al +1 (929) 284-1573. Allí podrán orientarte sobre el siguiente paso."
  }
  if (/servicio|tr[aá]mite|ayuda/.test(value)) {
    return "El catálogo reúne 12 servicios migratorios. Puedes abrir “Servicios” en el menú y elegir el trámite que buscas."
  }
  return "Esta es una vista de demostración con respuestas generales. Explora el catálogo de servicios o solicita una evaluación inicial para resolver una pregunta sobre tu caso."
}

export default function MockChatBot() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hola, soy la guía de Sin Fronteras. Puedo ayudarte a encontrar información del sitio." },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages, open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  function send(text: string) {
    const question = text.trim()
    if (!question) return
    setMessages(previous => [...previous, { role: "user", text: question }, { role: "assistant", text: getMockReply(question) }])
    setDraft("")
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    send(draft)
  }

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      <section id="site-chat-panel" className="chat-panel" aria-label="Asistente del sitio" aria-hidden={!open} inert={!open}>
        <div className="chat-panel-header">
          <span className="chat-panel-avatar"><Icon name="chat" /></span>
          <div><strong>Guía Sin Fronteras</strong><small>Respuestas de demostración</small></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat"><Icon name="close" /></button>
        </div>
        <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((message, index) => (
            <p key={index} className={`chat-message chat-message-${message.role}`}>{message.text}</p>
          ))}
          <div ref={endRef} />
        </div>
        <div className="chat-suggestions" aria-label="Preguntas sugeridas">
          {suggestions.map(suggestion => <button type="button" key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}
        </div>
        <form className="chat-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="site-chat-question">Escribe tu pregunta</label>
          <input id="site-chat-question" ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} placeholder="Escribe tu pregunta…" maxLength={300} />
          <button type="submit" aria-label="Enviar pregunta" disabled={!draft.trim()}><Icon name="arrow" /></button>
        </form>
        <div className="chat-panel-footer"><Link href="/servicios" onClick={() => setOpen(false)}>Explorar servicios <span aria-hidden="true">↗</span></Link></div>
      </section>
      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen(value => !value)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente del sitio"}
        aria-expanded={open}
        aria-controls="site-chat-panel"
      >
        <Icon name={open ? "close" : "chat"} />
        <span>{open ? "Cerrar" : "¿Preguntas?"}</span>
      </button>
    </div>
  )
}
