export type RequestStatus = "success" | "error";

export interface RequestResult {
  status: RequestStatus;
  code?: number;
  time: number;
  body?: string;
  error?: string;
}

const TIMEOUT_MS = 15000;

export async function sendRequest(
  url: string,
): Promise<RequestResult> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  const start = performance.now();

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    const elapsed = Math.round(performance.now() - start);

    const text = await response.text();

    let formatted = text;

    try {
      formatted = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      // Response bukan JSON, tampilkan apa adanya
    }

    return {
      status: response.ok ? "success" : "error",
      code: response.status,
      time: elapsed,
      body: formatted,
    };
  } catch (err) {
    const elapsed = Math.round(performance.now() - start);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        status: "error",
        time: elapsed,
        error: `Request timeout setelah ${TIMEOUT_MS / 1000} detik.`,
      };
    }

    if (err instanceof Error) {
      return {
        status: "error",
        time: elapsed,
        error: err.message,
      };
    }

    return {
      status: "error",
      time: elapsed,
      error:
        "Gagal menghubungi ArcGateway. Periksa koneksi internet atau coba lagi beberapa saat.",
    };
  } finally {
    clearTimeout(timeout);
  }
}