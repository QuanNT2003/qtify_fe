import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGenreColor(name: string) {
  const colors = [
    "#E13300", // Pop
    "#BC5900", // Hip-Hop
    "#D84000", // Dance
    "#E91429", // Indie
    "#777777", // Chill
    "#E8115B", // Rock
    "#148A08", // K-Pop
    "#7D4B32", // Jazz
    "#056952", // Blues
    "#503750", // Soul
    "#AF2896", // Punk
    "#1E3264", // Country
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
