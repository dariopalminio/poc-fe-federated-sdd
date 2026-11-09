---
description: "Tareas para implementar la página de estado de salud"
---

# Tasks: Health Page

**Input**: Design documents from `/specs/001-health-page/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/health-page-ui.md`, `quickstart.md`

**Tests**: La constitución requiere al menos una prueba unitaria de componente para cambios de comportamiento. La prueba se escribe antes de la implementación.

**Organization**: Las tareas se agrupan por la única historia local. El manifiesto padre asigna esta contribución al rol `frontend-health`, requisitos `FR-004` y `FR-005`.

## Formato

- `[P]`: puede ejecutarse en paralelo con tareas de archivos distintos y sin dependencias pendientes.
- `[US1]`: tarea perteneciente a la historia de usuario local 1.
- Las tareas describen archivos exactos y dependencias cuando aplican.

## Phase 1: Setup

**Propósito**: Inicializar la SPA React con herramientas y scripts fijados por lockfile.

- [X] T001 [P] Crear `package.json` con Node.js `>=26`, React, React DOM, TypeScript, Vite, Vitest, jsdom, React Testing Library y scripts `dev`, `build` y `test`; generar `package-lock.json` con las versiones resueltas.
- [X] T002 [P] Configurar TypeScript estricto para React en `tsconfig.json`.
- [X] T003 [P] Crear `index.html` con el elemento raíz de la SPA.
- [X] T004 [P] Configurar Vite y Vitest, entorno jsdom y el archivo de preparación en `vite.config.ts`.

---

## Phase 2: Foundational

**Propósito**: Preparar el montaje React y la infraestructura de pruebas antes del comportamiento de la historia.

- [X] T005 [P] Configurar los matchers de React Testing Library en `src/test/setup.ts`.
- [X] T006 [P] Crear el punto de entrada y la aplicación base en `src/main.tsx` y `src/App.tsx`.
- [X] T007 Verificar que la SPA base compila mediante `npm run build` definido en `package.json`.

**Checkpoint**: El scaffold compila y la configuración de pruebas está lista; aún no existe comportamiento de estado de salud.

---

## Phase 3: User Story 1 - Consultar el estado en la página (Priority: P2)

**Goal**: Consultar el servicio de salud y presentar el valor recibido solo tras una respuesta satisfactoria, distinguiendo carga y error.

**Independent Test**: Con `fetch` simulado, verificar la vista pendiente, mostrar `ok` ante HTTP exitoso con `{ "status": "ok" }`, y mostrar indisponibilidad ante HTTP fallido o respuesta inválida sin presentar `ok`.

### Tests for User Story 1

- [X] T008 [US1] Escribir en `src/features/health/HealthPage.test.tsx` pruebas de carga, éxito, error HTTP, error de red, JSON inválido y cuerpo sin `status: "ok"`; añadir en `src/features/health/HealthPage.tsx` solo un componente mínimo para que las pruebas ejecuten y fallen por las aserciones de comportamiento antes de implementar la solución.

### Implementation for User Story 1

- [X] T009 [P] [US1] Implementar `fetchHealthStatus(signal?: AbortSignal): Promise<"ok">` en `src/features/health/healthApi.ts`; consultar `/health`, exigir respuesta HTTP satisfactoria y validar el cuerpo exacto del contrato sin copiar el esquema OpenAPI.
- [X] T010 [P] [US1] Implementar en `src/features/health/HealthPage.tsx` los estados de carga, éxito y error usando `fetchHealthStatus`; cancelar la petición al desmontar y no mostrar un estado saludable en carga o error.
- [X] T011 [US1] Integrar `HealthPage` en `src/App.tsx` y renderizarla desde `src/main.tsx`.

**Checkpoint**: La historia local funciona de forma independiente y satisface `FR-004`, `FR-005`, `SC-002` y `SC-003`.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Propósito**: Actualizar la guía de validación y comprobar el incremento completo.

- [X] T012 Actualizar `specs/001-health-page/quickstart.md` con los scripts ya configurados, el proxy same-origin `/health` y los resultados esperados por estado.
- [X] T013 Ejecutar `npm run test -- --run` y `npm run build` desde `package.json`, resolver fallos y registrar en `specs/001-health-page/quickstart.md` los resultados observados.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001-T004 no dependen entre sí; pueden ejecutarse en paralelo al crear archivos distintos.
- **Foundational (Phase 2)**: T005 y T006 dependen del scaffold y pueden ejecutarse en paralelo; T007 requiere completar T001-T006 y bloquea la historia.
- **User Story 1 (Phase 3)**: T008 inicia la historia después de T007. T009 y T010 empiezan después de T008 y pueden paralelizarse porque usan archivos distintos y comparten la firma `fetchHealthStatus` declarada arriba. T011 requiere T009 y T010.
- **Polish (Phase 4)**: T012 requiere completar T011; T013 requiere T012.

### User Story Dependencies

- **US1 (P2)**: después de Setup y Foundational; no depende de otras historias locales.

### Parallel Opportunities

- **Setup**: T001, T002, T003 y T004 son paralelizables por trabajar en archivos distintos.
- **Foundation**: T005 y T006 son paralelizables después de Setup.
- **US1**: después de completar T008 y verificar el fallo inicial, T009 y T010 pueden implementarse en paralelo usando la firma compartida definida en sus tareas.
- **Polish**: T012 y T013 son secuenciales porque la validación debe seguir la guía actualizada.

### Parallel Example: User Story 1

```text
Después de T008:
T009: Implementar fetchHealthStatus(signal?: AbortSignal): Promise<"ok"> en src/features/health/healthApi.ts
T010: Implementar estados visibles y cancelación en src/features/health/HealthPage.tsx
Luego ejecutar T011 para integrar ambos archivos en src/App.tsx.
```

## Implementation Strategy

### MVP First

1. Completar Setup y Foundation.
2. Escribir primero las pruebas de US1 y confirmar que fallan.
3. Implementar la petición y la interfaz; integrar la página.
4. Ejecutar prueba de componente y build, y validar los escenarios del quickstart.

La única historia local es `US1` (prioridad P2 en la iniciativa). Completarla entrega el MVP de esta contribución Frontend; no incluye el endpoint ni el contrato, propiedad del Backend.

## Notes

- El contrato canónico es propiedad del Backend y está fijado por el manifiesto padre; no crear una copia OpenAPI autoritativa en este repositorio.
- Los scripts mencionados se configuran en T001. No existen ni se consideran ejecutables antes de completar el scaffold.
- La discrepancia temporal en la spec padre está anotada en la checklist local y queda fuera del alcance de estas tareas.