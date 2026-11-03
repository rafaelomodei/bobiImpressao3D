import { Caramelo } from "@/components/game/caramelo";

/** Carregamento padrão das telas: Caramelo e texto no centro do espaço livre da tela. */
export function PageLoading({ label = "Carregando…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-10 text-center">
      <Caramelo pose="idle" size={96} className="animate-float" />
      <p className="font-black text-structure-soft-text">{label}</p>
    </div>
  );
}
