# Quickstart: Health Page

## Prerequisites

- Node.js `>=26` and npm.
- The Backend checkout beside this repository at `../poc-be-federated-sdd`.

## Start the Backend

From the Frontend repository root, build and start the Backend using its declared npm scripts:

```powershell
npm --prefix ..\poc-be-federated-sdd run build
npm --prefix ..\poc-be-federated-sdd start
```

The Backend listens on port `3000` by default. Keep this terminal running.

## Start the Frontend

In a second terminal from the Frontend repository root:

```powershell
npm ci
npm run dev
```

Vite proxies same-origin `/health` requests to `http://localhost:3000`. To use another Backend origin, set `HEALTH_API_PROXY_TARGET` before starting Vite. Production hosting must route `/health` to the Backend on the same origin.

## Automated Validation

```powershell
npm run test -- --run
npm run build
```

## Scenarios

- With the Backend running, opening the page triggers `GET /health` and displays `ok` only after a valid successful response.
- While the request is pending, the page displays a pending indication and does not show a healthy state.
- If the Backend returns a non-success response, the network fails, JSON is invalid, or the body does not exactly match the contract, the page displays an unavailable indication and does not show `ok`.
- Component tests mock `fetch` and cover pending, success, HTTP/network failure, invalid JSON, an unexpected status, and additional response properties.

## Results (2026-11-09)

- `npm run test -- --run`: 7 tests passed.
- `npm run build`: TypeScript check passed; Vite built 17 modules.
- `GET /` through Vite returned HTTP 200.
- Proxied `GET /health` returned HTTP 200 with `status: "ok"` from the Backend.