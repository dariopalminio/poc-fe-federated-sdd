# Instrucciones para agentes

## Estado del repositorio

- Este checkout contiene actualmente la estructura inicial de Spec Kit, no un backend implementado: no hay código fuente de la aplicación, manifiesto de dependencias, configuración de pruebas ni workflow de CI.
- La constitución de Spec Kit en `.specify/memory/constitution.md` sigue siendo una plantilla. No consideres sus principios de ejemplo ni sus opciones tecnológicas como políticas aprobadas del proyecto.
- La configuración inicializada de Spec Kit usa la integración de Copilot y scripts de PowerShell. Sigue las skills y el workflow disponibles en el repositorio; no des por sentada otra integración o shell.

## Propósito del proyecto

 Este repo es parte de una PoC para implementar la estrategia Initiative-First / Modelo Federado y Derivación Jerárquica de Especificaciones sobre un ecosistema polyrepo mediante GitHub Spec Kit, donde una Iniciativa Central (spec Épica de negocio transversal) vive en un Hub de Coordinación (poc-cross-hub-federated-sdd) y cada repositorio de código como este deriva mecánicamente su propia especificación local (spec.md), y sus documentos derivados como su plan técnico (plan.md) y su desglose de ejecución (tasks.md), gobernados por contratos de datos inmutables con dueño explícito.

## La aplicación

La aplicación consta de un frontend en react (este repositorio) y un backend que se cordinan con un contrato OpenApi.

## Convenciones generales

Topología de Repositorios y Separación de Planos
Se desacopla formalmente el Plano de Coordinación Estratégico del Plano de Ejecución Técnico:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HUB CENTRAL DE INICIATIVAS                           │
│   (poc-cross-hub-federated-sdd: specs transversales, contratos y orquestación)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Derivación Declarativa (Punteros)
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│  REPO SATÉLITE 1 (Producer)      │        │  REPO SATÉLITE 2 (Consumer)      │
│  poc-be-federated-sdd            │◄───────┤  poc-fe-federated-sdd (este repositorio) │
│  - Dueño del contrato API        │  Open  │  - Consume contrato API          │
│  - Spec, Plan y Tasks locales    │  API   │  - Spec, Plan y Tasks locales    │
│  - Código fuente Backend         │        │  - Código fuente Frontend        │
└──────────────────────────────────┘        └──────────────────────────────────┘
```

### Repositorios

Frontend (este repositorio frontend consumidor): https://github.com/dariopalminio/poc-fe-federated-sdd
Backend (repositorio proveedor): https://github.com/dariopalminio/poc-be-federated-sdd
Hub (repositorio transversal): https://github.com/dariopalminio/poc-cross-hub-federated-sdd

## Reglas de federación

- Consulta [AGENTS.template.md](AGENTS.template.md) para conocer el contrato completo de federación, los roles de los repositorios y los requisitos de entrega.
- Antes de derivar o modificar una especificación local de una funcionalidad, localiza la especificación principal y `links-manifest.yaml` en el mismo commit inmutable del Hub. Usa esa entrada del manifiesto para verificar el rol de este repositorio, la ruta de la especificación local y el alcance de los requisitos.
- Mantén `origin.yaml` junto a la especificación local y fija el SHA completo del commit de origen. Si no se pueden verificar la revisión principal, el alcance o el contrato compartido, detente e informa del bloqueo; no hagas suposiciones ni afirmes que existe alineación.
- Este repositorio consume el contrato OpenAPI; el Backend es su propietario canónico. Los consumidores deben usar la revisión inmutable exacta que declara el manifiesto principal.

### Contratos OpenAPI y rutas canónicas

- Cada contrato compartido entre repositorios MUST tener una única copia canónica en el repositorio propietario y en la ruta declarada por el manifiesto del Hub. Las specs y los planes pueden referenciarla, pero no mantener copias autoritativas alternativas.
- El plan de una funcionalidad que use o cambie un contrato MUST identificar y verificar su propietario, ruta canónica y cambios previstos contra el manifiesto y la revisión inmutable de origen.
- La implementación que actualice o genere un contrato MUST hacerlo directamente en la ruta canónica del repositorio propietario y validar que el artefacto resultante coincide con el servicio que lo implementa.
- Antes de que otro repositorio consuma un contrato, el Hub MUST registrar en `shared_contracts` su identificador, propietario, ruta y revisión inmutable completa.
- Un cambio de ruta es transversal y MUST coordinarse primero con el Hub. No elijas ni uses una ruta nueva localmente antes de que el Hub la declare. Tras acordarla, el propietario mueve o genera el contrato en esa ruta y publica su commit; después el Hub actualiza `shared_contracts` con la ruta y el SHA de ese commit. Finalmente, cada consumidor actualiza `origin.yaml` para fijar el nuevo SHA completo del commit del Hub. Hasta completar esa secuencia, no declares alineación con la nueva ruta o revisión.

## Workflow de Spec Kit

- Comprueba primero la alineación con la federación. Después, usa las skills pertinentes de Spec Kit del repositorio para aclarar, planificar, generar tareas, implementar y analizar la contribución asignada.
- Consulta `.specify/templates/` para conocer la estructura esperada de los artefactos de funcionalidades y `.specify/workflows/speckit/workflow.yml` para el ciclo integrado con puntos de revisión.
- Cuando se añadan manifiestos de proyecto y configuración de CI, obtén de ellos los comandos de build, pruebas, lint y comprobación de tipos. Nunca inventes comandos ni informes como aprobadas las comprobaciones que no se hayan ejecutado.
- Limita el trabajo al alcance asignado a este repositorio. Propón primero en la especificación del Hub los cambios que afecten a varios repositorios.
- Escribe la documentación en español.
