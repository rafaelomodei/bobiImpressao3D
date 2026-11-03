import type { WorldInput } from "../../types";
import { av03 } from "./av03";
import { l17 } from "./l17";
import { l18 } from "./l18";
import { l19 } from "./l19";
import { l20 } from "./l20";
import { l21 } from "./l21";
import { l22 } from "./l22";
import { l23 } from "./l23";
import { l24 } from "./l24";

/** Mundo 3 — fontes: docs/licoes/mundo-03.md e docs/avaliacoes/mundo-03-av03.md. */
export default {
  id: "M3",
  number: 3,
  title: "Primeira impressão",
  subtitle: "Do arquivo ao seu primeiro chaveiro virtual.", // redigido pela equipe técnica
  lessons: [l17, l18, l19, l20, l21, l22, l23, l24],
  assessment: av03,
} satisfies WorldInput;
