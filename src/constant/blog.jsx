import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";
import img1 from "../assets/newassets/colt 19111.png";
import img2 from "../assets/newassets/trench_gun_3.webp";
import img3 from "../assets/newassets/p08 2.png";

export const NewsData = [
  {
    title: "The Art of Building Immersion",
    icon: <FaCameraRetro className="text-4xl text-accent duration-300" />,
    image: img1,
    description:
      "Creating a truly immersive experience isn’t just about visuals it’s about the small details that pull players into another world.",
    fullDescription:
      "Creating a truly immersive experience isn’t just about visuals it’s about the small details that pull players into another world. From ambient sounds to the way light filters through a room, these subtle touches invite players to feel like they’re not just playing a game, but living in it. We focus on atmosphere over perfection, knowing that mood and engagement are what matter most. Every corner tells a story, and even the smallest detail can change how players experience the world we create.",
    link: "art-of-building-immersion",
    delay: "300",
  },
  {
    title: "The Power of Uncertainty: Creating Suspense",
    icon: <GiNotebook className="text-4xl text-accent duration-300" />,
    image: img2,
    description:
      "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too.",
    fullDescription:
      "Suspense is the art of leaving players uncertain about what comes next. It’s not just the big moments that make players tense it’s the quiet ones too. The moments of silence, slow pacing, and what players don’t see, often have the greatest impact. Creating suspense means building tension without giving too much away, keeping players on edge and making every twist feel unexpected. It’s about playing with their minds as much as the gameplay itself.",
    link: "power-of-uncertainity",
    delay: "400",
  },
  {
    title: " The Invisible Work: Making the Game Feel Real",
    icon: <SlNote className="text-4xl text-accent duration-300" />,
    image: img3,
    description:
      "Some of the most important work in game design is invisible. It’s the subtle things.",
    fullDescription:
      "Some of the most important work in game design is invisible. It’s the subtle animations, ambient sounds, and interaction feedback that make the world feel real. Whether it’s a hand movement or the soft rustle of leaves, these small details are what create a living, breathing world. The goal is to make every interaction feel natural, and that’s the invisible work that truly brings the game to life.",
    link: "invisible-work",
    delay: "500",
  },
];