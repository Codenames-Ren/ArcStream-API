export function MethodBadge({ method }: { method: string }) {
  return (
    <span className="nb-border inline-flex items-center bg-primary px-2.5 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-primary-foreground">
      {method}
    </span>
  );
}
