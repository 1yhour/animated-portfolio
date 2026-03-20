import type { Greeting } from "../types/index";
export const GREETINGS: Greeting[] = [
  { text: "ស្វាគមន៍", lang: "km", font: "font-[Noto_Serif_Khmer]" },
  { text: "欢迎", lang: "zh", font: "font-[Noto_Sans_SC]" },
  { text: "Bienvenue", lang: "fr", font: "font-[Raleway]" },
  { text: "Welcome", lang: "en", font: "font-[Raleway]" },
] as const;
