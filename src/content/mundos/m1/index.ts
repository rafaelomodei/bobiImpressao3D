import type { WorldInput } from "../../types";
import { av01 } from "./av01";
import { l01 } from "./l01";
import { l02 } from "./l02";
import { l03 } from "./l03";
import { l04 } from "./l04";
import { l05 } from "./l05";
import { l06 } from "./l06";
import { l07 } from "./l07";
import { l08 } from "./l08";

export default {
  id: "M1",
  number: 1,
  title: "Descoberta",
  // redigido pela equipe técnica
  subtitle: "Como uma ideia digital vira objeto de verdade.",
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08],
  assessment: av01,
} satisfies WorldInput;
