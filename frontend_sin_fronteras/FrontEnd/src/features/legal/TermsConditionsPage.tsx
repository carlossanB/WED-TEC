import Link from "@/app/navigation/Link"
import Icon from "@/shared/ui/Icon"
import "./styles/legal.css"

export default function TermsConditionsPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-breadcrumb">
          <Link href="/">
            <Icon name="back" /> Volver al inicio
          </Link>
          <span>/</span>
          <span>Términos y Condiciones</span>
        </div>

        <header className="legal-hero">
          <div className="legal-badge-row">
            <span className="legal-badge">Términos de Uso</span>
            <span className="legal-date">Última actualización: Noviembre 2026</span>
          </div>
          <h1>Términos y Condiciones de Uso</h1>
          <p>
            Bienvenido al portal web de <strong>SERVICIOS SIN FRONTERAS LLC</strong>. Al ingresar, navegar o utilizar este sitio y los formularios de consulta, usted acepta regirse por las siguientes condiciones. Le recomendamos leerlas con detenimiento.
          </p>
        </header>

        <div className="legal-container">
          <nav className="legal-toc" aria-label="Índice de contenidos">
            <h3>Contenido</h3>
            <ul>
              <li><a href="#aceptacion">1. Aceptación de los Términos</a></li>
              <li><a href="#naturaleza">2. Naturaleza del Servicio y Aviso Legal</a></li>
              <li><a href="#uso-portal">3. Uso Permitido del Portal</a></li>
              <li><a href="#propiedad-intelectual">4. Propiedad Intelectual</a></li>
              <li><a href="#herramientas">5. Consultas y Enlaces Externos</a></li>
              <li><a href="#limitacion">6. Limitación de Responsabilidad</a></li>
              <li><a href="#privacidad-vinculo">7. Protección de Datos y Privacidad</a></li>
              <li><a href="#jurisdiccion">8. Ley Aplicable y Jurisdicción</a></li>
              <li><a href="#modificaciones">9. Modificaciones a los Términos</a></li>
              <li><a href="#contacto-legal">10. Contacto y Consultas</a></li>
            </ul>
          </nav>

          <main className="legal-content">
            <section id="aceptacion" className="legal-section">
              <h2><span className="section-number">1.</span> Aceptación de los Términos</h2>
              <p>
                Los presentes Términos y Condiciones regulan el acceso y utilización del sitio web de <strong>SERVICIOS SIN FRONTERAS LLC</strong>. El uso del sitio web, la remisión de formularios de contacto o el empleo de las herramientas interactivas suponen su adhesión plena a todas las disposiciones aquí contenidas. Si no está de acuerdo con alguna de ellas, le solicitamos abstenerse de utilizar el portal.
              </p>
            </section>

            <section id="naturaleza" className="legal-section">
              <h2><span className="section-number">2.</span> Naturaleza del Servicio y Descargo de Responsabilidad Legal</h2>
              <div className="legal-card-notice">
                <strong>Aviso Legal Fundamental:</strong>
                <p>
                  La información provista en este sitio web tiene carácter exclusivamente formativo, orientativo y divulgativo general. <strong>SERVICIOS SIN FRONTERAS LLC no es una firma de abogados ni presta asesoría jurídica vinculante.</strong>
                </p>
              </div>
              <p>
                El material expuesto en el sitio y las evaluaciones preliminares no constituyen asesoramiento jurídico formal ni crean una relación abogado-cliente. Los trámites ante el Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS), el Departamento de Justicia (EOIR) o el Departamento de Estado dependen exclusivamente de las leyes vigentes y del criterio discrecional de las autoridades competentes. SERVICIOS SIN FRONTERAS LLC no garantiza ni asegura el otorgamiento favorable de visas, permisos, estatus de protección o fallos judiciales.
              </p>
            </section>

            <section id="uso-portal" className="legal-section">
              <h2><span className="section-number">3.</span> Uso Permitido del Portal</h2>
              <p>
                El usuario se compromete a hacer un uso lícito, diligente y de buena fe del portal. En particular, queda prohibido:
              </p>
              <ul>
                <li>Ingresar datos falsos, inexactos o pertenecientes a terceros sin contar con la debida autorización.</li>
                <li>Proporcionar voluntariamente a través de formularios iniciales números de Seguro Social (SSN), contraseñas de cuentas o información confidencial no requerida expresamente.</li>
                <li>Realizar acciones dirigidas a vulnerar la seguridad, provocar sobrecargas o introducir código malicioso en los servidores de la plataforma.</li>
                <li>Utilizar mecanismos automatizados (bots, scrapers) para extraer masivamente contenidos sin autorización previa por escrito.</li>
              </ul>
            </section>

            <section id="propiedad-intelectual" className="legal-section">
              <h2><span className="section-number">4.</span> Propiedad Intelectual</h2>
              <p>
                Todos los contenidos, marcas comerciales, logotipos, textos, elementos gráficos, diagramaciones, diseños visuales e interfaces exhibidos en este sitio son propiedad de <strong>SERVICIOS SIN FRONTERAS LLC</strong> o de sus respectivos titulares bajo licencia.
              </p>
              <p>
                Queda prohibida su reproducción, distribución, transmisión o modificación pública con fines comerciales sin la debida autorización previa y por escrito de la compañía.
              </p>
            </section>

            <section id="herramientas" className="legal-section">
              <h2><span className="section-number">5.</span> Herramientas de Consulta y Enlaces a Terceros</h2>
              <p>
                Nuestro portal puede incluir herramientas de verificación referencial (como la consulta de números de recibo de USCIS) y enlaces a plataformas gubernamentales o de terceros. Dichas herramientas facilitan la navegación informativa, pero no implican que SERVICIOS SIN FRONTERAS LLC controle o avale los servidores, la exactitud en tiempo real o la disponibilidad de las fuentes externas oficiales.
              </p>
            </section>

            <section id="limitacion" className="legal-section">
              <h2><span className="section-number">6.</span> Limitación de Responsabilidad</h2>
              <p>
                En la medida máxima permitida por la legislación aplicable, <strong>SERVICIOS SIN FRONTERAS LLC</strong>, sus directores, agentes y colaboradores no serán responsables por daños directos, indirectos, incidentales o consecuentes derivados de:
              </p>
              <ul>
                <li>Interrupciones técnicas temporales, caídas del servicio o fallas de conectividad ajenas al control razonable de la empresa.</li>
                <li>Decisiones personales adoptadas por el usuario basadas únicamente en el contenido divulgativo del portal sin el debido asesoramiento individual calificado.</li>
                <li>Pérdidas de información ocasionadas por fallas en el dispositivo o conexión del propio usuario.</li>
              </ul>
            </section>

            <section id="privacidad-vinculo" className="legal-section">
              <h2><span className="section-number">7.</span> Protección de Datos y Privacidad</h2>
              <p>
                El tratamiento de los datos personales proporcionados voluntariamente por los usuarios a través del sitio web se rige por nuestras{" "}
                <Link href="/politica-de-privacidad" style={{ color: "var(--secondary)", fontWeight: 600, textDecoration: "underline" }}>
                  Políticas de Privacidad
                </Link>
                , las cuales forman parte integral de estos Términos y Condiciones.
              </p>
            </section>

            <section id="jurisdiccion" className="legal-section">
              <h2><span className="section-number">8.</span> Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes del <strong>Estado de Florida</strong> y las leyes federales de los Estados Unidos de América, sin dar efecto a principios de conflicto de leyes.
              </p>
              <p>
                Cualquier controversia o litigio que surja en relación con el uso de este portal será sometido a la jurisdicción exclusiva de los tribunales competentes radicados en el Estado de Florida.
              </p>
            </section>

            <section id="modificaciones" className="legal-section">
              <h2><span className="section-number">9.</span> Modificaciones a los Términos</h2>
              <p>
                SERVICIOS SIN FRONTERAS LLC se reserva el derecho de actualizar, modificar o sustituir cualquier disposición de estos Términos y Condiciones en cualquier momento. La fecha de última actualización al comienzo del documento indicará el momento en que entran en vigencia las nuevas disposiciones. El uso continuado del sitio tras la publicación de los cambios constituye su aceptación tácita de los mismos.
              </p>
            </section>

            <section id="contacto-legal" className="legal-section">
              <h2><span className="section-number">10.</span> Canales de Contacto</h2>
              <p>
                Para cualquier consulta, aclaración o notificación relativa a estos Términos y Condiciones, puede dirigirse a:
              </p>
              <div className="legal-address-box">
                <strong>SERVICIOS SIN FRONTERAS LLC</strong>
                Correo: <a href="mailto:direccion.administrativa@sinfronteras.llc">direccion.administrativa@sinfronteras.llc</a><br />
                Atención: JAVIER ROJAS<br />
                F2700 S.T MIAMI TRAIL. SUITE 4.<br />
                FLORIDA, FL, 34239. United States of America
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
