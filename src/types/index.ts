import type React from "react";

export type Navbar = {
  text: string;
  href: string;
};
export type Hero = {
  skills: string;
  symbol?: string;
}
export type Greeting = {
  text: string;
  lang: string;
  font: string;
}
export type AboutData = {
  id: string;
  tagline: string;
  heading: string;
  body: string;
  background?: React.ComponentType;
  image?: string;
  layout: string;
}
export type processType = {
  id: string,
  title: string,
  tagline: string,
  description: string,
  keypoints: string[],
}