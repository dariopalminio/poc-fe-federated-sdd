import { useEffect, useState } from "react";
import { fetchHealthStatus } from "./healthApi";

type HealthViewState =
  | { kind: "loading" }
  | { kind: "success"; status: "ok" }
  | { kind: "error" };

export default function HealthPage() {
  const [viewState, setViewState] = useState<HealthViewState>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    void fetchHealthStatus(controller.signal)
      .then((status) => setViewState({ kind: "success", status }))
      .catch(() => {
        if (!controller.signal.aborted) {
          setViewState({ kind: "error" });
        }
      });

    return () => controller.abort();
  }, []);

  const message =
    viewState.kind === "loading"
      ? "Consultando estado..."
      : viewState.kind === "success"
        ? `Estado: ${viewState.status}`
        : "Estado no disponible";

  return (
    <main>
      <h1>Estado del servicio</h1>
      <p role="status" aria-live="polite">
        {message}
      </p>
    </main>
  );
}