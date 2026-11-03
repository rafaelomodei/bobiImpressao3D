import Link from "next/link";
import { Caramelo } from "@/components/game/caramelo";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-5 px-4 py-10 text-center">
      <Caramelo pose="concern" size={150} />
      <h1 className="text-2xl font-black">Essa página não existe</h1>
      <p className="font-bold text-structure-soft-text">O Caramelo procurou pela oficina inteira e não achou nada aqui.</p>
      <Link href="/trilha" className="btn-primary">
        Voltar para a trilha
      </Link>
    </main>
  );
}
