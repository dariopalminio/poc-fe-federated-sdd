# Feature Specification: Health Page

**Feature Branch**: `No creado: no existe hook before_specify`

**Created**: 2026-11-09

**Status**: Draft

**Input**: User description: "Inicialización y derivación trazable de la spec hija desde la spec padre specs\001-health-status. Abarca preparar el repositorio, fijar la revisión de la iniciativa, crear origin.yaml, derivar la spec local y validar su correspondencia con el manifiesto padre."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar el estado en la página (Priority: P2)

Como usuario de la aplicación, quiero ver el estado recibido del servicio para comprobar su disponibilidad sin realizar manualmente una consulta.

**Why this priority**: La página es la contribución Frontend asignada por la iniciativa y depende de que el servicio proporcione un resultado.

**Independent Test**: Abrir la página con el servicio disponible y verificar que muestra el estado recibido; repetir con una consulta pendiente, fallida o inválida.

**Acceptance Scenarios**:

1. **Given** que el servicio devuelve una respuesta satisfactoria, **When** el usuario consulta la página, **Then** la página muestra el estado recibido.
2. **Given** que la consulta sigue pendiente, **When** el usuario consulta la página, **Then** la página no indica que el servicio está saludable.
3. **Given** que la consulta falla o su respuesta no es válida, **When** la página presenta el resultado, **Then** comunica que el estado no está disponible y no presenta `ok` como estado actual.

### Edge Cases

- El servicio no está disponible y no se debe reutilizar un estado `ok` anterior como resultado vigente.
- La respuesta no contiene el estado esperado y no se debe presentar como comprobación satisfactoria.
- La consulta aún está pendiente y no se debe comunicar un estado saludable antes de recibir una respuesta satisfactoria.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-004**: La página MUST consultar el estado del servicio y mostrar el valor recibido cuando la respuesta sea satisfactoria.
- **FR-005**: La página MUST distinguir una consulta pendiente o fallida de una respuesta satisfactoria y MUST NOT indicar que el servicio está saludable si no recibió un resultado satisfactorio vigente.

### Key Entities *(include if data involved)*

- **Resultado de salud**: Estado recibido del servicio y presentado al usuario cuando la respuesta es satisfactoria.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-002**: En todas las comprobaciones satisfactorias de la página, el valor mostrado coincide con el estado recibido del servicio.
- **SC-003**: En todas las comprobaciones con consulta pendiente, fallida o inválida, la página no comunica `ok` como estado actual del servicio.

## Assumptions

- Esta contribución cubre únicamente los requisitos centrales **FR-004** y **FR-005**, asignados al rol `frontend-health`; los requisitos del endpoint y del contrato canónico quedan fuera de esta spec hija.
- El Backend proporciona el servicio de salud y es el propietario del contrato compartido. El manifiesto de origen declara `shared_contracts: []`, por lo que esta derivación no fija una revisión del contrato ni afirma alineación contractual.
- La página forma parte de la aplicación Frontend y presenta el estado a sus usuarios; esta spec no prescribe detalles de presentación.