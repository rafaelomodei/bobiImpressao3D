import type { WorldInput } from "../../types";
import { av02 } from "./av02";
import { l09 } from "./l09";
import { l10 } from "./l10";
import { l11 } from "./l11";
import { l12 } from "./l12";
import { l13 } from "./l13";
import { l14 } from "./l14";
import { l15 } from "./l15";
import { l16 } from "./l16";

export default {
  id: "M2",
  number: 2,
  title: "Oficina",
  // redigido pela equipe técnica
  subtitle: "Conheça a impressora e trabalhe com segurança.",
  lessons: [l09, l10, l11, l12, l13, l14, l15, l16],
  assessment: av02,
} satisfies WorldInput;
