import type { AboutData } from "@/types/index";
import myPhoto from "@/assets/image/myphoto.jpg";
import LoadingNoiseBg from "@/components/ui/LoadingNoiseBg";
import Greek from "@/assets/image/yuanzheng-xiang-SDn6Dc4MDzU-unsplash.jpg";
export const ABOUTDATA: AboutData[] = [
  {
    id: "01",
    tagline: "Who I Am",
    heading: "Builder.",
    body: "Third-year Computer Science student driven by a curiosity to understand how things work — and the discipline to build them from scratch. I thrive at the intersection of logic and creativity, turning ideas into real, working products.",
    image: myPhoto,
    background: LoadingNoiseBg,
    layout: "card"
  },
  {
    id: "02",
    tagline: "Less, But Better",
    heading: "Craft.",
    body: "I believe great design is invisible — it should feel effortless for the user. Every pixel, every interaction, every line of code is intentional. I don't just build things to work; I build things to feel right.",
    image: Greek,
    background: LoadingNoiseBg,
    layout: "fullbleed"
  },
];
