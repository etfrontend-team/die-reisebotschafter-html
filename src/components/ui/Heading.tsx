import type React from "react";
import { cn } from "@/utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingColor = "cherry" | "soft-ivory" | "grey" | "white" | "black";

type HeadingProps = {
  /** Semantic tag: h1–h6 */
  level?: HeadingLevel;
  /** Visual size; defaults to `level` */
  size?: HeadingLevel;
  color?: HeadingColor;
  uppercase?: boolean;
  className?: string;
} & (
  | { children: React.ReactNode; dangerouslySetInnerHTML?: never }
  | { dangerouslySetInnerHTML: { __html: string }; children?: never }
);

const sizeMap: Record<HeadingLevel, string> = {
  1: "text-heading-1 leading-heading-1",
  2: "text-heading-2 leading-heading-2",
  3: "text-heading-3 leading-heading-3",
  4: "text-heading-4 leading-heading-4",
  5: "text-heading-5 leading-heading-5",
  6: "text-heading-6 leading-heading-6",
};

export default function Heading({
  level = 2,
  size,
  color = "black",
  uppercase = false,
  className,
  children,
  dangerouslySetInnerHTML,
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const classes = cn(
    "font-heading font-medium",
    sizeMap[size ?? level],
    `heading--${color}`,
    uppercase && "heading--uppercase",
    className,
  );

  if (dangerouslySetInnerHTML) {
    return <Tag className={classes} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  }

  return <Tag className={classes}>{children}</Tag>;
}
