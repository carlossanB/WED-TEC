# Arquitectura del Frontend (Feature-Driven / Vertical Slices)

El proyecto utiliza **React 19 + Vite + TypeScript + Tailwind CSS v4 + Axios** bajo una arquitectura modular orientada a dominios (**Feature-Driven Architecture**), alineada con la composición de un App Router moderno.

```text
src/
├── app/                                 # Composición global, shell del sitio, routing y providers
│   ├── App.tsx                          # Orquestador de rutas y estado global de modales
│   ├── layout/                          # Estructura compartida (SiteLayout, Header, Footer, Menús)
│   ├── navigation/                      # Adaptadores de navegación (Link)
│   ├── providers/                       # Contextos transversales (RouterProvider)
│   └── routing/                         # Matching discriminado y constantes de rutas
├── features/                            # Módulos de negocio independientes (Vertical Slices)
│   ├── home/                            # Landing page principal (secciones y animaciones GSAP)
│   │   ├── components/
│   │   ├── hooks/
│   │   └── HomePage.tsx
│   ├── services/                        # Catálogo y detalle de los 12 servicios migratorios
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── ServicesRoute.tsx
│   ├── case-lookup/                     # Consulta en tiempo real de casos ante USCIS
│   │   ├── components/
│   │   ├── services/                    # Consumo de API con Axios (caseLookupService)
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── types.ts
│   │   └── CaseLookupPage.tsx
│   └── consultation/                    # Captación de leads y evaluación inicial (Bitrix24)
│       ├── components/
│       ├── services/                    # Envío de leads con Axios (leadService)
│       ├── styles/
│       ├── utils/
│       ├── types.ts
│       └── ConsultationDialog.tsx
├── shared/                              # Infraestructura transversal agnóstica del dominio
│   ├── api/                             # Cliente HTTP centralizado (Axios + interceptores)
│   │   └── httpClient.ts
│   ├── ui/                              # Design System / Componentes UI atómicos reutilizables
│   ├── hooks/                           # Hooks transversales (scroll reveal, editorial reveals)
│   └── lib/                             # Configuración de librerías externas (GSAP)
├── data/                                # Fuente de datos estáticos y configuración editorial
├── types/                               # Contratos y tipos de dominio compartidos
├── styles/                              # Tokens de diseño, estilos base y refinamientos globales
├── App.tsx                              # Re-export de entrada requerido por el scaffold
├── index.css                            # Punto de entrada CSS y orden de cascada
└── main.tsx                             # Punto de montaje de React DOM
```

## Reglas de dependencia

1. **`app/`** compone `features/` y `shared/`, pero no contiene lógica de dominio específica de una feature.
2. **`features/*`** encapsula sus propios componentes, hooks, servicios HTTP, validaciones, tipos y estilos. Una feature puede consumir `shared/`, `data/` y `types/`, pero **nunca importa directamente desde otra feature**.
3. **`shared/`** contiene primitivas de interfaz (`shared/ui`), cliente HTTP (`shared/api/httpClient.ts`), hooks globales (`shared/hooks`) y configuración de terceros (`shared/lib`). No depende de `features/` ni de `app/`.
4. **Cliente HTTP único:** Toda comunicación de red pasa por `src/shared/api/httpClient.ts` (instancia configurada de Axios con manejo tipado de errores y timeouts).
