export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight text-structure-deep ${className}`} aria-label="bobi.">
      bobi<span className="text-brand-primary">.</span>
    </span>
  );
}
