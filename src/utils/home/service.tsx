import { CiPen } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
export const services = [
  {
    id: 0,
    title: "UI/UX Design",
    icon: <CiPen />,
    color: "text-yellow-400",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-400/10",
    description:
      "Our design process focuses on clarity, creativity, and user experience to build scalable, meaningful solutions for modern digital products.",
    linkText: "Explore UI/UX Design",
  },
  {
    id: 1,
    title: "Web Development",
    icon: <TfiWorld />,
    color: "text-purple-400",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-400/10",
    description:
      "We build fast, scalable, and secure digital solutions using clean code, modern technologies, and performance-driven development practices.",
    linkText: "Explore Web Development",
  },
  {
    id: 2,
    title: "SEO & Optimization",
    icon: <BsGraphUpArrow />,
    color: "text-emerald-400",
    hoverColor: "group-hover:text-emerald-400",
    bgColor: "bg-emerald-400/10",
    description:
      "Improving website visibility, performance, and search rankings through technical SEO, speed optimization, and content-friendly structures.",
    linkText: "Explore SEO & Optimization",
  },
];
