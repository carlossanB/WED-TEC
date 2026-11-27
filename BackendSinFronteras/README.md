# 🛡️ Backend Sin Fronteras — API de Consulta de Casos USCIS

Bienvenido a la documentación del backend de **Sin Fronteras**. Este servicio actúa como una API intermediaria, segura y desacoplada encargada de consultar el estado oficial de trámites migratorios ante el Servicio de Ciudadanía e Inmigración de Estados Unidos (**USCIS**), normalizar la respuesta y traducirla a un lenguaje claro y humano para los usuarios de la plataforma.

---

## 📋 Tabla de Contenidos

1. [Finalidad del Proyecto](#1-finalidad-del-proyecto)
2. [Stack Tecnológico y Herramientas](#2-stack-tecnológico-y-herramientas)
3. [Guía: Cómo registrarse y obtener credenciales en USCIS Developer Portal](#3-guía-cómo-registrarse-y-obtener-credenciales-en-uscis-developer-portal)
4. [Estructura del Proyecto](#4-estructura-del-proyecto)
5. [Instalación y Puesta en Marcha](#5-instalación-y-puesta-en-marcha)
6. [Módulos y Flujo Arquitectónico](#6-módulos-y-flujo-arquitectónico)
7. [Entornos: Sandbox vs. Producción](#7-entornos-sandbox-vs-producción)

---

## 1. Finalidad del Proyecto

La plataforma **Sin Fronteras** tiene como misión brindar orientación transparente y accesible a personas en procesos migratorios en EE. UU. 

Este backend tiene los siguientes objetivos específicos:
* **Consulta oficial sin intermediarios dudosos:** Conexión directa con la API oficial de USCIS mediante el protocolo seguro **OAuth 2.0 Client Credentials**.
* **Protección y Rate Limiting:** Control estricto de consultas por IP para evitar abusos o saturación del servicio.
* **Normalización y Traducción:** Recibe el estado técnico en inglés (ej: *"Card Was Delivered To Me By The Post Office"*, *"Case Was Received"*) y lo transforma en un formato estructurado en español con explicaciones de los siguientes pasos.
* **Desacoplamiento:** El frontend en React no conoce las credenciales gubernamentales (`Client Secret`); todo el intercambio sensible se gestiona de forma aislada en este servidor.

---

## 2. Stack Tecnológico y Herramientas

| Componente | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Entorno de ejecución** | **Node.js 22 LTS** | Estabilidad, compatibilidad con ES Modules nativos y alto rendimiento en operaciones I/O. |
| **Lenguaje** | **TypeScript 5.7+** | Tipado estático estricto para garantizar contratos de datos seguros entre backend y frontend. |
| **Framework Web** | **Fastify v5** | Framework de baja sobrecarga (*low overhead*), hasta 2 veces más rápido que Express y con soporte nativo de TypeScript. |
| **Control de Frecuencia** | **@fastify/rate-limit** | Regulación de consultas concurrentes y límites por IP en memoria. |
| **Seguridad de Orígenes** | **@fastify/cors** | Permite únicamente peticiones autorizadas desde la aplicación frontend de Sin Fronteras. |
| **Validación de Datos** | **Zod** | Validación rigurosa de formato de Números de Recibo (13 caracteres: 3 letras + 10 números). |
| **Gestión de Entorno** | **dotenv** | Carga segura de variables de configuración y credenciales secretas. |
| **Ejecución y Hot-Reload** | **tsx** | Ejecución directa de TypeScript sin paso de transpilación manual durante desarrollo. |
| **Gestor de Paquetes** | **pnpm** | Manejo rápido, eficiente y determinista de dependencias. |

---

## 3. Guía: Cómo registrarse y obtener credenciales en USCIS Developer Portal

Para interactuar con la **USCIS Case Status API**, se deben obtener credenciales oficiales emitidas por el gobierno federal de EE. UU.

### Paso 1: Crear cuenta en el portal
1. Ingresa al portal oficial: **[https://developer.uscis.gov](https://developer.uscis.gov)**.
2. En la esquina superior derecha, haz clic en **Sign In / Register**.
3. El sistema te redirigirá a **Login.gov** (el proveedor oficial de autenticación del gobierno de EE. UU.).
4. Si no tienes cuenta, créala con tu correo electrónico y configura la autenticación de dos factores (SMS o aplicación autenticadora).

### Paso 2: Crear la App de Desarrollo (Sandbox)
1. Una vez dentro del panel de desarrollador de USCIS, ve a la pestaña **"Apps"** o **"My Apps"**.
2. Haz clic en el botón **"Create New App"** (o *"Add Team App"*).
3. Completa los campos solicitados:
   * **App Name:** `SinFronterasAPI`
   * **Callback URL:** `http://localhost:3000/callback` (requerido por el formulario para el estándar OAuth).
   * **Description:** Breve descripción del propósito de orientación comunitaria.
   * **APIs:** Selecciona y marca el paquete **Case Status API - Sandbox** (ej. `first-case-sbox`).
4. Haz clic en **Save** o **Create**.

### Paso 3: Obtener tus llaves
En el detalle de la aplicación recién creada, copia tus claves:
* **Client ID** (o *Consumer Key*): Identificador público de tu aplicación.
* **Client Secret** (o *Consumer Secret*): Clave privada de autenticación.

### Paso 4: Configurar el archivo `.env`
Crea una copia del archivo `.env.example` con el nombre `.env` y agrega tus credenciales:

```env
PORT=3001
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:5173

# Credenciales oficiales de USCIS (Sandbox)
USCIS_CLIENT_ID=tu_client_id_aqui
USCIS_CLIENT_SECRET=tu_client_secret_aqui
USCIS_ENV=sandbox
```

---

## 4. Estructura del Proyecto

```text
BackendSinFronteras/
├── src/
│   ├── modules/
│   │   └── uscis/            # Servicio de conexión OAuth 2.0 y consumo de API USCIS (próximo)
│   ├── shared/               # Tipos TypeScript, esquemas Zod y utilidades (próximo)
│   └── server.ts             # Punto de entrada Fastify, middleware de CORS y Rate Limiting
├── .env                      # Variables de entorno locales (ignorado en Git)
├── .env.example              # Plantilla pública de variables requeridas
├── .gitignore                # Archivos excluidos del control de versiones
├── package.json              # Definición de scripts y dependencias
├── pnpm-workspace.yaml       # Configuración de compilación para pnpm
├── README.md                 # Documentación técnica del proyecto
└── tsconfig.json             # Configuración del compilador de TypeScript
```

---

## 5. Instalación y Puesta en Marcha

### Prerrequisitos:
* **Node.js**: v20 o superior (Recomendado: Node.js 22 LTS).
* **pnpm**: v9 o v11 (`npm install -g pnpm`).

### Comandos:

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Iniciar servidor en modo desarrollo (Hot-Reload):**
   ```bash
   pnpm dev
   ```
   *El servidor quedará escuchando en `http://localhost:3001`.*

3. **Verificar que el servidor está respondiendo:**
   Abre tu navegador o envía un `curl` a:
   ```bash
   curl http://localhost:3001/health
   ```
   Respuesta esperada:
   ```json
   {
     "status": "ok",
     "service": "backend-sin-fronteras",
     "timestamp": "2026-10-30T..."
   }
   ```

4. **Compilar para producción:**
   ```bash
   pnpm build
   ```

5. **Ejecutar versión compilada:**
   ```bash
   pnpm start
   ```

---

## 6. Módulos y Flujo Arquitectónico

El backend sigue un patrón modular desacoplado:

```
[Cliente Frontend (React / Vite)]
              │  Petición POST /api/uscis/check { receiptNumber: "IOE0912345678" }
              ▼
[Rate Limiting Layer (@fastify/rate-limit)]
              │  Verifica límite por IP (ej. máx. 3 consultas/minuto)
              ▼
[Validation Layer (Zod)]
              │  Valida que el número tenga 13 caracteres (3 letras + 10 dígitos)
              ▼
[UscisService Module]
              │  1. Gestiona token Bearer en memoria (OAuth 2.0 Client Credentials)
              │  2. Si el token expiró, solicita uno nuevo a api.uscis.gov
              │  3. Llama al endpoint /case-status/{receiptNumber}
              ▼
[Response Normalizer]
              │  Transforma el JSON de USCIS a esquema limpio en español
              ▼
[Respuesta JSON al Frontend]
```

---

## 7. Entornos: Sandbox vs. Producción

* **Sandbox (Pruebas):**
  * Diseñado para desarrollo e integración.
  * Por regulaciones de privacidad de la Ley Federal de Privacidad de EE. UU., el Sandbox **no consulta casos reales**.
  * Utiliza números de recibo predeterminados provistos por la documentación de USCIS para simular respuestas (caso aprobado, caso en revisión, solicitud de evidencia RFE, etc.).
* **Producción:**
  * Requiere enviar la solicitud de pase a producción desde el portal de desarrolladores explicando el uso de la aplicación.
  * Permite consultar números de recibo reales en tiempo real.

