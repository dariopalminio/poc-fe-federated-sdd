# Implementation Plan: Health Page

**Branch**: `001-health-page` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Derivación de la contribución Frontend `FR-004` y `FR-005` de la iniciativa `001-health-status`.

**Estado**: Propuesta de diseño lista para revisión; la aplicación Frontend aún no está inicializada.

## Summary

Inicializar una aplicación React de una sola página que consulte el contrato Backend `health-api` y muestre `ok` solo después de recibir una respuesta HTTP satisfactoria con el cuerpo válido. La interfaz distinguirá carga, éxito y error, sin persistir ni reutilizar resultados anteriores. El contrato se consume en modo lectura; no se copiará como definición autoritativa en este repositorio.

## Technical Context

**Language/Version**: TypeScript y React; fijar versiones exactas en el manifiesto al inicializar. Node.js `>=26` propuesto, alineado con el Backend.

**Primary Dependencies**: React, React DOM, Vite, TypeScript, Vitest y React Testing Library; aún no instaladas en este repositorio.

**Storage**: N/A según el alcance de la spec.

**Testing**: Prueba unitaria de componente con Vitest y React Testing Library, obligatoria según la constitución; la configuración todavía debe añadirse.

**Target Platform**: Navegadores web; el dominio de despliegue no está definido.

**Project Type**: SPA React.

**Performance Goals**: No se requieren objetivos adicionales para esta página en la spec padre.

**Constraints**: Limitarse a `FR-004` y `FR-005`; consumir el contrato Backend `health-api` en `44ff3c4576062262370b4f7798b24e1eddc2abde`; no añadir autenticación ni una copia autoritativa local del OpenAPI. Usar `/health` same-origin; en desarrollo, Vite lo proxifica a `http://localhost:3000` o al destino configurado por `HEALTH_API_PROXY_TARGET`.

**Scale/Scope**: Una página, un endpoint y una consulta al montar; sin polling, reintentos, almacenamiento ni gestión global de estado.

## Constitution Check

*GATE: Debe pasar antes de Fase 0. Resultado: PASS; re-evaluado después del diseño.*

| Principio | Resultado | Evidencia |
|-----------|-----------|-----------|
| I. Alcance federado y autoridad | PASS | La spec local se limita al alcance Frontend `FR-004`/`FR-005` del manifiesto fijado. |
| II. Trazabilidad inmutable | PASS | `origin.yaml` fija el commit Hub `a1c8a5a8b45c4a12d3a15541e3c2a559bb4802e9`, que contiene spec y manifiesto; ambos requisitos coinciden con el alcance declarado. |
| III. Propiedad del contrato API | PASS | El manifiesto fija `health-api` en el repositorio Backend y en el commit `44ff3c4576062262370b4f7798b24e1eddc2abde`; el archivo resuelve y define `GET /health`. |
| IV. Responsabilidad local | PASS | El Frontend consume el contrato; no cambia el Hub ni mantiene una definición autoritativa alternativa. |
| V. Verificación basada en evidencia | PASS para el diseño | Se verificaron los SHA, las rutas, el rol, el alcance y la respuesta OpenAPI. Las pruebas de la página quedan pendientes de implementación. |
| VI. Pruebas de componentes obligatorias | PASS por planificación | La estructura incluye una prueba de componente con casos de carga, éxito, error y respuesta inválida; deberá ejecutarse antes de completar la implementación. |

**Nota de coordinación**: La spec padre aún conserva una suposición temporal que indica que la revisión del contrato está pendiente. El manifiesto más reciente ya fija el contrato; se señaló esta discrepancia en la checklist local para que el Hub la reconcilie en una revisión posterior.

## Phase 0: Research

Las decisiones, alternativas y evidencia se registran en [research.md](research.md). Los puntos abiertos sobre estructura de aplicación se resuelven como decisiones de bootstrap; las versiones exactas se fijarán en el manifiesto de dependencias durante implementación.

## Phase 1: Design & Contracts

- [data-model.md](data-model.md) define los estados efímeros y las transiciones de la consulta.
- [contracts/health-page-ui.md](contracts/health-page-ui.md) define los resultados visibles sin duplicar el contrato HTTP del Backend.
- [quickstart.md](quickstart.md) documenta escenarios y comandos planeados; aún no son ejecutables porque falta inicializar la aplicación.

## Project Structure

### Documentación de esta funcionalidad

```text
specs/001-health-page/
├── spec.md
├── origin.yaml
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/health-page-ui.md
└── tasks.md                 # Se genera en la fase de tareas
```

### Código fuente propuesto (aún no existe en el checkout)

```text
package.json
package-lock.json
index.html
vite.config.ts
tsconfig.json
src/
├── main.tsx
├── App.tsx
├── features/health/
│   ├── HealthPage.tsx
│   ├── healthApi.ts
│   └── HealthPage.test.tsx
└── test/setup.ts
```

**Decisión de estructura**: SPA pequeña con una página y un módulo de consumo local al feature. Vite compila la aplicación y proxifica `/health` al Backend local para evitar depender de CORS; Vitest y React Testing Library verifican el comportamiento del componente. Esta estructura y sus herramientas son decisiones del plan.

## Complexity Tracking

No hay violaciones de la constitución ni justificación de complejidad adicional.