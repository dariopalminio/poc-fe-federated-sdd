# Research: Health Page

**Date**: 2026-11-09
**Feature**: [spec.md](spec.md)

## Evidence

- The child scope is `FR-004` and `FR-005`, role `frontend-health`, from the Hub manifest at commit `a1c8a5a8b45c4a12d3a15541e3c2a559bb4802e9`.
- The manifest assigns `health-api` to the Backend at `specs/001-health-endpoint/contracts/openapi.json`, revision `44ff3c4576062262370b4f7798b24e1eddc2abde`.
- The pinned OpenAPI contract defines unauthenticated `GET /health`, a JSON `200` response with required `status: "ok"`, and no additional properties. The Backend repository owns this contract.
- The Frontend checkout has no application source, package manifest, build configuration, or test setup. The Backend package manifest uses npm and requires Node.js `>=26`; this is evidence for a compatible proposed toolchain, not an installed Frontend environment.

## Decisions

### Minimal Frontend Scaffold

**Decision**: Initialize a React single-page application with TypeScript and Vite. Use npm and commit `package-lock.json`; pin exact dependency versions when the scaffold is added.

**Rationale**: Repository guidance specifies React, while the feature needs only one page and one request. A client-rendered SPA avoids server rendering and routing infrastructure that this scope does not require. TypeScript supplies compile-time checks for UI state without duplicating the OpenAPI definition.

**Alternatives considered**: A JavaScript-only app provides less compile-time protection for the state flow. A server-rendered framework adds infrastructure without a requirement for it. No current Frontend manifest exists to reuse.

### Component Test Setup

**Decision**: Use Vitest, jsdom, and React Testing Library for the required component unit test. Mock the browser `fetch` boundary and exercise visible behavior.

**Rationale**: The repository constitution requires an automated component unit test for behavior changes. The test should assert what users see rather than internal hook state.

**Alternatives considered**: No test runner exists in this checkout. Jest is viable but adds no feature-specific benefit; browser end-to-end tooling is broader than the one-page behavior requires.

### Health Request

**Decision**: Use native `fetch` for one same-origin `GET /health` request when the page mounts. In development, configure Vite to proxy `/health` to `http://localhost:3000` by default; allow `HEALTH_API_PROXY_TARGET` to override the proxy target. Production hosting must route `/health` to the Backend on the same origin. Do not add authentication, polling, retries, or a third-party query library. Abort an in-flight request when the page unmounts.

**Rationale**: The contract requires no security and exposes a single GET operation. The Backend listens on port 3000 by default and does not register CORS; a development proxy avoids a cross-origin browser request without changing the Backend-owned contract or implementation. Native fetch avoids an additional HTTP dependency.

**Alternatives considered**: Calling `http://localhost:3000/health` directly from the Vite origin would require Backend CORS support, which is not configured and is outside this repository's scope. Axios or a query/cache library adds dependencies for behavior not required by the spec. Polling and retries would add user-visible semantics not requested.

### Response Validation And UI States

**Decision**: Treat the response as untrusted JSON at runtime. Show success only when HTTP is successful and the body is an object whose `status` is exactly `"ok"`; show a generic unavailable state for network, HTTP, parsing, or shape errors. Represent the component state as loading, success, or error; never retain an old success value after a new request failure.

**Rationale**: This enforces the pinned OpenAPI response and directly satisfies `FR-004`, `FR-005`, `SC-002`, and `SC-003` without copying the contract into a local authoritative schema.

**Alternatives considered**: Displaying arbitrary JSON could present an invalid payload as healthy. Retaining a previous result after failure would violate the freshness requirement. No retry or timeout policy is specified; the page remains pending until the request resolves or is aborted.

## Follow-Up

The parent spec retains an assumption that the contract revision is pending, although the newer manifest now pins it. This plan follows the manifest and the resolved owner artifact; the Hub should reconcile that time-bound assumption in a later source revision.