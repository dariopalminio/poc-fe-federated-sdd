# Data Model: Health Page

The page has no persisted data. Its view state represents one in-flight request to the Backend health endpoint.

## Health View State

| State | Data | Entry condition | User-visible result |
|-------|------|-----------------|---------------------|
| `loading` | None | Request starts on page mount | Pending indicator; no healthy status is shown. |
| `success` | `status: "ok"` | HTTP response is successful and JSON matches the pinned contract | Display the received `ok` status. |
| `error` | No response data | Network failure, non-success HTTP response, JSON parse failure, or invalid body | Display a generic unavailable message; do not display `ok`. |

## Transitions

```text
loading -> success
loading -> error
```

The component does not retain a previous successful result after a request fails. An in-flight request is aborted on unmount; an abort caused by unmount does not produce a visible error state.

## Contract Boundary

The Backend-owned OpenAPI contract is authoritative. The client validates only the received success shape needed by the page and does not maintain or publish a local API schema.