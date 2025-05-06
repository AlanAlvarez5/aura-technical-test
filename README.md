# Prueba Técnica Aura

## Descripción

Este proyecto es una prueba técnica para Aura que implementa una aplicación web utilizando tecnologías modernas de desarrollo front-end. La aplicación demuestra habilidades en el manejo de componentes, estado, consumo de APIs y diseño responsivo.

La aplicación es un portal para la asistencia en investigación aumentada (Augmented Universal Research Assistant - AURA) que permite a los usuarios buscar información sobre empresas, gestionar proyectos de investigación y utilizar herramientas de inteligencia artificial para analizar datos.

## Tecnologías Utilizadas

- React.js
- TypeScript
- Ant Design para componentes UI
- Vite como bundler y entorno de desarrollo
- OpenAI API para funcionalidades de IA (GPT-4o-mini)
- Anthropic API (Claude-3-7-sonnet) como alternativa de IA
- React Router para navegación
- GitHub Actions para CI/CD

## Características Principales

- **Autenticación de usuarios**: Sistema de login seguro
- **Dashboard interactivo**: Visualización clara de datos y opciones
- **Búsqueda de empresas**: Integración con Financial Modeling Prep API
- **Asistente IA**: Capacidad de interactuar con modelos de IA avanzados
- **Gestión de proyectos**: Formulario para la creación y carga de proyectos de investigación
- **Diseño responsive**: Interfaz optimizada para diferentes dispositivos

## Requisitos Previos

- Node.js (v18.0.0 o superior)
- npm (v8.0.0 o superior) o yarn

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
# Con npm
npm install

# Con yarn
yarn install
```

## Variables de Entorno

Para ejecutar correctamente el proyecto, necesitas configurar las siguientes variables de entorno en un archivo `.env`:

```
VITE_FMP_API_KEY=tu_api_key
VITE_FMP_HOST=host_de_fmp
VITE_OPEN_AI_API_KEY=tu_clave_api_openai
VITE_ANTHROPIC_API_KEY=tu_clave_api_anthropic
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
# Con npm
npm run dev

# Con yarn
yarn dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## Construcción

Para construir la aplicación para producción:

```bash
# Con npm
npm run build

# Con yarn
yarn build
```

Los archivos compilados estarán disponibles en la carpeta `/dist`.

## Despliegue

El proyecto está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions. Cada vez que se realiza un push a la rama `main`, se ejecuta el workflow de despliegue definido en `.github/workflows/deploy.yml`.

La aplicación desplegada estará disponible en la URL: `https://<tu-usuario>.github.io/aura-technical-test/`

## Estructura del Proyecto

```
/src
  /components          # Componentes reutilizables
    /auth              # Componentes de autenticación
    /dashboard         # Componentes específicos del dashboard
    /shared            # Componentes compartidos en múltiples vistas
  /pages               # Páginas o vistas principales
    Dashboard.tsx      # Página principal del dashboard
    Login.tsx          # Página de inicio de sesión
    AuraAi.tsx         # Interfaz del asistente de IA
    NotFound.tsx       # Página 404
  /utils               # Funciones utilitarias y clientes API
    AnthropicApiClient.ts   # Cliente para API de Anthropic/Claude
    OpenAIApiClient.ts      # Cliente para API de OpenAI
    FMPApiClient.ts         # Cliente para Financial Modeling Prep API
    Validations.ts          # Funciones de validación
  /context             # Contextos de React
    Auth.tsx           # Contexto de autenticación
  /assets              # Imágenes, iconos, etc.
    /icons             # Iconos SVG
    /logo              # Logos de la aplicación
    /images            # Imágenes generales
    /hero              # Imágenes de hero banner
```

## Flujo de la Aplicación

1. **Login**: El usuario accede con sus credenciales (email/password)
2. **Dashboard**: Visualiza opciones principales y puede:
   - Buscar empresas usando la API de Financial Modeling Prep
   - Crear nuevos proyectos de investigación
   - Acceder al asistente de IA
3. **Asistente IA**: Interactúa con modelos de lenguaje avanzados para obtener información

## Características Implementadas

- **Sistema de Autenticación**: Login con validación de campos y persistencia en localStorage.
- **Dashboard**: Panel principal con búsqueda de empresas, visualización de proyectos y datos.
- **Modal de Carga de Proyectos**: Formulario interactivo para subir nuevos proyectos con validación.
- **Asistente IA (Aura AI)**: Integración con dos proveedores de IA:
  - OpenAI (utilizando la API de chat y generación de texto)
  - Anthropic/Claude (como alternativa)
- **Navegación**: Sistema de rutas protegidas y públicas mediante React Router.
- **Diseño Corporativo**: Interfaz que sigue los lineamientos de diseño de Aura.

## Decisiones Técnicas

- **Ant Design**: Se eligió por su amplio ecosistema de componentes, facilidad de personalización y estética profesional.
- **Vite**: Seleccionado por su velocidad de desarrollo y optimización en producción.
- **Clientes API Modular**: Se implementaron clientes separados para cada proveedor de IA, facilitando el cambio entre ellos sin afectar el resto de la aplicación.
- **Contexto de Autenticación**: Implementación de React Context para manejar el estado global de autenticación.
- **Rutas Protegidas**: Implementación de HOC para proteger rutas que requieren autenticación.
- **GitHub Actions**: Automatización del despliegue con manejo seguro de variables de entorno.

## Mejoras Futuras

- **Integración de Backend**: Desarrollo de un backend real para sustituir el mock de usuarios.
- **Gestión de Estado Avanzada**: Implementación de Redux o Zustand para manejar estados complejos.
- **Sistema de Caché**: Para reducir llamadas a las APIs de IA y mejorar rendimiento.
- **Testing Automatizado**: Implementación de tests unitarios y e2e con Jest y Cypress.
- **PWA**: Convertir la aplicación en Progressive Web App para mejor experiencia móvil.
- **Accesibilidad**: Mejoras en la accesibilidad siguiendo estándares WCAG.
- **Modo Oscuro**: Implementación de tema claro/oscuro.
- **Internacionalización**: Soporte para múltiples idiomas.
- **Optimización de Rendimiento**: Implementación de lazy loading, memoización y optimización de renderizado.

## Consideraciones de Seguridad

- Las claves API nunca se exponen en el cliente, se utilizan variables de entorno en tiempo de compilación.
- Se implementan validaciones en el frontend, aunque en un entorno real se requerirían validaciones adicionales en el backend.
- Las contraseñas de usuarios no se almacenan en texto plano (aunque este proyecto usa un mock de usuarios).

## Contacto

Para cualquier pregunta relacionada con este proyecto, por favor contactar a [Alan] en [alan@gmail.com].

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.
