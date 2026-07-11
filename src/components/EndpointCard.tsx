import { useState } from "react";
import { MethodBadge } from "./MethodBadge";
import { buildUrl, type ApiEndpoint } from "@/data/endpoints";
import { sendRequest } from "@/services/api";

type Status = "idle" | "loading" | "success" | "error";

interface ResultState {
  status: Status;
  code?: number;
  time?: number;
  body?: string;
  error?: string;
}

export function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      endpoint.params.map((p) => [p.name, p.defaultValue ?? ""]),
    ),
  );

  const [result, setResult] = useState<ResultState>({
    status: "idle",
  });

  const [copied, setCopied] = useState(false);

  const url = buildUrl(endpoint, values);

  const missingRequired = endpoint.params.some(
    (p) => p.required && !(values[p.name] ?? "").trim(),
  );

  async function handleTry() {
    if (missingRequired) return;

    setResult({
      status: "loading",
    });

    setCopied(false);

    const response = await sendRequest(url);

    setResult(response);
  }

  async function handleCopy() {
    const text = result.error ?? result.body ?? "";

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Clipboard unavailable
    }
  }

  function handleToggle() {
    if (open) {
      setResult({
        status: "idle",
      });

      setCopied(false);
    }

    setOpen((prev) => !prev);
  }

  return (
    <div
      className={`nb-border nb-shadow min-w-0 bg-card transition-colors duration-200 ${
        !open ? "hover:bg-muted/25 active:bg-muted/25" : ""
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left sm:px-5"
      >
        <MethodBadge method={endpoint.method} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-display text-base font-bold sm:text-lg">
              {endpoint.name}
            </span>
          </div>

          <code className="block truncate font-mono text-xs text-muted-foreground sm:text-sm">
            {endpoint.path}
          </code>
        </div>

        <span
          aria-hidden
          className={`nb-border grid h-8 w-8 shrink-0 place-items-center bg-primary font-mono text-lg font-extrabold text-primary-foreground transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="border-t-[3px] border-border px-4 py-5 sm:px-5">
          <p className="mb-4 text-sm text-muted-foreground">
            {endpoint.description}
          </p>

          {/* Parameters */}
          {endpoint.params.length > 0 ? (
            <div className="mb-4 space-y-3">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Parameters
              </h4>

              {endpoint.params.map((param) => (
                <label key={param.name} className="block">
                  <span className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                    <code className="font-mono font-bold">
                      {param.name}
                    </code>

                    <span className="nb-border bg-background px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                      {param.kind}
                    </span>

                    <span className="font-mono text-[10px] text-muted-foreground">
                      {param.type}
                    </span>

                    {param.required && (
                      <span className="font-mono text-[10px] font-bold text-danger">
                        required
                      </span>
                    )}
                  </span>

                  <input
                    value={values[param.name] ?? ""}
                    placeholder={param.placeholder}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [param.name]: e.target.value,
                      }))
                    }
                    className="nb-border w-full bg-background px-3 py-2 font-mono text-sm outline-none focus:nb-shadow-primary"
                  />

                  <span className="mt-1 block text-xs text-muted-foreground">
                    {param.description}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              Tidak ada parameter.
            </p>
          )}

          {/* Request URL */}
          <div className="nb-border mb-4 overflow-x-auto bg-background px-3 py-2">
            <code className="whitespace-nowrap font-mono text-xs">
              {url}
            </code>
          </div>

          {/* Try */}
          <button
            type="button"
            onClick={handleTry}
            disabled={result.status === "loading" || missingRequired}
            className="nb-border nb-shadow-sm bg-primary px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-wide text-primary-foreground transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50"
          >
            {result.status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Sending...
              </span>
            ) : (
              "Try it"
            )}
          </button>

          {missingRequired && (
            <span className="ml-3 font-mono text-xs text-danger">
              Isi parameter wajib terlebih dahulu.
            </span>
          )}

          {/* Response */}
          {result.status !== "idle" && (
            <div className="mt-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  Response
                </h4>

                {result.code !== undefined && (
                  <span
                    className={`nb-border px-2 py-0.5 font-mono text-xs font-bold ${
                      result.status === "success"
                        ? "bg-success text-primary-foreground"
                        : "bg-danger text-primary-foreground"
                    }`}
                  >
                    {result.code}
                  </span>
                )}

                {result.time !== undefined && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {result.time} ms
                  </span>
                )}

                {result.status !== "loading" &&
                  (result.body ?? result.error) && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="nb-border ml-auto bg-background px-2 py-0.5 font-mono text-xs font-bold transition-transform hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  )}
              </div>

              {result.status === "loading" ? (
                <div className="nb-border animate-pulse bg-background p-3 font-mono text-xs text-muted-foreground">
                  Menunggu response...
                </div>
              ) : (
                <pre className="nb-border max-h-96 overflow-auto bg-background p-3 font-mono text-xs leading-relaxed">
                  {result.error ?? result.body}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}