import { EndpointCard } from "./EndpointCard";
import { endpoints, type ApiEndpoint } from "@/data/endpoints";

export function EndpointList() {
  const groups = endpoints.reduce<Record<string, ApiEndpoint[]>>((acc, ep) => {
    (acc[ep.group] ??= []).push(ep);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group}>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="nb-border nb-shadow-sm bg-accent px-3 py-1.5 font-display text-xl font-extrabold uppercase tracking-tight text-accent-foreground">
              {group}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {items.length} endpoint{items.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
            {items.map((ep) => (
              <EndpointCard key={ep.id} endpoint={ep} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
