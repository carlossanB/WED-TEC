import documentSigningImg from "@/assets/images/optimized/document-signing-1200.jpg"
import statueLibertyImg from "@/assets/images/optimized/Estatua de la Libertad al atardecer.webp"
import trustCoupleImg from "@/assets/images/optimized/trust-couple-1000.jpg"
import visaApplicationImg from "@/assets/images/optimized/visa-application-960.jpg"
import type { NewsArticle, NewsCategory } from "@/features/news/types"

/**
 * Imágenes locales utilizadas únicamente como respaldo de emergencia (`onError`)
 * en caso de que el navegador del usuario no tenga conexión a internet.
 */
export const NEWS_CATEGORY_IMAGES: Record<NewsCategory, string> = {
  "Alertas USCIS": documentSigningImg,
  "Asilo y Corte": statueLibertyImg,
  "Permisos y Visas": visaApplicationImg,
  "Residencia y Ciudadanía": trustCoupleImg,
}

/**
 * Noticias reales con las fotografías originales de los sitios de noticias
 * (La Opinión, El Diario NY y Conexión Migrante) como respaldo inmediato.
 */
export const FALLBACK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "conexion-residencia-ciudadania-2026",
    title: "Bajan las aprobaciones de residencia y ciudadanía en Estados Unidos: datos recientes de USCIS",
    summary:
      "Nuevos reportes de trámites ante el Servicio de Ciudadanía e Inmigración (USCIS) muestran cambios en los tiempos de revisión para solicitudes de tarjeta verde y naturalización.",
    publishedAt: "2026-11-09T15:40:54Z",
    formattedDate: "9 nov 2026",
    sourceName: "Conexión Migrante",
    sourceKind: "uscis",
    sourceUrl: "https://conexionmigrante.com/",
    category: "Residencia y Ciudadanía",
    relatedService: "Naturalización y Ciudadanía",
    imageUrl:
      "https://d2pb1207o18vhc.cloudfront.net/wp-content/uploads/2026/11/09142702/aSILO.jpg",
    isOfficialGov: true,
  },
  {
    id: "laopinion-tps-proteccion-2026",
    title: "Perder el TPS puede derivar en procesos de deportación: qué opciones legales existen ante la corte",
    summary:
      "Abogados de inmigración explican qué medidas preventivas pueden tomar los beneficiarios del Estatus de Protección Temporal para evaluar ajustes de estatus o defensas oportunamente.",
    publishedAt: "2026-10-31T10:41:00Z",
    formattedDate: "31 oct 2026",
    sourceName: "La Opinión",
    sourceKind: "prensa",
    sourceUrl: "https://laopinion.com/category/inmigracion/",
    category: "Permisos y Visas",
    relatedService: "Permiso de Trabajo (EAD)",
    imageUrl:
      "https://laopinion.com/wp-content/uploads/sites/3/2026/10/Inmigrantes-venezolanos-enfrentan-detenciones-y-deportaciones-tras-perder-la-proteccion-del-TPS.jpg",
    isOfficialGov: false,
  },
  {
    id: "laopinion-green-card-loteria",
    title: "Residencia legal y lotería de visas: lo que debes saber sobre los cambios en procesos de Green Card",
    summary:
      "Miles de solicitantes buscan alternativas familiares y humanitarias para obtener la residencia permanente en Estados Unidos ante las recientes medidas administrativas.",
    publishedAt: "2026-10-30T07:19:00Z",
    formattedDate: "30 oct 2026",
    sourceName: "La Opinión",
    sourceKind: "prensa",
    sourceUrl: "https://laopinion.com/category/inmigracion/",
    category: "Residencia y Ciudadanía",
    relatedService: "Peticiones Familiares",
    imageUrl:
      "https://laopinion.com/wp-content/uploads/sites/3/2026/10/La-loteria-de-visas-permite-a-miles-de-personas-buscar-la-residencia-legal-en-Estados-Unidos.jpg",
    isOfficialGov: false,
  },
  {
    id: "eldiariony-tarifas-uscis",
    title: "USCIS actualizó tarifas migratorias: cuáles son los nuevos costos y quiénes califican a exenciones",
    summary:
      "Revisa la tabla actualizada de aranceles para permisos de trabajo, peticiones familiares y ajuste de estatus antes de enviar tus paquetes a las localidades seguras de USCIS.",
    publishedAt: "2026-10-20T00:36:39Z",
    formattedDate: "20 oct 2026",
    sourceName: "El Diario NY",
    sourceKind: "uscis",
    sourceUrl: "https://eldiariony.com/category/inmigracion/",
    category: "Alertas USCIS",
    relatedService: "Ajuste de Estatus",
    imageUrl:
      "https://eldiariony.com/wp-content/uploads/sites/2/2026/10/USCIS-aumento-tarifas-migratorias-cuales-son-los-nuevos-costos-shutterstock_2728584833.jpg",
    isOfficialGov: true,
  },
  {
    id: "eldiariony-alerta-estafas-migratorias",
    title: "Autoridades emiten alerta sobre estafas migratorias y explican cómo proteger tu expediente en USCIS",
    summary:
      "Recomiendan verificar cada recibo oficial I-797C y contar siempre con orientación calificada para evitar errores que perjudiquen tu historial migratorio.",
    publishedAt: "2026-10-22T13:49:00Z",
    formattedDate: "22 oct 2026",
    sourceName: "El Diario NY",
    sourceKind: "uscis",
    sourceUrl: "https://eldiariony.com/category/inmigracion/",
    category: "Alertas USCIS",
    relatedService: "Consulta de Caso USCIS",
    imageUrl:
      "https://eldiariony.com/wp-content/uploads/sites/2/2026/10/Nueva-Jersey-alerta-sobre-estafas-migratorias-y-como-avoidarlas-shutterstock_2432633289.jpg".replace(
        "avoidarlas",
        "evitarlas"
      ),
    isOfficialGov: true,
  },
  {
    id: "laopinion-juez-tribunales-inmigracion",
    title: "Tribunales federales y cortes de inmigración: derechos clave durante tus audiencias programadas",
    summary:
      "Conoce la importancia de asistir puntualmente a cada cita judicial y preparar tu defensa con anticipación frente al juez de inmigración.",
    publishedAt: "2026-10-25T14:20:00Z",
    formattedDate: "25 oct 2026",
    sourceName: "La Opinión",
    sourceKind: "prensa",
    sourceUrl: "https://laopinion.com/category/inmigracion/",
    category: "Asilo y Corte",
    relatedService: "Representación en Corte",
    imageUrl:
      "https://laopinion.com/wp-content/uploads/sites/3/2026/06/Un-juez-federal-determino-que-las-detenciones-migratorias-en-tribunales-carecian-de-una-justificacion-legal-adecuada.jpg",
    isOfficialGov: false,
  },
]
