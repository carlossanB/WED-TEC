# 🌐 Sin Fronteras - Plataforma de Orientación Migratoria

Bienvenido a la documentación oficial de **Sin Fronteras**. Este repositorio contiene la aplicación web / landing page interactiva desarrollada para brindar orientación, asesoría e información clara y humana sobre servicios legales y trámites migratorios (asilo, permisos de trabajo, peticiones familiares, defensa en corte, ajuste de estatus, visas humanitarias, entre otros).

---

## 📋 Tabla de Contenidos
- [1. ¿De qué trata el proyecto?](#1-de-qué-trata-el-proyecto)
- [2. Stack Tecnológico](#2-stack-tecnológico)
- [3. Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
- [4. Requisitos del Sistema](#4-requisitos-del-sistema)
- [5. Guía de Instalación y Ejecución (Paso a Paso)](#5-guía-de-instalación-y-ejecución-paso-a-paso)
- [6. Scripts Disponibles](#6-scripts-disponibles)
- [7. Buenas Prácticas y Estructura de Estilos](#7-buenas-prácticas-y-estructura-de-estilos)

---

## 1. ¿De qué trata el proyecto?

**Sin Fronteras** es una plataforma web moderna y accesible diseñada para guiar a personas y familias en sus procesos migratorios en Estados Unidos.

### Principales Funcionalidades:
- **Hero Interactivo & Atajos Rápidos (`NeedShortcuts`):** Permite al usuario encontrar soluciones directas según su necesidad inmediata (asilo, permiso de trabajo, unión familiar, citas en corte, etc.).
- **Catálogo de Servicios Detallados (`FeaturedServices`):** Tarjetas interactivas que abren un modal accesible (`<dialog>`) con detalles específicos del trámite y llamada a la acción.
- **Flujo de Proceso Guiado (`ProcessSteps`):** Explicación secuencial de cómo se acompaña al usuario en cada etapa de su caso.
- **Secciones de Confianza y Testimonios:** Indicadores de transparencia y experiencias reales de usuarios.
- **Preguntas Frecuentes (`FAQ`):** Acordeones interactivos para resolver dudas comunes.
- **Soporte de Tema Claro / Oscuro (`ThemeToggle`):** Adaptabilidad visual y preferencia de accesibilidad.
- **Animaciones Suaves y Scroll-Reveal:** Integración con **GSAP** y la API nativa de `IntersectionObserver` para una experiencia visual dinámica y moderna.

---

## 2. Stack Tecnológico

El proyecto está construido con herramientas modernas del ecosistema frontend:

| Área / Herramienta | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Lenguaje** | **TypeScript 5.7+** | Tipado estático fuerte para garantizar solidez y prevenir errores. |
| **Librería UI** | **React 19** | Biblioteca de interfaz declarativa basada en componentes funcionales y Hooks. |
| **Empaquetador & Dev Server** | **Vite 8** | Servidor de desarrollo ultra rápido con Hot Module Replacement (HMR). |
| **Estilos & CSS** | **Tailwind CSS v4** + CSS Tokens | Integración con `@tailwindcss/vite`, variables CSS nativas (`tokens.css`) y soporte nativo de modo oscuro. |
| **Animaciones** | **GSAP 3.15+** & IntersectionObserver | Animaciones de elementos hero, barras de progreso y scroll-reveal dinámico. |
| **Gestor de Paquetes** | **pnpm** (compatible con npm / yarn) | Instalación rápida y eficiente de dependencias. |
| **Formateo de Código** | **oxfmt** | Formateador de código ultra rápido. |
| **Versionador de Entorno** | **mise** (`.mise.toml`) | Control de versiones fijas para Node.js y pnpm. |

---

## 3. Arquitectura del Proyecto

El código fuente sigue una **arquitectura modular basada en componentes y separación de responsabilidades (Component-Driven Architecture)** dentro del directorio `FrontEnd/`:

```text
Sin Fronteras/
├── .git/
└── FrontEnd/
    ├── .mise.toml               # Configuración de versiones (Node 22, pnpm 10)
    ├── index.html               # Shell HTML principal y punto de anclaje (#root)
    ├── package.json             # Dependencias y scripts del proyecto
    ├── tsconfig.json            # Configuración de compilación TypeScript
    ├── vite.config.ts           # Configuración de plugins de Vite (React, Tailwind v4, alias @)
    └── src/
        ├── main.tsx             # Punto de entrada de React que monta la aplicación
        ├── index.css            # Importación global de Tailwind CSS y estilos base
        ├── app/
        │   ├── App.tsx          # Componente raíz: orquestación de layout, modales y observadores
        │   └── routes.ts        # Enrutamiento lógico y constantes de navegación
        ├── components/
        │   ├── layout/          # Componentes estructurales globales
        │   │   ├── Header.tsx   # Barra de navegación principal y accesos rápidos
        │   │   ├── Footer.tsx   # Pie de página con enlaces y derechos
        │   │   └── MobileMenu.tsx # Menú responsive desplegable
        │   ├── sections/        # Secciones modulares de la Landing Page
        │   │   ├── Hero.tsx
        │   │   ├── NeedShortcuts.tsx
        │   │   ├── FeaturedServices.tsx
        │   │   ├── ProcessSteps.tsx
        │   │   ├── TrustSection.tsx
        │   │   ├── Testimonials.tsx
        │   │   ├── FAQ.tsx
        │   │   └── FinalCTA.tsx
        │   └── ui/              # Componentes atómicos y reutilizables
        │       ├── Accordion.tsx
        │       ├── Button.tsx
        │       ├── Icon.tsx
        │       ├── SectionHeading.tsx
        │       ├── ServiceCard.tsx
        │       └── ThemeToggle.tsx
        ├── data/                # Capa de datos desacoplada (JSON/TS)
        │   ├── services.ts      # Listado de servicios y categorías
        │   ├── faq.ts           # Preguntas y respuestas frecuentes
        │   └── navigation.ts   # Enlaces de contacto y menú
        ├── hooks/               # Custom Hooks reutilizables
        │   ├── useHeroAnimation.ts    # Animación de entrada con GSAP
        │   └── useProcessProgress.ts  # Progreso interactivo de pasos
        ├── styles/              # Design System Tokens
        │   ├── tokens.css       # Variables de color, radios, tipografías y tema
        │   └── globals.css      # Reglas CSS globales y utilitarias
        └── types/               # Definiciones de TypeScript e interfaces
            └── content.ts       # Modelos de datos (Service, FAQItem, etc.)
```

---

## 4. Requisitos del Sistema

Antes de iniciar, asegúrate de tener instalado en tu entorno:

1. **Node.js**: Versión `20.x` o superior (Recomendado: **Node.js 22 LTS**).
   - Verifica tu versión con: `node -v`
2. **Gestor de Paquetes**: **pnpm** (versión recomendada 9.x o 10.x).
   - Alternativamente, puedes usar **npm** (incluido con Node) o **yarn**.
   - Para instalar `pnpm` globalmente si no lo tienes:
     ```bash
     npm install -g pnpm
     ```
3. **Navegador Web Moderno**: Google Chrome, Mozilla Firefox, Microsoft Edge o Safari con soporte para JavaScript ES Modules y CSS moderno.

---

## 5. Guía de Instalación y Ejecución (Paso a Paso)

Sigue estos pasos para levantar el proyecto en tu entorno local:

### Paso 1: Abrir la terminal y navegar a la carpeta del frontend
Abre tu terminal favorita (PowerShell, Git Bash o CMD en Windows; Terminal en macOS/Linux) y sitúate en el directorio `FrontEnd`:

```bash
cd "c:/Users/jonns/OneDrive/Escritorio/Sin Fronteras/FrontEnd"
# O si ya estás en la raíz del proyecto:
cd FrontEnd
```

### Paso 2: Instalar las dependencias
Ejecuta el comando correspondiente al gestor de paquetes que estés utilizando:

* Con **pnpm** (recomendado):
  ```bash
  pnpm install
  ```

* Con **npm**:
  ```bash
  npm install
  ```

### Paso 3: Iniciar el servidor de desarrollo
Una vez finalizada la instalación de dependencias, ejecuta:

* Con **pnpm**:
  ```bash
  pnpm dev
  ```

* Con **npm**:
  ```bash
  npm run dev
  ```

### Paso 4: Abrir la aplicación en el navegador
La consola mostrará una URL similar a:
```text
  VITE v8.0.5  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Haz clic en el enlace o abre tu navegador y entra a `http://localhost:5173`.

---

## 6. Scripts Disponibles

En el directorio `FrontEnd/`, puedes ejecutar los siguientes scripts:

| Comando (pnpm) | Comando (npm) | Acción |
| :--- | :--- | :--- |
| `pnpm dev` | `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente (HMR). |
| `pnpm build` | `npm run build` | Compila el proyecto con TypeScript y genera el paquete de producción optimizado en `dist/`. |
| `pnpm preview` | `npm run preview` | Levanta un servidor local para previsualizar el build de producción antes de desplegar. |
| `pnpm format` | `npm run format` | Ejecuta el formateador `oxfmt` para estandarizar el estilo del código. |

---

## 7. Buenas Prácticas y Estructura de Estilos

- **Tailwind CSS v4:** Configurado mediante `@tailwindcss/vite`. No requiere archivo `tailwind.config.js` tradicional; la personalización de temas se define directamente en `src/index.css` y `src/styles/tokens.css`.
- **Accesibilidad (a11y):** Incluye enlaces de salto rápido (`skip-link`), atributos `aria-*` adecuados y etiquetas semánticas para lectores de pantalla.
- **Rendimiento:** Las animaciones se ejecutan mediante transformaciones aceleradas por hardware (GSAP y CSS Transitions) con desconexión automática de observadores tras activarse.
