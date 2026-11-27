import { useEffect, useRef } from "react"
import Icon from "@/shared/ui/Icon"
import LeadForm from "./components/LeadForm"

interface ConsultationDialogProps {
  serviceTitle?: string
  isOpen?: boolean
  onClose: () => void
}

export default function ConsultationDialog({
  serviceTitle = "",
  isOpen,
  onClose,
}: ConsultationDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  const shouldBeOpen = isOpen !== undefined ? isOpen : Boolean(serviceTitle)

  useEffect(() => {
    const dialogNode = dialog.current
    if (!dialogNode) return

    if (shouldBeOpen && !dialogNode.open) {
      dialogNode.showModal()
    } else if (!shouldBeOpen && dialogNode.open) {
      dialogNode.close()
    }
  }, [shouldBeOpen])

  return (
    <dialog
      ref={dialog}
      className="consultation-dialog"
      onClose={onClose}
      onClick={event => {
        if (event.target === event.currentTarget) {
          dialog.current?.close()
        }
      }}
      aria-labelledby="consultation-modal-title"
    >
      <button
        className="dialog-close"
        onClick={() => dialog.current?.close()}
        aria-label="Cerrar formulario de orientación"
      >
        <Icon name="close" />
      </button>

      <div className="consultation-dialog-header">
        <span className="eyebrow">EVALUACIÓN INICIAL · ORIENTACIÓN HUMANA</span>
        <h2 id="consultation-modal-title">
          {serviceTitle ? `Evaluación para: ${serviceTitle}` : "Solicita una evaluación inicial"}
        </h2>
        <p>
          Déjanos tus datos de contacto y un orientador revisará tu situación para explicarte los pasos a seguir.
        </p>
      </div>

      <LeadForm initialService={serviceTitle} onClose={() => dialog.current?.close()} />
    </dialog>
  )
}
