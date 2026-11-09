export async function fetchHealthStatus(signal?: AbortSignal): Promise<"ok"> {
  const response = await fetch("/health", { signal });

  if (!response.ok) {
    throw new Error("Health request failed");
  }

  const payload: unknown = await response.json();

  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error("Invalid health response");
  }

  const entries = Object.entries(payload);
  if (
    entries.length !== 1 ||
    entries[0]?.[0] !== "status" ||
    entries[0]?.[1] !== "ok"
  ) {
    throw new Error("Invalid health response");
  }

  return "ok";
}