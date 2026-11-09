# Health Page UI Contract

This document defines the user-visible behavior for the Frontend contribution. The HTTP contract remains owned by the Backend and is pinned by the parent manifest as `health-api` at revision `44ff3c4576062262370b4f7798b24e1eddc2abde`.

| Request outcome | UI behavior |
|-----------------|-------------|
| Request pending | Show a pending indication; do not show `ok` or otherwise claim the service is healthy. |
| Successful HTTP response with JSON `{ "status": "ok" }` | Display the received status value `ok`. |
| Network error, non-success HTTP response, invalid JSON, or body not matching the success contract | Show an unavailable indication and do not display `ok` as the current status. |

The page performs one request on mount. It does not poll, retry, require authentication, or expose raw exception details to the user. If the page unmounts while the request is pending, cancel the request and do not update the unmounted view.