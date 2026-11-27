import type { ServiceDetail, ServiceCategory } from '../types/services'

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'proteccion',
    name: 'Protección Humanitaria',
    description: 'Amparo confidencial para personas que huyen de persecución, violencia o delitos.',
    icon: 'shield',
  },
  {
    id: 'estatus-trabajo',
    name: 'Estatus y Empleo',
    description: 'Trámites para trabajar legalmente, residir y alcanzar la ciudadanía en EE.UU.',
    icon: 'briefcase',
  },
  {
    id: 'familia-alivio',
    name: 'Familia y Alivio Legal',
    description: 'Peticiones entre familiares y perdones migratorios para superar barreras legales.',
    icon: 'people',
  },
  {
    id: 'defensa-corte',
    name: 'Defensa en Corte',
    description: 'Representación rigurosa ante jueces de inmigración (EOIR) y apelaciones.',
    icon: 'scale',
  },
]

export const servicesData: ServiceDetail[] = [
  {
    id: 'asilo',
    slug: 'asilo',
    title: 'Asilo y Protección Migratoria',
    shortTitle: 'Asilo',
    category: 'Protección Humanitaria',
    categorySlug: 'proteccion',
    badge: 'Formulario I-589 · USCIS y Corte EOIR',
    icon: 'shield',
    estimatedTime: '6 meses a 2+ años',
    targetAudience: 'Personas que temen persecución en su país de origen por causales protegidas por ley.',
    summary: 'Protección legal para personas y familias que enfrentan peligro o persecución en su país de origen, con derecho a permiso de trabajo y residencia.',
    description: 'Evaluamos tu historia de persecución, estructuramos tu testimonio cronológico, compilamos la evidencia y te preparamos minuciosamente para tu entrevista con USCIS o audiencia en corte.',
    keyForm: 'Formulario I-589',
    whatIsIt: [
      'El asilo es una protección humanitaria establecida por la ley de inmigración de EE.UU. para extranjeros que no pueden o no desean regresar a su país debido a persecución pasada o a un temor bien fundado de persecución futura.',
      'La ley contempla dos vías: el Asilo Afirmativo (solicitado voluntariamente ante las oficinas de asilo de USCIS cuando no estás en corte) y el Asilo Defensivo (planteado como defensa ante un juez de inmigración cuando tienes un proceso de remoción abierto).',
      'Nuestro equipo te acompaña a construir un expediente fáctico sólido, traducir testimonios, documentar condiciones de país objetivas y afrontar cada interrogatorio con seguridad.',
    ],
    eligibility: [
      'Estar físicamente en territorio estadounidense o en un puerto de entrada.',
      'Demostrar persecución pasada o temor creíble fundada en 5 causales: raza, religión, nacionalidad, pertenencia a un grupo social particular u opinión política.',
      'Presentar la solicitud dentro de 1 año posterior a tu ingreso a EE.UU. (o demostrar excepciones por circunstancias extraordinarias o cambios de país).',
      'No haber participado en la persecución de otros ni tener delitos penales graves descalificantes.',
    ],
    benefits: [
      'Protección inmediata contra la deportación mientras tu caso se encuentra en trámite activo.',
      'Derecho a solicitar un Permiso de Trabajo (EAD) y Número de Seguro Social (SSN) al cumplir 150 días de haber presentado el Formulario I-589.',
      'Inclusión de familiares directos (cónyuge e hijos solteros menores de 21 años) en la misma solicitud.',
      'Derecho a solicitar la Residencia Permanente Legal (Green Card) al cumplirse 1 año de la concesión del asilo.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Evaluación y Diagnóstico Confidencial',
        description: 'Analizamos los hechos de tu historia, fechas de entrada, país de procedencia y viabilidad de las causales de protección aplicables.',
      },
      {
        step: 2,
        title: 'Elaboración del Formulario I-589 y Declaración',
        description: 'Redactamos una declaración jurada cronológica, traducimos documentos probatorios y anexamos informes de condiciones de país.',
      },
      {
        step: 3,
        title: 'Radicación Oficial y Toma de Huellas',
        description: 'Presentamos el expediente ante USCIS o la Corte de Inmigración, garantizando el sellado oportuno y gestionando la cita de datos biométricos.',
      },
      {
        step: 4,
        title: 'Solicitud de Trabajo y Preparación Testimonial',
        description: 'Tramitamos tu autorización de empleo a los 150 días y realizamos simulaciones intensivas para tu entrevista con el oficial o audiencia con el juez.',
      },
    ],
    requiredDocuments: [
      'Pasaporte original y documento de identidad nacional vigente.',
      'Registro de entrada I-94 o comprobante de fecha de cruce fronterizo.',
      'Pruebas directas de amenazas: denuncias, fotos, cartas, mensajes, informes médicos.',
      'Partidas de nacimiento y matrimonio de cónyuge e hijos (con traducción certificada al inglés).',
      'Reportes de derechos humanos o notas de prensa de tu país de origen.',
    ],
    faqs: [
      {
        question: '¿Cuándo puedo solicitar mi permiso de trabajo si pedí asilo?',
        answer: 'Puedes solicitar tu Documento de Autorización de Empleo (EAD) trascurridos 150 días desde que USCIS o la corte aceptó tu Formulario I-589. Una vez cumplidos 180 días en el reloj de asilo, USCIS puede aprobar y emitir tu tarjeta.',
      },
      {
        question: '¿Qué sucede si ya pasó más de un año desde que llegué a EE.UU.?',
        answer: 'La regla general exige presentar el asilo dentro del primer año, pero existen excepciones válidas: cambios drásticos en tu país de origen, mantenimiento de un estatus legal previo (TPS, visa), o circunstancias personales extraordinarias (enfermedades graves). Analizamos tu historial para fundamentar la excepción.',
      },
      {
        question: '¿Puedo viajar fuera de Estados Unidos mientras tengo asilo pendiente?',
        answer: 'No debes salir del país sin solicitar previamente un permiso de viaje especial (Advance Parole). Además, NUNCA debes regresar al país del cual estás alegando persecución, ya que USCIS considerará que has renunciado a tu solicitud.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, quiero recibir orientación personalizada sobre mi solicitud de Asilo.',
    relatedSlugs: ['permiso-de-trabajo', 'representante-en-corte', 'ajuste-de-estatus'],
  },
  {
    id: 'permiso-de-trabajo',
    slug: 'permiso-de-trabajo',
    title: 'Permiso de Trabajo (EAD)',
    shortTitle: 'Permiso de trabajo',
    category: 'Estatus y Empleo',
    categorySlug: 'estatus-trabajo',
    badge: 'Formulario I-765 · USCIS',
    icon: 'briefcase',
    estimatedTime: '2 a 5 meses',
    targetAudience: 'Personas con trámites migratorios pendientes (asilo, ajuste, TPS, fianza, DACA) que desean empleo legal.',
    summary: 'Autorización oficial de empleo que te permite trabajar legalmente en cualquier empresa de EE.UU. y tramitar tu Número de Seguro Social.',
    description: 'Identificamos con precisión tu categoría de elegibilidad, compilamos toda la documentación reglamentaria y gestionamos tu Formulario I-765 para que obtengas tu tarjeta EAD sin demoras.',
    keyForm: 'Formulario I-765',
    whatIsIt: [
      'El Documento de Autorización de Empleo (EAD por sus siglas en inglés) es la credencial emitida por el gobierno de Estados Unidos que autoriza legalmente a una persona no ciudadana a desempeñar labores remuneradas en el país.',
      'Tener un permiso de trabajo abre las puertas a salarios dignos, beneficios laborales, emisión de la tarjeta de Seguro Social oficial y la posibilidad de obtener una licencia de conducir en la inmensa mayoría de los estados.',
      'No es un estatus migratorio independiente, sino un beneficio derivado de un trámite principal abierto o un alivio concedido.',
    ],
    eligibility: [
      'Tener una solicitud migratoria base elegible (asilo pendiente con reloj activo, solicitud de ajuste I-485, TPS, DACA, fianza con parole, etc.).',
      'No contar con condenas penales agravadas que descalifiquen para beneficios laborales de USCIS.',
      'Cumplir los tiempos mínimos de espera aplicables a tu categoría específica.',
    ],
    benefits: [
      'Trabajo 100% formal y legal en cualquier empleador o negocio de Estados Unidos.',
      'Emisión de Número de Seguro Social (SSN) válido para trabajar.',
      'Acceso a licencias de conducir estatales y apertura de cuentas bancarias comerciales.',
      'Mayor estabilidad económica y tranquilidad para tu hogar.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Verificación de Categoría de Elegibilidad',
        description: 'Confirmamos la categoría exacta bajo el código de regulaciones federales (c(8) asilo, c(9) ajuste, a(12) TPS, etc.).',
      },
      {
        step: 2,
        title: 'Compilación y Fotos Reglamentarias',
        description: 'Revisamos tu recibo de caso base, preparamos las fotografías tipo pasaporte con especificaciones biométricas y llenamos el Formulario I-765.',
      },
      {
        step: 3,
        title: 'Envío Electrónico o Físico',
        description: 'Radicamos ante el centro de procesamiento correspondiente de USCIS y te entregamos tu número de rastreo de recibo oficial.',
      },
      {
        step: 4,
        title: 'Recepción de Tarjeta EAD y Validación SSN',
        description: 'Monitoreamos la producción de la tarjeta plástica y su envío por correo asegurado, asesorándote para la cita de tu Seguro Social.',
      },
    ],
    requiredDocuments: [
      'Copia de pasaporte vigente o documento de identidad oficial con foto.',
      'Copia del aviso de recibo (Notice of Action I-797C) de tu caso migratorio principal.',
      'Registro I-94 o comprobante de estatus si ingresaste legalmente.',
      'Dos fotos idénticas a color tipo pasaporte estadounidense (2x2 pulgadas).',
      'Copia de permiso de trabajo anterior (en casos de renovación).',
    ],
    faqs: [
      {
        question: '¿Cuándo debo renovar mi permiso de trabajo si está por vencer?',
        answer: 'Es altamente recomendable iniciar el trámite de renovación hasta 180 días antes de su fecha de vencimiento. Esto te permite ampararte en las extensiones automáticas de validez laboral decretadas periódicamente por USCIS.',
      },
      {
        question: '¿Si me aprueban el permiso de trabajo ya tengo residencia?',
        answer: 'No. El permiso de trabajo es un beneficio temporal que te autoriza a laborar mientras se decide tu caso principal. La residencia (Green Card) depende de la resolución de fondo de tu trámite.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, quiero tramitar o renovar mi Permiso de Trabajo.',
    relatedSlugs: ['asilo', 'ajuste-de-estatus', 'peticion-familiar'],
  },
  {
    id: 'peticion-familiar',
    slug: 'peticion-familiar',
    title: 'Petición Familiar',
    shortTitle: 'Petición Familiar',
    category: 'Familia y Alivio Legal',
    categorySlug: 'familia-alivio',
    badge: 'Formulario I-130 · USCIS',
    icon: 'people',
    estimatedTime: '8 meses a varios años',
    targetAudience: 'Ciudadanos y residentes permanentes que desean traer o regularizar a cónyuges, hijos, padres o hermanos.',
    summary: 'El camino legal para reunirte con tu familia en Estados Unidos mediante el patrocinio de familiares calificados ante USCIS.',
    description: 'Guiamos a ciudadanos estadounidenses y residentes permanentes a demostrar la legitimidad del vínculo y patrocinar a sus seres queridos de manera ordenada y segura.',
    keyForm: 'Formulario I-130 / I-130A',
    whatIsIt: [
      'La petición familiar es el pilar central del sistema migratorio de EE.UU. Permite que un ciudadano estadounidense o residente permanente actúe como peticionario ante USCIS para que su familiar calificado obtenga una visa de inmigrante.',
      'Distingue dos grandes grupos: Familiares Inmediatos de ciudadanos (cónyuges, hijos menores solteros y padres, quienes no tienen límites de cupo anual) y Categorías de Preferencia Familiar (hijos mayores, casados o hermanos, sujetos al Boletín de Visas).',
      'Un expediente bien armado desde el primer día evita costosas solicitudes de evidencia (RFE) y acelerará el reencuentro de tu familia.',
    ],
    eligibility: [
      'Peticionario ciudadano de EE.UU.: Puede pedir a cónyuge, hijos solteros o casados, padres (si el ciudadano tiene 21+ años) y hermanos.',
      'Peticionario residente permanente (LPR): Puede pedir a su cónyuge e hijos solteros de cualquier edad.',
      'Demostrar relación de parentesco real y de buena fe con actas civiles válidas.',
      'Capacidad económica para presentar la Declaración Jurada de Patrocinio Económico (Affidavit of Support I-864).',
    ],
    benefits: [
      'Estatus legal permanente y obtención de la Green Card para tus seres queridos.',
      'Protección formal contra la separación y deportación.',
      'Posibilidad de realizar trámite concurrente con ajuste de estatus si el beneficiario se encuentra en EE.UU. con entrada legal.',
      'Construcción de estabilidad generacional para toda la familia.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Diagnóstico de Categoría y Boletín de Visas',
        description: 'Revisamos los tiempos de espera específicos según la relación de parentesco y el país de origen.',
      },
      {
        step: 2,
        title: 'Construcción del Expediente de Buena Fe',
        description: 'Recopilamos actas de nacimiento, matrimonio, pruebas económicas conjuntas y solvencia del patrocinador.',
      },
      {
        step: 3,
        title: 'Presentación del Formulario I-130',
        description: 'Radicamos ante USCIS digitalmente o por correo y damos seguimiento al aviso de recibo oficial.',
      },
      {
        step: 4,
        title: 'Fase Consular (NVC) o Ajuste en EE.UU.',
        description: 'Te asistimos en los 6 pasos del Centro Nacional de Visas o en la preparación de la cita de residencia.',
      },
    ],
    requiredDocuments: [
      'Prueba de estatus del peticionario: Pasaporte estadounidense, certificado de naturalización o Green Card.',
      'Partidas de nacimiento de peticionario y beneficiario con traducciones certificadas.',
      'Actas de matrimonio y sentencias de divorcio de uniones previas.',
      'Evidencias de buena fe conyugal (fotos familiares, cuentas de banco conjuntas, contratos de arrendamiento).',
      'Declaraciones de impuestos recientes (Formulario 1040 y W-2) del patrocinador.',
    ],
    faqs: [
      {
        question: '¿Qué es un matrimonio de buena fe para USCIS?',
        answer: 'USCIS exige demostrar que la unión conyugal se fundamenta en una relación sentimental real y no fue creada con el único fin de evadir leyes de inmigración. Presentamos documentación financiera conjunta, pruebas de domicilio y declaraciones de testigos.',
      },
      {
        question: '¿Puede un residente permanente pedir a sus padres?',
        answer: 'No. La ley estipula que únicamente los ciudadanos estadounidenses mayores de 21 años tienen derecho a pedir a sus padres. Si eres residente, primero debes naturalizarte.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, deseo información para realizar una Petición Familiar.',
    relatedSlugs: ['ajuste-de-estatus', 'waiver-perdon-migratorio', 'naturalizacion'],
  },
  {
    id: 'cancelacion-de-remocion',
    slug: 'cancelacion-de-remocion',
    title: 'Cancelación de Remoción',
    shortTitle: 'Cancelación de remoción',
    category: 'Defensa en Corte',
    categorySlug: 'defensa-corte',
    badge: 'Formulario EOIR-42B / EOIR-42A',
    icon: 'columns',
    estimatedTime: '1 a 3+ años',
    targetAudience: 'Inmigrantes en proceso de deportación con 10+ años en EE.UU. cuyos familiares sufrirían daño extremo.',
    summary: 'Defensa extraordinaria ante un juez de inmigración para frenar la deportación y conseguir directamente la residencia permanente.',
    description: 'Estructuramos un caso probatorio integral que demuestra tu presencia continua de 10 años, tu buen carácter moral y el sufrimiento extremo e inusual que sufrirían tus hijos, cónyuge o padres ciudadanos/residentes si fueras deportado.',
    keyForm: 'Formulario EOIR-42B (No residentes) / 42A (Residentes)',
    whatIsIt: [
      'La Cancelación de Remoción es un alivio legal disponible únicamente ante un juez de la Corte de Inmigración (EOIR) dentro de un procedimiento de remoción.',
      'Si el juez concede la cancelación de remoción bajo la sección 240A(b), cancela la orden de deportación y le otorga de inmediato el estatus de Residente Permanente Legal (Green Card) al solicitante.',
      'Es un trámite exigente que requiere un nivel muy alto de prueba testimonial, pericial médica y psicológica.',
    ],
    eligibility: [
      'Haber vivido físicamente en EE.UU. de forma continua durante al menos 10 años previos a la entrega de la NTA.',
      'Tener un familiar calificado: cónyuge, padre o hijo menor de 21 años que sea ciudadano estadounidense o residente legal.',
      'Demostrar que tu deportación causaría "sufrimiento excepcional y extremadamente inusual" a dicho familiar.',
      'Haber mantenido buen carácter moral durante los 10 años y no tener delitos graves descalificantes.',
    ],
    benefits: [
      'Freno permanente de la orden de remoción o deportación.',
      'Otorgamiento directo de la Residencia Permanente Legal (Green Card).',
      'Derecho a solicitar autorización de empleo (EAD) mientras el proceso esté pendiente ante el juez.',
      'Garantía de permanencia y unidad para tu familia en suelo estadounidense.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Verificación de la Regla de los 10 Años',
        description: 'Auditamos recibos, impuestos y registros para asegurar que se cumplió la presencia física continua antes de la NTA.',
      },
      {
        step: 2,
        title: 'Peritajes Médicos y Psicológicos',
        description: 'Coordinamos evaluaciones con profesionales licenciados para documentar el impacto catastrófico en el familiar calificado.',
      },
      {
        step: 3,
        title: 'Radicación del Formulario EOIR-42B',
        description: 'Presentamos la solicitud formal ante el tribunal de inmigración y la fiscalía de ICE, gestionando huellas biométricas.',
      },
      {
        step: 4,
        title: 'Defensa en la Audiencia Individual de Méritos',
        description: 'Preparamos tus testimonios y testigos para defender el caso de forma contundente en el juicio final ante el juez.',
      },
    ],
    requiredDocuments: [
      'Pruebas continuas de presencia por 10 años: declaraciones de impuestos, alquileres, recibos de luz, registros escolares.',
      'Certificados de nacimiento de hijos nacidos en EE.UU. o actas de matrimonio con ciudadano/residente.',
      'Informes psicológicos y evaluaciones médicas del familiar calificado.',
      'Cartas de recomendación de iglesias, empleadores y líderes comunitarios que acrediten buen carácter moral.',
      'Récords de antecedentes penales limpios (o disposiciones certificadas de faltas menores).',
    ],
    faqs: [
      {
        question: '¿Qué es el "sufrimiento excepcional y extremadamente inusual"?',
        answer: 'Es un estándar legal más riguroso que la dificultad común por separación familiar. Se demuestra con condiciones médicas severas, discapacidades de aprendizaje de hijos en EE.UU., o condiciones extremas que amenacen la vida o desarrollo del familiar calificado si tuviera que mudarse o quedar desamparado.',
      },
      {
        question: '¿Puedo solicitar la cancelación de remoción si no tengo corte?',
        answer: 'No. Este recurso no se puede solicitar ante USCIS. Es exclusivamente un mecanismo defensivo que se presenta ante un juez cuando ya estás en procedimiento de deportación.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, tengo un caso de corte y quiero evaluar la Cancelación de Remoción.',
    relatedSlugs: ['representante-en-corte', 'fianza', 'asilo'],
  },
  {
    id: 'visa-vawa',
    slug: 'visa-vawa',
    title: 'Visa VAWA (Ley de Violencia contra las Mujeres)',
    shortTitle: 'Visa VAWA',
    category: 'Protección Humanitaria',
    categorySlug: 'proteccion',
    badge: 'Formulario I-360 Confidencial · USCIS',
    icon: 'heart',
    estimatedTime: '1.5 a 3 años',
    targetAudience: 'Personas de cualquier género que sufrieron maltrato por parte de cónyuge, padre o hijo ciudadano/residente.',
    summary: 'Auto-petición migratoria confidencial para víctimas de abuso o crueldad extrema, sin depender del agresor ni requerir su firma.',
    description: 'Te brindamos un espacio seguro, humano y con estricta confidencialidad para solicitar tu estatus legal y residencia permanente de forma independiente y protegida por la ley federal.',
    keyForm: 'Formulario I-360',
    whatIsIt: [
      'VAWA (Violence Against Women Act) es un programa de amparo federal que permite a víctimas de violencia doméstica o crueldad extrema auto-peticionarse para obtener la Green Card sin la cooperación, conocimiento o consentimiento de su agresor.',
      'A pesar de su nombre histórico, la ley protege exactamente igual a mujeres y a hombres.',
      'Toda la información y comunicaciones de VAWA están estrictamente protegidas bajo la ley federal 8 U.S.C. § 1367: USCIS tiene prohibido contactar o alertar al familiar abusador.',
    ],
    eligibility: [
      'Estar casado(a) o haber estado casado(a) con ciudadano o residente, o ser hijo/padre de un agresor ciudadano/residente.',
      'Haber residido con el familiar agresor en algún momento.',
      'Haber sido víctima de abuso físico, violencia psicológica, amenazas de deportación o crueldad extrema.',
      'Haber contraído el matrimonio de buena fe (en caso de cónyuge).',
      'Poseer buen carácter moral.',
    ],
    benefits: [
      'Trámite 100% confidencial y seguro: El agresor nunca es informado ni requerido.',
      'No necesitas firmas, patrocinio económico ni ayuda de la persona agresora.',
      'Autorización de empleo (EAD) y Número de Seguro Social durante el proceso.',
      'Camino directo a la Residencia Permanente Legal (Green Card).',
      'Acceso a apoyos sociales y programas de asistencia comunitaria protegidos.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Entrevista de Contención Segura',
        description: 'Escuchamos tu vivencia en un entorno protegido, definiendo una dirección postal segura para toda tu correspondencia.',
      },
      {
        step: 2,
        title: 'Recopilación Confidencial de Evidencias',
        description: 'Reunimos tu declaración personal, pruebas de la relación, peritajes psicológicos y evidencias de buen carácter moral.',
      },
      {
        step: 3,
        title: 'Radicación de la Auto-Petición I-360',
        description: 'Enviamos el paquete formal a la unidad especializada en casos humanitarios del Centro de Servicio de Vermont de USCIS.',
      },
      {
        step: 4,
        title: 'Determinación Prima Facie y Residencia',
        description: 'USCIS emite la aprobación preliminar, otorgando permiso de trabajo y habilitando la solicitud del Formulario I-485 para la Green Card.',
      },
    ],
    requiredDocuments: [
      'Declaración jurada detallada de tu vivencia y situaciones de crueldad sufridas.',
      'Pruebas del estatus de ciudadanía o residencia del agresor (copia de pasaporte, certificado de nacimiento o Green Card).',
      'Acta de matrimonio y pruebas de convivencia conjunta (cartas, recibos, fotos).',
      'Evaluación psicológica especializada en trauma o reportes policiales/médicos si existen (no indispensables).',
      'Certificados de antecedentes policiales que corroboren buen carácter moral.',
    ],
    faqs: [
      {
        question: '¿Si nunca llamé a la policía, puedo solicitar VAWA?',
        answer: 'Sí. La ley federal reconoce que muchas víctimas no llaman a la policía por terror a represalias o amenazas de deportación. El abuso psicológico, el aislamiento y las agresiones pueden demostrarse mediante evaluaciones psicológicas profesionales, testimonios de testigos y tu propia declaración.',
      },
      {
        question: '¿Los hombres maltratados pueden aplicar a VAWA?',
        answer: 'Absolutamente sí. La ley protege a cualquier cónyuge o hijo sin distinción de género que haya sufrido maltrato por parte de un familiar ciudadano o residente.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, desearía una consulta confidencial sobre la Visa VAWA.',
    relatedSlugs: ['visa-u', 'ajuste-de-estatus', 'permiso-de-trabajo'],
  },
  {
    id: 'visa-u',
    slug: 'visa-u',
    title: 'Visa U para Víctimas de Delitos',
    shortTitle: 'Visa U',
    category: 'Protección Humanitaria',
    categorySlug: 'proteccion',
    badge: 'Formulario I-918 · Protección de Ley',
    icon: 'shield',
    estimatedTime: '4 a 5+ años (con beneficios anticipados)',
    targetAudience: 'Personas que fueron víctimas de delitos en EE.UU. y cooperaron con las autoridades policiales o judiciales.',
    summary: 'Estatus legal, permiso de trabajo y camino hacia la residencia para quienes sufrieron un crimen calificado en EE.UU. y ayudaron a la policía.',
    description: 'Tramitamos la certificación policial requerida, preparamos las solicitudes de perdón necesarias y gestionamos tu Formulario I-918 para protegerte a ti y a tus familiares.',
    keyForm: 'Formulario I-918 / Suplemento B',
    whatIsIt: [
      'La Visa U fue promulgada por el Congreso con el doble propósito de fortalecer la capacidad de las autoridades para perseguir crímenes violentos y brindar protección a víctimas vulnerables independientemente de su estatus migratorio.',
      'Ofrece una de las dispensas (perdones migratorios) más generosas de la ley estadounidense, permitiendo perdonar entradas ilegales previas, presencia indocumentada y otras faltas.',
      'Permite incluir como derivados a cónyuges e hijos menores de edad (y a padres o hermanos si el solicitante principal es menor de 21 años).',
    ],
    eligibility: [
      'Haber sido víctima directa o indirecta de un delito calificado (violencia doméstica, agresión con arma, robo violento, extorsión, etc.).',
      'Haber sufrido daño físico o mental sustancial a consecuencia de dicho delito.',
      'Poseer información creíble sobre el crimen y haber cooperado con la policía, fiscalía o tribunal en la investigación.',
      'Obtener la certificación oficial firmada por la agencia policial correspondiente (Formulario I-918B).',
    ],
    benefits: [
      'Estatus legal de no inmigrante en EE.UU. por un período inicial de 4 años.',
      'Permiso de trabajo (EAD) y seguro social bajo la Determinación de Buena Fe (BFD) antes de la decisión final.',
      'Protección contra la deportación para el solicitante principal y sus familiares derivados.',
      'Camino a la Residencia Permanente Legal (Green Card) tras 3 años continuos de estatus con Visa U.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Análisis del Reporte Policial',
        description: 'Examinamos el informe para verificar que el delito figure en la lista calificada por la ley federal.',
      },
      {
        step: 2,
        title: 'Gestión de la Certificación I-918B',
        description: 'Redactamos la solicitud formal ante el departamento de policía, fiscalía o agencia investigadora encargada.',
      },
      {
        step: 3,
        title: 'Armado del Expediente y Perdón I-192',
        description: 'Estructuramos pruebas del daño sustancial, declaración de la víctima y solicitud de perdón por causales de inadmisibilidad.',
      },
      {
        step: 4,
        title: 'Radicación en USCIS y Determinación BFD',
        description: 'Presentamos ante USCIS y hacemos seguimiento para obtener la determinación de buena fe que emite el permiso de trabajo.',
      },
    ],
    requiredDocuments: [
      'Reporte policial completo del incidente criminal.',
      'Formulario de Certificación de Ley I-918 Suplemento B firmado por la autoridad.',
      'Declaración jurada personal detallando el hecho delictivo y sus repercusiones físicas y emocionales.',
      'Registros médicos, comprobantes de hospitalización o evaluaciones psicológicas.',
      'Actas de nacimiento y matrimonio de los familiares derivados incluidos.',
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo dura la certificación policial antes de vencer?',
        answer: 'La certificación policial Formulario I-918 Suplemento B tiene una validez de 6 meses a partir de la firma del oficial. Debe radicarse ante USCIS antes de que expire ese lapso.',
      },
      {
        question: '¿Si el delito ocurrió hace varios años aún puedo aplicar?',
        answer: 'Sí. La ley no impone un límite de tiempo retroactivo desde que ocurrió el crimen, siempre que la policía esté dispuesta a certificar que cooperaste con ellos en la investigación.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, quiero consultar sobre mi elegibilidad para la Visa U.',
    relatedSlugs: ['visa-vawa', 'permiso-de-trabajo', 'ajuste-de-estatus'],
  },
  {
    id: 'naturalizacion',
    slug: 'naturalizacion',
    title: 'Naturalización y Ciudadanía',
    shortTitle: 'Naturalización',
    category: 'Estatus y Empleo',
    categorySlug: 'estatus-trabajo',
    badge: 'Formulario N-400 · USCIS',
    icon: 'card',
    estimatedTime: '5 a 10 meses',
    targetAudience: 'Residentes permanentes que cumplen los años exigidos para convertirse en ciudadanos de Estados Unidos.',
    summary: 'El paso final hacia la ciudadanía de EE.UU.: asesoría en el Formulario N-400, preparación para el examen de inglés y cívica, y ceremonia de juramento.',
    description: 'Te preparamos con dedicación y paciencia para que apruebes tu entrevista de naturalización, obtengas tu pasaporte estadounidense y disfrutes de la protección definitiva de la ciudadanía.',
    keyForm: 'Formulario N-400',
    whatIsIt: [
      'La naturalización es el proceso legal mediante el cual un titular de la Green Card adquiere la plena ciudadanía de los Estados Unidos de América.',
      'Con la ciudadanía, la persona adquiere derechos inalienables que ningún estatus de residente posee, como la imposibilidad absoluta de ser deportado, el derecho de votar en elecciones y la protección diplomática de EE.UU. en cualquier país.',
      'Preparamos minuciosamente tu caso para garantizar que no existan riesgos ocultos por viajes prolongados o antecedentes.',
    ],
    eligibility: [
      'Tener al menos 18 años de edad.',
      'Haber sido residente permanente legal durante 5 años (o 3 años si estás casado con ciudadano estadounidense).',
      'Haber estado físicamente presente en EE.UU. al menos 30 meses en los últimos 5 años (o 18 meses si estás bajo la regla de 3 años).',
      'Demostrar buen carácter moral y cumplimiento en el pago de impuestos.',
      'Conocimientos de inglés básico y cívica/historia de EE.UU. (con excepciones por edad o razones médicas).',
    ],
    benefits: [
      'Pasaporte estadounidense de libre tránsito internacional y protección consular mundial.',
      'Inmunidad absoluta contra la deportación: tu estatus nunca más vencerá ni dependerá de renovaciones.',
      'Derecho al voto en elecciones locales, estatales y federales.',
      'Facilidad para patrocinar con prioridad a padres, cónyuge, hijos y hermanos para obtener la residencia.',
      'Acceso a préstamos educativos federales y empleos en el gobierno de EE.UU.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Auditoría de Elegibilidad y Presencia Física',
        description: 'Revisamos minuciosamente tu historial de salidas al extranjero, pago de taxes y registros policiales para evitar sorpresas.',
      },
      {
        step: 2,
        title: 'Preparación y Envío del Formulario N-400',
        description: 'Llenamos con precisión tu solicitud en el portal de USCIS y adjuntamos toda la evidencia probatoria necesaria.',
      },
      {
        step: 3,
        title: 'Entrenamiento para el Examen Cívico y de Inglés',
        description: 'Te facilitamos material didáctico y practicamos contigo las 100 preguntas de historia y los ejercicios de lectura y escritura.',
      },
      {
        step: 4,
        title: 'Acompañamiento a Entrevista y Juramentación',
        description: 'Te asesoramos para el día de tu cita con el oficial y celebramos contigo la toma de juramento a la bandera.',
      },
    ],
    requiredDocuments: [
      'Copia de tu Tarjeta de Residencia Permanente (Green Card) por ambos lados.',
      'Pasaportes vigentes y pasaportes antiguos con sellos de entradas y salidas.',
      'Declaraciones de impuestos (Tax Transcripts del IRS) de los últimos 3 o 5 años.',
      'Acta de matrimonio y pruebas de vida en común (si aplicas bajo la regla de 3 años).',
      'Disposiciones judiciales certificadas en caso de haber tenido cualquier infracción penal o de tráfico grave.',
    ],
    faqs: [
      {
        question: '¿Puedo presentar el examen de ciudadanía en español?',
        answer: 'Sí, si calificas bajo la regla 50/20 (50 años de edad y 20 años como residente) o la regla 55/15 (55 años de edad y 15 como residente). También si cuentas con una exención médica certificada en el Formulario N-648 por una discapacidad diagnosticada.',
      },
      {
        question: '¿Con cuánta anticipación puedo enviar el Formulario N-400?',
        answer: 'Puedes enviar tu solicitud hasta 90 días naturales antes de que cumplas tu aniversario de 3 o 5 años como residente permanente legal.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, quiero prepararme para mi proceso de Naturalización.',
    relatedSlugs: ['ajuste-de-estatus', 'peticion-familiar', 'permiso-de-trabajo'],
  },
  {
    id: 'waiver-perdon-migratorio',
    slug: 'waiver-perdon-migratorio',
    title: 'Waiver / Perdón Migratorio',
    shortTitle: 'Waiver / Perdón Migratorio',
    category: 'Familia y Alivio Legal',
    categorySlug: 'familia-alivio',
    badge: 'Formularios I-601 / I-601A / I-212 · USCIS',
    icon: 'columns',
    estimatedTime: '12 a 24 meses',
    targetAudience: 'Personas con causales de inadmisibilidad (como presencia indocumentada) que necesitan un perdón para obtener su Green Card.',
    summary: 'Construcción jurídica de dispensas legales para perdonar faltas migratorias previas demostrando dificultad extrema a familiares calificados.',
    description: 'Armamos expedientes de alto calibre con peritajes y pruebas contundentes para solicitar el perdón de presencia sin estatus, entradas previas o infracciones formales ante USCIS.',
    keyForm: 'Formularios I-601 e I-601A',
    whatIsIt: [
      'Un Waiver o Perdón Migratorio es una autorización legal emitida por USCIS que perdona una causa específica de inadmisibilidad que impediría a una persona recibir una visa o la Green Card.',
      'El perdón provisional I-601A es especialmente valioso: permite a cónyuges e hijos de ciudadanos o residentes pedir el perdón por presencia indocumentada mientras permanecen en EE.UU., antes de salir a la entrevista consular.',
      'El núcleo del perdón radica en probar que el familiar calificado (cónyuge o padre) sufriría una "dificultad extrema" (extreme hardship) si la persona tuviera que marcharse o ser excluida.',
    ],
    eligibility: [
      'Tener un familiar calificado: Cónyuge o padre/madre que sea ciudadano estadounidense o residente permanente legal.',
      'Demostrar dificultad extrema a dicho familiar calificado tanto si permanece en EE.UU. sin ti como si tuviera que mudarse a tu país de origen.',
      'Tener una petición familiar aprobada (I-130) y no tener otras causales de inadmisibilidad no perdonables.',
    ],
    benefits: [
      'Eliminación del castigo de 3 o 10 años por presencia indocumentada.',
      'Con el I-601A provisional, esperas la respuesta dentro de EE.UU. con total tranquilidad.',
      'Permite culminar exitosamente el proceso hacia la residencia permanente legal.',
      'Brinda certeza y estabilidad emocional y económica al núcleo familiar.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Diagnóstico Legal de Inadmisibilidad',
        description: 'Identificamos con exactitud cada causal legal que requiere dispensa para asegurar que sea admisible a perdón.',
      },
      {
        step: 2,
        title: 'Estrategia y Pruebas de Dificultad Extrema',
        description: 'Recopilamos peritajes psicológicos, informes médicos, deudas financieras y análisis de país del familiar calificado.',
      },
      {
        step: 3,
        title: 'Redacción del Alegato Legal y Ensamblaje',
        description: 'Elaboramos un escrito jurídico exhaustivo vinculando la evidencia con la doctrina y jurisprudencia de USCIS.',
      },
      {
        step: 4,
        title: 'Radicación en USCIS y Coordinación Consular',
        description: 'Enviamos la solicitud y preparamos la fase final para la entrevista consular en tu país o el cierre del ajuste.',
      },
    ],
    requiredDocuments: [
      'Pruebas de ciudadanía o residencia legal de tu cónyuge o padre/madre calificado.',
      'Historiales clínicos y recetas médicas de tratamientos en curso de tu familiar.',
      'Evaluación psicológica pericial que certifique el impacto de la separación.',
      'Declaraciones de impuestos, hipotecas, estados de cuenta bancarios y deudas compartidas.',
      'Aviso de aprobación de la petición familiar I-130.',
    ],
    faqs: [
      {
        question: '¿Los hijos ciudadanos califican como familiares para el perdón por presencia ilegal?',
        answer: 'No directamente para los perdones I-601 y I-601A por presencia indocumentada: la ley exige que el familiar calificado sea un cónyuge o padre ciudadano o residente. Sin embargo, el sufrimiento que los hijos causan al cónyuge sí se pondera fuertemente como parte de la dificultad de este último.',
      },
      {
        question: '¿Qué es el perdón provisional I-601A?',
        answer: 'Es un trámite que te permite solicitar y recibir la aprobación del perdón de presencia sin documentos antes de viajar a tu país a la entrevista consular, reduciendo el riesgo de separación a solo unos días de viaje.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, necesito ayuda para preparar un Waiver / Perdón Migratorio.',
    relatedSlugs: ['peticion-familiar', 'ajuste-de-estatus', 'cancelacion-de-remocion'],
  },
  {
    id: 'representante-en-corte',
    slug: 'representante-en-corte',
    title: 'Representante en Corte Migratoria',
    shortTitle: 'Representante en Corte',
    category: 'Defensa en Corte',
    categorySlug: 'defensa-corte',
    badge: 'Corte de Inmigración EOIR · Departamento de Justicia',
    icon: 'columns',
    estimatedTime: '1 a 4 años (según calendario judicial)',
    targetAudience: 'Personas con procedimientos de deportación abiertos o citaciones ante un juez de inmigración.',
    summary: 'Acompañamiento, estrategia legal y defensa rigurosa frente al juez de inmigración y los fiscales de deportación de ICE.',
    description: 'Analizamos los cargos de tu Notificación de Comparecencia (NTA), preparamos tus solicitudes de alivio y te acompañamos a cada audiencia para proteger tus derechos fundamentales.',
    keyForm: 'Formulario EOIR-28 / Notificación NTA',
    whatIsIt: [
      'La Corte de Inmigración (EOIR) es un tribunal administrativo donde el gobierno de Estados Unidos busca ordenar la remoción (expulsión) de personas no ciudadanas.',
      'Estar representado profesionalmente cambia radicalmente los resultados: te permite responder adecuadamente a los cargos legales del gobierno, solicitar cierres administrativos o presentar defensas de fondo como asilo, cancelación o ajuste.',
      'Nunca debes ignorar una cita de corte, pues la consecuencia es una orden de deportación en ausencia inmediata.',
    ],
    eligibility: [
      'Haber recibido una Notificación de Comparecencia (Notice to Appear - NTA) con citación judicial.',
      'Tener un número de registro de extranjero (A-Number) activo en el sistema telefónico o web de la EOIR.',
      'Estar comprometido a asistir a todas las audiencias programadas por el tribunal.',
    ],
    benefits: [
      'Prevención de órdenes de deportación automáticas por incomparecencia.',
      'Defensa estratégica de tus derechos constitucionales y debido proceso legal.',
      'Presentación de solicitudes de alivio de fondo (asilo, cancelación, ajuste de estatus, retención de remoción).',
      'Posibilidad de presentar mociones de cambio de corte de ciudad (Change of Venue) si te mudaste.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Estudio de la Notificación de Comparecencia (NTA)',
        description: 'Examinamos los cargos alegados por el gobierno y verificamos la validez de las notificaciones de fecha y hora.',
      },
      {
        step: 2,
        title: 'Acreditación y Audiencias Preliminares (Master Calendar)',
        description: 'Registramos la representación formal, respondemos a los cargos y solicitamos tiempo para armar las solicitudes de alivio.',
      },
      {
        step: 3,
        title: 'Radicación de Solicitudes y Paquete de Pruebas',
        description: 'Presentamos oportunamente las aplicaciones de defensa junto con expedientes de evidencias foliadas e indexadas.',
      },
      {
        step: 4,
        title: 'Preparación de Testimonios y Audiencia Individual',
        description: 'Realizamos simulaciones de interrogatorios y defendemos tu caso en la audiencia final de méritos ante el juez.',
      },
    ],
    requiredDocuments: [
      'Copia completa de tu Notificación de Comparecencia (Notice to Appear - NTA).',
      'Notificaciones de fecha y hora emitidas por la corte de inmigración (Hearing Notices).',
      'Tu A-Number (número de 9 dígitos que empieza con la letra A).',
      'Copia de toda solicitud migratoria presentada previamente ante USCIS o la corte.',
      'Comprobantes de tu dirección actual para mantener actualizado el Formulario EOIR-33.',
    ],
    faqs: [
      {
        question: '¿Qué pasa si no puedo asistir a mi fecha de corte programada?',
        answer: 'Faltar a una cita en corte provocará que el juez emita una orden de deportación en ausencia inmediata, perdiendo automáticamente el derecho a la mayoría de alivios migratorios por 10 años. Si ocurre una emergencia grave, debe radicarse de inmediato una moción formal para reprogramar.',
      },
      {
        question: '¿Puedo transferir mi corte a otra ciudad si me mudé de estado?',
        answer: 'Sí. Mediante una Moción de Cambio de Sede (Motion for Change of Venue), demostrando tu nuevo domicilio fijo con contrato de alquiler y recibos públicos, solicitamos al juez que transfiera tu expediente a la corte más cercana.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, tengo una fecha de corte y necesito un representante legal.',
    relatedSlugs: ['cancelacion-de-remocion', 'asilo', 'fianza'],
  },
  {
    id: 'apelacion',
    slug: 'apelacion',
    title: 'Apelación Migratoria',
    shortTitle: 'Apelación',
    category: 'Defensa en Corte',
    categorySlug: 'defensa-corte',
    badge: 'EOIR-26 (BIA) · Formulario I-290B (AAO)',
    icon: 'shield',
    estimatedTime: '6 a 18 meses',
    targetAudience: 'Personas que recibieron una decisión adversa de un juez de inmigración o una denegación de USCIS.',
    summary: 'Recurso formal para impugnar decisiones judiciales desfavorables ante tribunales superiores y solicitar la revocación o reapertura.',
    description: 'Analizamos técnicamente las decisiones denegatorias, identificamos errores de hecho y de derecho cometidos por el decisor y redactamos informes jurídicos contundentes para defender tu causa.',
    keyForm: 'EOIR-26 (BIA) e I-290B (AAO / USCIS)',
    whatIsIt: [
      'Una apelación es el mecanismo jurídico mediante el cual se solicita a una instancia superior (la Junta de Apelaciones de Inmigración - BIA o la Oficina de Apelaciones Administrativas - AAO) que revise y corrija una decisión errónea dictada por un juez de inmigración o por USCIS.',
      'Los plazos son fatales y muy estrictos: normalmente se cuenta con solo 30 días calendario desde la fecha del fallo para radicar la apelación.',
      'En muchos casos de corte, radicar a tiempo la apelación ante el BIA genera una suspensión automática de la orden de deportación (Stay of Removal).',
    ],
    eligibility: [
      'Haber recibido una decisión desfavorable emitida recientemente por un juez de la EOIR o por una oficina de USCIS.',
      'Encontrarse dentro del plazo fatal de 30 días calendario para apelar.',
      'Contar con bases jurídicas: errores en la interpretación de la ley, desestimación injusta de pruebas, o violaciones al debido proceso.',
    ],
    benefits: [
      'Mantiene vivo tu caso migratorio y suspende la ejecución inmediata de la orden de remoción en la mayoría de los casos de corte.',
      'Revisión neutral por un panel de jueces expertos en apelaciones migratorias.',
      'Posibilidad de lograr la revocación directa del fallo o que el caso sea devuelto al juez para una nueva audiencia justa.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Análisis Relámpago de la Decisión Denegatoria',
        description: 'Revisamos de inmediato los fundamentos jurídicos de la orden denegatoria para actuar dentro del margen de 30 días.',
      },
      {
        step: 2,
        title: 'Radicación de la Notificación de Apelación',
        description: 'Presentamos la notificación formal (EOIR-26 o I-290B) y abonamos los aranceles antes del vencimiento fatal.',
      },
      {
        step: 3,
        title: 'Revisión de la Transcripción de Audiencia',
        description: 'Estudiamos la grabación y transcripción oficial del juicio para detectar contradicciones o fallas del juzgador.',
      },
      {
        step: 4,
        title: 'Redacción del Alegato Escrito (Brief)',
        description: 'Elaboramos un informe doctrinal exhaustivo con jurisprudencia de cortes de circuito y precedentes del BIA.',
      },
    ],
    requiredDocuments: [
      'Copia íntegra de la orden o decisión denegatoria emitida por el juez o USCIS.',
      'Aviso de recibo de la notificación para corroborar el cómputo de los 30 días.',
      'Copia de las solicitudes iniciales y pruebas presentadas en primera instancia.',
      'Nuevas evidencias indispensables (si se plantea una moción de reapertura complementaria).',
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo tengo para apelar una decisión de un juez de inmigración?',
        answer: 'Tienes exactamente 30 días calendario a partir del día en que el juez emitió o envió por correo la decisión. Si la notificación de apelación no llega al BIA dentro de ese plazo, el fallo queda firme e inapelable.',
      },
      {
        question: '¿Pueden deportarme mientras el BIA revisa mi apelación?',
        answer: 'En la gran mayoría de los casos donde se apela directamente una orden de remoción emitida por un juez de inmigración, la radicación oportuna de la apelación concede una suspensión automática de la deportación (Automatic Stay of Removal) mientras el BIA decide.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, recibí una denegación y necesito presentar una Apelación urgente.',
    relatedSlugs: ['representante-en-corte', 'cancelacion-de-remocion', 'fianza'],
  },
  {
    id: 'fianza',
    slug: 'fianza',
    title: 'Fianza de Inmigración (Bond Hearing)',
    shortTitle: 'Fianza',
    category: 'Defensa en Corte',
    categorySlug: 'defensa-corte',
    badge: 'Audiencia de Fianza ante Juez de Inmigración · ICE ERO',
    icon: 'shield',
    estimatedTime: 'Trámite de emergencia (días a semanas)',
    targetAudience: 'Familiares de personas detenidas por ICE que buscan su liberación inmediata bajo fianza monetaria.',
    summary: 'Procedimiento prioritario de emergencia para solicitar la liberación bajo fianza de personas bajo custodia de ICE ante un juez.',
    description: 'Actuamos con urgencia para ubicar al detenido, compilar cartas de arraigo y presentar una Moción de Fianza ante el juez de inmigración para que tu familiar regrese a casa mientras continúa su caso.',
    keyForm: 'Moción de Fianza / Audiencia de Custodia (Bond Motion)',
    whatIsIt: [
      'Una audiencia de fianza (Bond Hearing) es un proceso especial e independiente dentro de la corte de inmigración para evaluar si un inmigrante detenido por ICE puede ser liberado mediante el pago de un depósito de dinero.',
      'El juez analiza dos elementos centrales: que la persona no constituya una amenaza para la comunidad ni la seguridad nacional, y que no represente un riesgo de fuga.',
      'Estar en libertad permite a la persona trabajar, estar con sus hijos y preparar una defensa migratoria completa con su propio abogado.',
    ],
    eligibility: [
      'La persona debe estar detenida bajo custodia de ICE y no estar sujeta a detención mandatoria obligatoria por ley.',
      'Demostrar lazos comunitarios sólidos en EE.UU. (familia con estatus, domicilio estable, cartas de apoyo).',
      'Acreditar buen carácter moral y que no representa peligro público.',
      'Contar con un patrocinador con estatus legal (ciudadano o residente) dispuesto a pagar el monto de la fianza fijado.',
    ],
    benefits: [
      'Liberación inmediata del centro de detención para regresar con la familia.',
      'Capacidad de preparar el caso de corte en condiciones de tranquilidad y libertad.',
      'El monto pagado de fianza es reembolsable al finalizar el proceso si se asiste a todas las citas.',
      'Reincorporación a su trabajo y sustento del hogar.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Localización e Inspección Urgente de Custodia',
        description: 'Ubicamos el centro de detención, confirmamos el A-Number y evaluamos si califica para fianza bajo la ley INA 236.',
      },
      {
        step: 2,
        title: 'Recolección Rápida de Pruebas de Arraigo',
        description: 'Reunimos con urgencia cartas de apoyo de familiares, empleadores, comprobantes de domicilio y taxes.',
      },
      {
        step: 3,
        title: 'Radicación de la Moción de Fianza',
        description: 'Presentamos la solicitud formal ante la corte de inmigración competente y pedimos fecha de audiencia prioritaria.',
      },
      {
        step: 4,
        title: 'Audiencia de Fianza y Coordinación del Pago',
        description: 'Defendemos la solicitud ante el juez, logramos la fijación de la fianza y guiamos al patrocinador para el pago en ICE ERO.',
      },
    ],
    requiredDocuments: [
      'Cartas de respaldo moral y comunitario de familiares, amigos, empleadores o líderes religiosos.',
      'Pruebas de lazos familiares (actas de nacimiento de hijos en EE.UU., acta de matrimonio).',
      'Declaraciones de impuestos del detenido y del patrocinador que pagará la fianza.',
      'Contrato de arrendamiento o escrituras que demuestren domicilio fijo en EE.UU.',
      'Identificación oficial y prueba de estatus legal del patrocinador (obligor).',
    ],
    faqs: [
      {
        question: '¿Cuál es el monto mínimo legal para una fianza de inmigración?',
        answer: 'El mínimo establecido por la ley federal es de $1,500 dólares. No obstante, los jueces suelen fijar montos promedio de $3,000 a $10,000 dólares según el arraigo comunitario y los antecedentes del detenido.',
      },
      {
        question: '¿El dinero de la fianza se devuelve?',
        answer: 'Sí. La fianza de inmigración es un depósito de garantía. Si el solicitante cumple con presentarse a todas sus audiencias y comparecencias requeridas, ICE devuelve la totalidad del dinero al patrocinador que realizó el pago al cerrarse el caso.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, tengo un familiar detenido por ICE y necesito gestionar una Fianza de emergencia.',
    relatedSlugs: ['representante-en-corte', 'cancelacion-de-remocion', 'apelacion'],
  },
  {
    id: 'ajuste-de-estatus',
    slug: 'ajuste-de-estatus',
    title: 'Ajuste de Estatus (Residencia / Green Card)',
    shortTitle: 'Ajuste de estatus',
    category: 'Estatus y Empleo',
    categorySlug: 'estatus-trabajo',
    badge: 'Formulario I-485 · USCIS',
    icon: 'card',
    estimatedTime: '8 a 18 meses',
    targetAudience: 'Personas físicamente en EE.UU. elegibles para obtener la Residencia Permanente Legal sin salir del país.',
    summary: 'El proceso legal para obtener la Green Card dentro de Estados Unidos, evitando viajes consulares riesgosos y separaciones familiares.',
    description: 'Preparamos integralmente tu paquete de residencia permanente, incluyendo permisos de trabajo y de viaje simultáneos, asegurando que tu transición a residente legal sea fluida y exitosa.',
    keyForm: 'Formulario I-485',
    whatIsIt: [
      'El Ajuste de Estatus es el trámite que permite a una persona no ciudadana elegible convertirse en Residente Permanente Legal (obtener la Green Card) mientras permanece físicamente en los Estados Unidos.',
      'A diferencia del trámite consular, no necesitas viajar a la embajada de tu país de origen, lo que elimina el riesgo de quedar sujeto al castigo de los 3 o 10 años por presencia indocumentada.',
      'Durante el procesamiento del I-485, puedes solicitar simultáneamente un permiso de trabajo (I-765) y un permiso de viaje anticipado (I-131 Advance Parole).',
    ],
    eligibility: [
      'Estar físicamente presente en Estados Unidos.',
      'Tener una base de elegibilidad válida: petición familiar directa aprobada o simultánea, asilo concedido hace 1 año, VAWA, Visa U aprobada, etc.',
      'Haber ingresado legalmente con inspección o parole (o calificar bajo excepciones como la Sección 245(i) o VAWA).',
      'Tener una visa de inmigrante disponible de inmediato según el Boletín de Visas de USCIS.',
      'Ser admisible a EE.UU. o contar con un perdón (waiver) aprobado para cualquier causal de inadmisibilidad.',
    ],
    benefits: [
      'Obtención de la Tarjeta de Residencia Permanente Legal (Green Card).',
      'No requiere salir de EE.UU. ni exponerse al castigo consular de reingreso.',
      'Autorización de empleo (EAD) y permiso de viaje (Advance Parole) incluidos durante el trámite.',
      'Vía directa a la ciudadanía estadounidense en 3 o 5 años.',
      'Capacidad de vivir y trabajar permanentemente en cualquier parte de EE.UU.',
    ],
    processSteps: [
      {
        step: 1,
        title: 'Verificación de Entrada Legal y Admisibilidad',
        description: 'Revisamos sellos de pasaporte, I-94 o documentos de parole para constatar inspección válida y ausencia de impedimentos.',
      },
      {
        step: 2,
        title: 'Armado Integral del Paquete de Residencia',
        description: 'Preparamos concurrentemente los formularios I-485, I-130 (si aplica), I-765 (trabajo), I-131 (viaje) e I-864 (patrocinio).',
      },
      {
        step: 3,
        title: 'Examen Médico de Inmigración y Huellas',
        description: 'Te orientamos para completar el Formulario I-693 con un médico civil autorizado y gestionamos tu cita biométrica.',
      },
      {
        step: 4,
        title: 'Entrevista ante Oficial de USCIS y Aprobación',
        description: 'Realizamos simulaciones de entrevista matrimonial o individual para que asistas con total seguridad y recibas tu Green Card.',
      },
    ],
    requiredDocuments: [
      'Copia de pasaporte vigente y visa estadounidense (si aplica).',
      'Registro oficial de entrada I-94 o documento de parole sellado.',
      'Certificado de nacimiento de tu país de origen con traducción certificada al inglés.',
      'Dos fotos tamaño pasaporte recientes.',
      'Informe médico sellado del examen de inmigración (Formulario I-693).',
      'Declaración jurada de patrocinio económico (I-864) con impuestos y comprobantes del patrocinador.',
    ],
    faqs: [
      {
        question: '¿Puedo salir de EE.UU. mientras mi solicitud de residencia está en proceso?',
        answer: 'No debes salir de Estados Unidos sin haber obtenido primero un Permiso Adelantado de Viaje (Advance Parole - Formulario I-131). Si sales sin esta autorización previa, USCIS considerará que has abandonado tu solicitud de residencia.',
      },
      {
        question: '¿Qué es el examen médico Formulario I-693?',
        answer: 'Es un examen médico obligatorio realizado por un médico civil designado por USCIS (civil surgeon) para evaluar tu estado de salud, actualizar tu esquema de vacunación y descartar enfermedades infectocontagiosas que impidan la residencia.',
      },
    ],
    whatsappMessage: 'Hola Servicios Sin Fronteras, quiero iniciar mi trámite de Ajuste de Estatus para la Green Card.',
    relatedSlugs: ['peticion-familiar', 'permiso-de-trabajo', 'naturalizacion'],
  },
]

// Helper functions
export function getAllServices(): ServiceDetail[] {
  return servicesData
}

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const normalized = slug.trim().toLowerCase()
  return (
    servicesData.find(s => s.slug === normalized || s.id === normalized) ||
    // Aliases
    (normalized === 'trabajo' ? servicesData.find(s => s.slug === 'permiso-de-trabajo') : undefined) ||
    (normalized === 'familia' ? servicesData.find(s => s.slug === 'peticion-familiar') : undefined) ||
    (normalized === 'corte' ? servicesData.find(s => s.slug === 'representante-en-corte') : undefined) ||
    (normalized === 'vawa' ? servicesData.find(s => s.slug === 'visa-vawa') : undefined) ||
    (normalized === 'visau' ? servicesData.find(s => s.slug === 'visa-u') : undefined) ||
    (normalized === 'estatus' ? servicesData.find(s => s.slug === 'ajuste-de-estatus') : undefined) ||
    (normalized === 'perdon' || normalized === 'waiver' ? servicesData.find(s => s.slug === 'waiver-perdon-migratorio') : undefined)
  )
}

export function getServicesByCategory(categorySlug: string): ServiceDetail[] {
  return servicesData.filter(s => s.categorySlug === categorySlug)
}
