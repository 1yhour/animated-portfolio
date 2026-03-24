import type { workProjectType } from "@/types";
import { FaGithub } from "react-icons/fa";
import {GrLinkNext} from "react-icons/gr";
import MyPorfotlio from "@/assets/image/myportfolio_image.png";
import TeamProject from "@/assets/image/team_project.jpg";
import Chabot from "@/assets/image/chatbot_image.jpg";
export const workData: workProjectType[] = [
{
    id: "01",
    year: "2025",
    title: "AI / AUTOMATION",
    heading: "Chatbot",
    description:
      "Most chatbots forget you the moment you refresh. This one doesn't. Built with React and the OpenAI API — multi-turn memory, markdown support, and a UI that doesn't look like a university assignment.",
    link: "https://github.com/1yhour/Chatbot",
    linkText: [{ text: "Github", icon: FaGithub }],
    image: Chabot,
  },
  {
    id: "02",
    year: "2025",
    title: "WEB DEVELOPMENT",
    heading: "Portfolio",
    description:
      "A personal space to showcase my work, share my design philosophy, and connect with people who appreciate thoughtful digital experiences.",
    link: "contact-link",
    linkText: [{ text: "Let's Talk", icon: GrLinkNext }],
    image: MyPorfotlio,
  },
  {
    id: "03",
    year: "2025",
    title: "LET'S TALK",
    heading: "Your Project?",
    description:
      "Got an idea that's been sitting in a notes app for too long? Let's build it. I'm open to freelance work, collaborations, or just a conversation about what's possible.",
    link: "contact-link",
    linkText: [{ text: "Let's Talk", icon: GrLinkNext }],
    image: TeamProject,
  },
]