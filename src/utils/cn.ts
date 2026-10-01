import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, validators } from "tailwind-merge";

// Custom tokens from globals.css / utilities.css. Without these, tailwind-merge treats
// e.g. `text-body-1` as a color and drops it when `text-black` is also present.
const textSizes = [
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
  "heading-6",
  "body-1",
  "body-2",
  "body-3",
  "body-4",
  "button",
];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: textSizes,
      leading: textSizes,
      radius: ["esm"],
    },
    classGroups: {
      // @utility text-* / rounded-* / border-* (integer px values)
      "font-size": [{ text: [validators.isInteger] }],
      rounded: [{ rounded: [validators.isInteger] }],
      "border-w": [{ border: ["sm", "md", "lg"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
