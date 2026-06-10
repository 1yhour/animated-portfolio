import type { workProjectType } from "@/types";
import { FaGithub } from "react-icons/fa";
import {GrLinkNext} from "react-icons/gr";
import MyPorfotlio from "@/assets/image/myportfolio_image.png";
import TeamProject from "@/assets/image/team_project.jpg";
import Chabot from "@/assets/image/chatbot_image.jpg";
import EcommerceProject from "@/assets/image/e-commerce-pic.png";
import TeamEcommerce from "@/assets/image/team-ecommerce.png"
export const workData: workProjectType[] = [
{
    id: "01",
    year: "2025",
    title: "AI / AUTOMATION",
    heading: "Chatbot",
    description:
      "Persistent-memory chatbot built with Python and Google services. Supports multi-turn conversations, markdown, and a sleek, modern UI.",
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
    year: "2026",
    title: "FULL-STACK",
    heading: "Ecommerce Website",
    description:
      "A scalable ecommerce platform developed with Next.js, Laravel, KHQR and PostgreSQL. Implemented secure authentication, dynamic product categories, shopping cart functionality, and responsive UI components to deliver a smooth and modern shopping experience.",
    link: "https://github.com/1yhour/e-commerce",
    linkText: [{ text: "Github", icon: FaGithub }],
    image: EcommerceProject,
  },
  {
    id: "04",
    year: "2026",
    title: "TEAMWORK",
    heading: "Collaborative Ecommerce Project",
    description:
      "Worked collaboratively in a development team to build a full-stack ecommerce platform. Contributed to implementing authentication, product management, and responsive UI components while coordinating through Git and GitHub workflows to ensure efficient development and code integration.",
    linkText: [
      { text: "View Project", href: "https://ecommerce-two-hazel-vqx631jz4e.vercel.app/store", icon: GrLinkNext },
      { text: "Github",       href: "https://github.com/yehemo/Ecommerce", icon: FaGithub  },
    ],
    image: TeamEcommerce,
  },
  {
    id: "05",
    year: "2026",
    title: "LET'S TALK",
    heading: "Your Project?",
    description:
      "Got an idea that's been sitting in a notes app for too long? Let's build it. I'm open to freelance work, collaborations, or just a conversation about what's possible.",
    link: "contact-link",
    linkText: [{ text: "Let's Talk", icon: GrLinkNext }],
    image: TeamProject,
  },
  
]