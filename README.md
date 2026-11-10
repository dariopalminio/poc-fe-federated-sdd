# poc-fe-federated-sdd

Frontend de la prueba de concepto de desarrollo guiado por especificaciones (SDD) con modelo federado. Este repositorio contiene la aplicación React y sus especificaciones locales, derivadas de las iniciativas del Hub de coordinación.

Actualmente incluye una página que consulta `GET /health` y muestra los estados de carga, servicio disponible o error.

## Stack del frontend

- **React y React DOM**: interfaz con componentes funcionales y hooks.
- **TypeScript**: tipado estático con modo estricto.
- **Vite y su plugin de React**: servidor de desarrollo y compilación para producción.
- **Vitest**: ejecución de pruebas.
- **React Testing Library**: pruebas de componentes desde la perspectiva del usuario.
- **jest-dom**: aserciones sobre el DOM en las pruebas.
- **jsdom**: entorno DOM para las pruebas.

Las dependencias y sus versiones se definen en [package.json](package.json).

La comunicación HTTP utiliza la API nativa `fetch`. La configuración de TypeScript tiene como objetivo ES2022.

## Requisitos y arranque

- Node.js `>=26`, según el manifiesto del proyecto.
- npm para ejecutar los comandos siguientes.
- Backend accesible para obtener una respuesta real de `/health`.

```powershell
npm install
npm run dev
```

Abre la URL que Vite indique en la terminal.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Comprueba los tipos con `tsc --noEmit` y genera la compilación en `dist/`. |
| `npm test` | Ejecuta Vitest en modo interactivo durante el desarrollo. |
| `npm test -- --run` | Ejecuta las pruebas una sola vez. |

## Conexión con el backend

Durante el desarrollo, Vite redirige las peticiones a `/health` hacia `http://localhost:3000`. Para utilizar otro destino, establece `HEALTH_API_PROXY_TARGET` antes de iniciar el servidor:

```powershell
$env:HEALTH_API_PROXY_TARGET = "http://localhost:8080"
npm run dev
```

Este proxy solo se aplica al servidor de desarrollo. En producción, el despliegue debe enrutar `/health` al backend, ya que el frontend utiliza una ruta relativa al mismo origen.

## Estructura

```text
src/
	App.tsx                  Componente raíz
	main.tsx                 Punto de entrada
	features/health/         Página de estado, cliente HTTP y pruebas
	test/setup.ts            Configuración de las pruebas
specs/001-health-page/     Especificación y artefactos de la funcionalidad
docs/templates/           Plantillas de documentación
```

## Modelo federado

- [Hub de coordinación](https://github.com/dariopalminio/poc-cross-hub-federated-sdd): iniciativas transversales y manifiestos de federación.
- [Backend](https://github.com/dariopalminio/poc-be-federated-sdd): proveedor y propietario canónico del contrato OpenAPI.
- Este frontend consume el contrato y mantiene su contribución local en [specs/001-health-page/spec.md](specs/001-health-page/spec.md), con la procedencia registrada en [specs/001-health-page/spec-origin.yaml](specs/001-health-page/spec-origin.yaml).

Las reglas de contribución y federación están en [AGENTS.md](AGENTS.md).