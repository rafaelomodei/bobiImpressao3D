"use client";

import { useSyncExternalStore } from "react";
import { Caramelo } from "@/components/game/caramelo";

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

/**
 * DD007: o bobi sempre precisa de internet (respostas, XP e progresso são confirmados
 * no servidor). Sem conexão, cobre a tela com o Caramelo preocupado e um aviso; some
 * sozinho quando a internet volta. Fica sempre montado (escondido) para a imagem já
 * estar carregada quando a conexão cair — o app não guarda arquivos para uso offline.
 */
export function OfflineScreen() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="sem-internet-titulo"
      aria-describedby="sem-internet-texto"
      hidden={online}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background px-6 text-center"
    >
      <Caramelo pose="concern" size={180} eager />
      <h2 id="sem-internet-titulo" className="text-2xl font-black">
        Sem internet
      </h2>
      <p id="sem-internet-texto" className="max-w-sm text-structure-soft-text">
        O bobi precisa de internet para jogar. Confira o Wi-Fi ou os dados móveis — assim que a conexão voltar, você
        continua de onde parou.
      </p>
      <button type="button" className="btn-secondary max-w-xs" onClick={() => window.location.reload()}>
        Tentar de novo
      </button>
    </div>
  );
}
