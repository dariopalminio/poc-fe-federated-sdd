import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HealthPage from "./HealthPage";

const fetchMock = vi.fn<typeof fetch>();

function response(ok: boolean, payload: unknown): Response {
  return {
    ok,
    status: ok ? 200 : 503,
    json: vi.fn().mockResolvedValue(payload),
  } as unknown as Response;
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("HealthPage", () => {
  it("no indica que el servicio está saludable mientras la petición sigue pendiente", () => {
    fetchMock.mockReturnValueOnce(new Promise<Response>(() => {}));

    render(<HealthPage />);

    expect(screen.getByRole("status")).toHaveTextContent("Consultando estado");
    expect(screen.queryByText("Estado: ok")).not.toBeInTheDocument();
  });

  it("muestra el estado recibido en una respuesta válida", async () => {
    fetchMock.mockResolvedValueOnce(response(true, { status: "ok" }));

    render(<HealthPage />);

    expect(await screen.findByText("Estado: ok")).toBeInTheDocument();
    expect(fetchMock.mock.calls[0]?.[0]).toBe("/health");
  });

  it("muestra indisponibilidad ante una respuesta HTTP fallida", async () => {
    fetchMock.mockResolvedValueOnce(response(false, { status: "ok" }));

    render(<HealthPage />);

    expect(await screen.findByText("Estado no disponible")).toBeInTheDocument();
    expect(screen.queryByText("Estado: ok")).not.toBeInTheDocument();
  });

  it("muestra indisponibilidad ante un error de red", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("network error"));

    render(<HealthPage />);

    expect(await screen.findByText("Estado no disponible")).toBeInTheDocument();
    expect(screen.queryByText("Estado: ok")).not.toBeInTheDocument();
  });

  it("muestra indisponibilidad cuando el JSON no se puede interpretar", async () => {
    const invalidJson = response(true, {});
    vi.mocked(invalidJson.json).mockRejectedValueOnce(new SyntaxError("invalid JSON"));
    fetchMock.mockResolvedValueOnce(invalidJson);

    render(<HealthPage />);

    expect(await screen.findByText("Estado no disponible")).toBeInTheDocument();
    expect(screen.queryByText("Estado: ok")).not.toBeInTheDocument();
  });

  it.each([
    ["estado no permitido", { status: "healthy" }],
    ["propiedad adicional", { status: "ok", extra: true }],
  ])("rechaza cuerpos con %s", async (_scenario, payload) => {
    fetchMock.mockResolvedValueOnce(response(true, payload));

    render(<HealthPage />);

    await waitFor(() => {
      expect(screen.getByText("Estado no disponible")).toBeInTheDocument();
    });
    expect(screen.queryByText("Estado: ok")).not.toBeInTheDocument();
  });
});