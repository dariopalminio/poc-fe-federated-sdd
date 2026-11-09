# Quickstart: Health Page

## Current Repository State

The Frontend repository does not yet contain `package.json`, application source, or a test runner. The commands below are the planned interface to add during the application bootstrap; they are not currently runnable or verified.

## Planned Validation

After the scaffold and scripts are added:

1. Install the locked dependencies with `npm ci`.
2. Run the component suite with `npm run test -- --run`.
3. Build the production bundle with `npm run build`.
4. Start the development server with `npm run dev` and open the page in a browser.

The planned package scripts are `test` (Vitest), `build` (TypeScript check and Vite build), and `dev` (Vite development server). They must be added to `package.json` before these commands are treated as available.

## Scenarios

- With the Backend reachable at the same origin, load the page and verify that it requests `GET /health` and displays `ok` only after a valid successful response.
- Configure `VITE_HEALTH_API_BASE_URL` when the Backend is served from a different origin; verify the request uses that base URL.
- Hold the request pending and verify the page does not display a healthy status.
- Return a non-success HTTP response, invalid JSON, or a body other than `{ "status": "ok" }`; verify the page shows an unavailable state and never shows `ok` as current.
- In the component unit test, mock each response outcome and assert the corresponding visible state.

No Frontend build or test command has been executed in this plan phase.