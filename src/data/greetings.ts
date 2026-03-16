import type { Greeting } from "../types/index";
export const GREETINGS: Greeting[] = [
  { text: "ស្វាគមន៍", lang: "km", font: "font-[Noto_Serif_Khmer]" },
  { text: "ようこそ", lang: "ja", font: "font-[Noto_Sans_JP]" },
  { text: "Bienvenue", lang: "fr", font: "font-[Raleway]" },
  { text: "Welcome", lang: "en", font: "font-[Raleway]" },
] as const;
