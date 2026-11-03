/** Telas de jogo em tela cheia, sem abas (DD016: uma atividade por tela). */
export default function JogoLayout({ children }: LayoutProps<"/">) {
  return <div className="flex min-h-dvh flex-1 flex-col">{children}</div>;
}
