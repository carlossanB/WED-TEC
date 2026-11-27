import Link from "@/app/navigation/Link"
import logoBlue from "@/assets/icons/statue_symbol.png"
import logoWhite from "@/assets/icons/statue_symbol_white.png"
import { contact } from "@/data/navigation"

export default function Footer({ onSelect }: { onSelect?: (title: string) => void }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand-logo footer-brand-logo" aria-label="Servicios Sin Fronteras, volver al inicio">
              <span className="brand-symbol">
                <img src={logoBlue} alt="Estatua de la Libertad - Servicios Sin Fronteras" className="brand-symbol-light" />
                <img src={logoWhite} alt="Estatua de la Libertad - Servicios Sin Fronteras" className="brand-symbol-dark" />
              </span>
              <span className="brand-name">
                <small>SERVICIOS</small>
                <strong>SIN FRONTERAS<span>.</span></strong>
                <span className="brand-line" aria-hidden="true" />
              </span>
            </Link>
            <p>
              Orientación humana.
              <br />
              Un camino con más claridad.
            </p>
          </div>

          <div>
            <h3>Servicios Populares</h3>
            <Link href="/servicios/asilo">Asilo Migratorio</Link>
            <Link href="/servicios/permiso-de-trabajo">Permiso de Trabajo (EAD)</Link>
            <Link href="/servicios/ajuste-de-estatus">Ajuste de Estatus (Green Card)</Link>
            <Link href="/servicios/representante-en-corte">Defensa en Corte</Link>
            <Link href="/servicios" className="footer-all-services">
              Ver los 12 servicios →
            </Link>
          </div>

          <div>
            <h3>Navegación</h3>
            <Link href="/">Inicio</Link>
            <Link href="/servicios">Todos los Servicios</Link>
            <Link href="/#acompanamiento">Cómo te acompañamos</Link>
            <Link href="/#preguntas-frecuentes">Preguntas frecuentes</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>

          <div className="footer-contact">
            <h3>Hablemos</h3>
            <a href={contact.tel}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
            <span>Atención en todo Estados Unidos</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Servicios Sin Fronteras. Todos los derechos reservados.</span>
          <div>
            <Link href="/politica-de-privacidad">Políticas de Privacidad</Link>
            <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
            <button onClick={() => onSelect && onSelect("Redes sociales")}>Redes sociales ↗</button>
          </div>
        </div>
        <p className="footer-legal">
          La información de este sitio web es exclusivamente de carácter general y formativo; no constituye
          asesoría legal vinculante ni garantiza resultados ante USCIS o la Corte de Inmigración.
        </p>
      </div>
    </footer>
  )
}
