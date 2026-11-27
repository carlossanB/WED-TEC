import Link from "@/app/navigation/Link"
import Icon from "@/shared/ui/Icon"
import "./styles/legal.css"

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-breadcrumb">
          <Link href="/">
            <Icon name="back" /> Volver al inicio
          </Link>
          <span>/</span>
          <span>Políticas de Privacidad</span>
        </div>

        <header className="legal-hero">
          <div className="legal-badge-row">
            <span className="legal-badge">Documento Oficial</span>
            <span className="legal-date">Última actualización: Noviembre 2026</span>
          </div>
          <h1>Políticas de Privacidad</h1>
          <p>
            Esta declaración describe las políticas y prácticas de <strong>SERVICIOS SIN FRONTERAS LLC</strong> en cuanto a la recopilación y al uso de su información personal en relación con la visita que usted realiza al sitio web de la compañía.
          </p>
        </header>

        <div className="legal-container">
          <nav className="legal-toc" aria-label="Índice de contenidos">
            <h3>Contenido</h3>
            <ul>
              <li><a href="#introduccion">1. Introducción y Alcance</a></li>
              <li><a href="#navegacion">2. Navegación en el Sitio</a></li>
              <li><a href="#recopilacion">3. Información y su Uso</a></li>
              <li><a href="#informacion-general">4. Información General Recopilada</a></li>
              <li><a href="#campanas">5. Campañas Publicitarias</a></li>
              <li><a href="#correos">6. Correos y Boletines</a></li>
              <li><a href="#seguridad">7. Seguridad del Almacenamiento</a></li>
              <li><a href="#terceros">8. Divulgación a Terceros</a></li>
              <li><a href="#cookies">9. Cookies y Pixel Tags</a></li>
              <li><a href="#otros-sitios">10. Enlaces a Otros Sitios</a></li>
              <li><a href="#cuestiones-legales">11. Cuestiones Legales</a></li>
              <li><a href="#cambios">12. Cambios en sus Derechos</a></li>
              <li><a href="#contacto">13. Contacto</a></li>
            </ul>
          </nav>

          <main className="legal-content">
            <section id="introduccion" className="legal-section">
              <h2><span className="section-number">1.</span> Declaración de Políticas y Prácticas</h2>
              <p>
                Esta declaración describe las políticas y prácticas de <strong>SERVICIOS SIN FRONTERAS LLC</strong>, en cuanto a la recopilación y al uso de su información personal en relación a la visita que usted realiza al sitio web de la compañía.
              </p>
              <p>
                Aquí están nuestras políticas para los clientes de SERVICIOS SIN FRONTERAS LLC, afiliados, miembros y no miembros. Si luego de consultar la presente política de privacidad tiene preguntas e inquietudes, comuníquese por correo electrónico a{" "}
                <a href="mailto:direccion.administrativa@sinfronteras.llc">direccion.administrativa@sinfronteras.llc</a> o envíe una carta a nuestra dirección física. Sus recomendaciones, sugerencias y comentarios siempre son bienvenidos.
              </p>
              <div className="legal-address-box">
                <strong>SERVICIOS SIN FRONTERAS LLC</strong>
                JAVIER ROJAS<br />
                F2700 S.T MIAMI TRAIL. SUITE 4.<br />
                FLORIDA, FL, 34239. United States of America
              </div>
            </section>

            <section id="navegacion" className="legal-section">
              <h2><span className="section-number">2.</span> Navegación</h2>
              <p>
                Es importante aclarar que nuestra página o sitio web <strong>no recolecta automáticamente datos personales identificables</strong>. Es decir, no sabremos detalles como su nombre o correo electrónico simplemente por visitarnos.
              </p>
              <p>
                Solo accederemos a dicha información si usted decide proporcionarla voluntariamente, ya sea al completar un formulario, crear una cuenta, iniciar sesión o si ingresa a través de un enlace en un correo que le hayamos enviado.
              </p>
            </section>

            <section id="recopilacion" className="legal-section">
              <h2><span className="section-number">3.</span> Información que Recopilamos y su Uso</h2>
              <p>
                Cuando necesitemos recopilar su información de identificación personal para proveerle un servicio específico, le solicitaremos que voluntariamente nos proporcione la información necesaria; al hacerlo, entenderemos su debida autorización para el manejo de sus datos conforme a los propósitos expuestos.
              </p>
            </section>

            <section id="informacion-general" className="legal-section">
              <h2><span className="section-number">4.</span> Información General Recopilada</h2>
              <p>
                Para ofrecer una experiencia óptima y adaptada a nuestros usuarios en nuestro sitio web, en <strong>SERVICIOS SIN FRONTERAS LLC</strong>, con sede en Sarasota, Florida, supervisamos de cerca las interacciones de los visitantes en nuestra plataforma. Utilizamos herramientas analíticas y registros de servidores web para evaluar el tráfico, identificar páginas con mayor interacción y obtener una visión panorámica del comportamiento de navegación. Estos datos agregados nos permiten afinar nuestros servicios según las necesidades de los usuarios.
              </p>
              <p>
                Ocasionalmente, y siempre con fines estratégicos o de benchmarking, es posible que compartamos datos generalizados y anónimos con terceros sobre tendencias de uso. No obstante, estos datos <strong>no incluyen detalles que puedan identificar a un usuario específico</strong>. Nos comprometemos a mantener la máxima confidencialidad y nunca compartiremos información personal identificable sin su consentimiento previo y explícito.
              </p>
            </section>

            <section id="campanas" className="legal-section">
              <h2><span className="section-number">5.</span> Información Recopilada a Través de Campañas Publicitarias</h2>
              <p>
                Ocasionalmente lanzamos campañas promocionales mediante avisos en nuestro sitio web o en plataformas de redes sociales. La participación en estas dinámicas o campañas es totalmente voluntaria. Si decide interactuar y registrar sus datos, entenderemos que consiente el tratamiento de los mismos por nuestra parte.
              </p>
              <p>
                La información recabada en dichas iniciativas será gestionada exclusivamente por SERVICIOS SIN FRONTERAS LLC y no se transferirá a terceros a menos que contemos con su aprobación explícita.
              </p>
            </section>

            <section id="correos" className="legal-section">
              <h2><span className="section-number">6.</span> Correos Electrónicos y Boletines Informativos</h2>
              <p>
                Nuestro objetivo es mantenerlo informado sobre novedades, programas y temas de interés vinculados a nuestros servicios. Con cada comunicado que reciba se le ofrecerá la alternativa clara de declinar futuros envíos mediante un enlace de desuscripción.
              </p>
              <p>
                Si prefiere no recibir más correos, puede notificarlo escribiendo a{" "}
                <a href="mailto:direccion.administrativa@sinfronteras.llc">direccion.administrativa@sinfronteras.llc</a> o remitiendo una carta a nuestra sede en Sarasota, Florida. Tenga en cuenta que el procesamiento de la desactivación puede demorar hasta 10 días hábiles en hacerse efectivo.
              </p>
              <div className="legal-card-notice">
                <strong>Alerta contra intentos de Phishing:</strong>
                <p>
                  Bajo ninguna circunstancia SERVICIOS SIN FRONTERAS LLC le solicitará a través de correo electrónico información confidencial sensible como contraseñas, números de tarjeta de crédito completos o números de seguro social (SSN). Si recibe un mensaje sospechoso en nuestro nombre solicitando estos datos, absténgase de responder y comuníquenoslo de inmediato.
                </p>
              </div>
            </section>

            <section id="seguridad" className="legal-section">
              <h2><span className="section-number">7.</span> Seguridad del Almacenamiento de la Información</h2>
              <p>
                Consideramos la información personal suministrada como de carácter confidencial. Una vez recibida, es resguardada en infraestructura de servidores seguros que disponen de barreras y cortafuegos (firewalls) configurados para prevenir accesos no autorizados, alteraciones o filtraciones.
              </p>
            </section>

            <section id="terceros" className="legal-section">
              <h2><span className="section-number">8.</span> Divulgación de la Información a Terceros</h2>
              <p>
                SERVICIOS SIN FRONTERAS LLC, autorizada por usted para el manejo de su información personal, podrá compartir dicha información específicamente con los clientes y aliados de SERVICIOS SIN FRONTERAS LLC con el objeto de poner a su disposición diferentes servicios complementarios en beneficio de usted, de su familia y de toda la comunidad.
              </p>
              <p>
                Por tanto, la compañía podrá, siempre y cuando cuente con su autorización para fines comerciales, suministrar esta información según lo acordado.
              </p>
            </section>

            <section id="cookies" className="legal-section">
              <h2><span className="section-number">9.</span> Cookies y Pixel Tags</h2>
              <p>
                Al navegar en nuestro portal se hace uso de cookies. Las <em>cookies</em> son pequeños fragmentos de información cifrada depositados en el dispositivo del usuario. Utilizamos:
              </p>
              <ul>
                <li><strong>Cookies de sesión:</strong> temporales, requeridas para la autenticación y navegación segura en áreas específicas; se borran automáticamente al cerrar su explorador.</li>
                <li><strong>Cookies persistentes:</strong> permiten recordar preferencias de idioma o región en visitas posteriores. Permanecen activas hasta su vencimiento o hasta que decida eliminarlas.</li>
              </ul>
              <p>
                No empleamos cookies para sustraer información personal sin su conocimiento. Por otro lado, usamos <em>pixel tags</em> (elementos de código no intrusivos) con el propósito de medir la afluencia de visitas a las secciones del sitio y evaluar la recepción de nuestros correos electrónicos, garantizando que el formato enviado sea legible para su dispositivo.
              </p>
              <p>
                En materia de publicidad, ciertas tecnologías de terceros empleadas para contabilizar impresiones no recaban datos de carácter personal identificable.
              </p>
            </section>

            <section id="otros-sitios" className="legal-section">
              <h2><span className="section-number">10.</span> Enlaces a Otros Sitios Web</h2>
              <p>
                SERVICIOS SIN FRONTERAS LLC se responsabiliza única y exclusivamente de la declaración y términos contenidos en este sitio web oficial. No tenemos control ni asumimos responsabilidad sobre las prácticas de privacidad, políticas de uso o manejo de cookies de sitios externos a los que pueda ser remitido mediante enlaces presentes en nuestra plataforma.
              </p>
            </section>

            <section id="cuestiones-legales" className="legal-section">
              <h2><span className="section-number">11.</span> Cuestiones Legales y Jurisdicción</h2>
              <p>
                Este sitio opera desde los Estados Unidos de América y se rige íntegramente por las leyes aplicables de este país y del Estado de Florida.
              </p>
              <p>
                SERVICIOS SIN FRONTERAS LLC podría verse obligada a suministrar información sin necesidad de consentimiento previo si fuese formalmente requerida por orden judicial, mandato de ley o si, de buena fe, estimamos que dicha acción resulta indispensable para investigar, prevenir o proteger los derechos, seguridad o integridad de la compañía y de nuestros usuarios frente a actos presuntamente lesivos o fraudulentos.
              </p>
            </section>

            <section id="cambios" className="legal-section">
              <h2><span className="section-number">12.</span> Cambios en sus Derechos de Privacidad</h2>
              <p>
                Es posible que en el futuro debamos realizar actualizaciones o ajustes a esta política. Cualquier modificación será publicada directamente en este apartado, manteniendo de forma transparente el conocimiento de qué información recolectamos, cómo se emplea y las circunstancias bajo las cuales podría ser compartida.
              </p>
            </section>

            <section id="contacto" className="legal-section">
              <h2><span className="section-number">13.</span> Asuntos de Privacidad y Contacto</h2>
              <p>
                Si tiene inquietudes o sugerencias vinculadas a nuestra política de privacidad, no dude en contactarnos:
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
