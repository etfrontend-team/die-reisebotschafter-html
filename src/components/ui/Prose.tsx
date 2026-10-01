import { Fragment, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type ProseColor = "cherry" | "soft-ivory" | "grey" | "white" | "black";
type ProseFont = "body" | "heading" | "inter";
type ProseSize = 1 | 2 | 3 | 4;

type ProseProps = {
  color?: ProseColor;
  font?: ProseFont;
  size?: ProseSize;
  className?: string;
} & (
  | { children: ReactNode | ReactNode[]; dangerouslySetInnerHTML?: never }
  | { dangerouslySetInnerHTML: { __html: string }; children?: never }
);

const colors: Record<ProseColor, string> = {
  cherry: "text-cherry",
  "soft-ivory": "text-soft-ivory",
  grey: "text-grey",
  white: "text-white",
  black: "text-black",
};

const fonts: Record<ProseFont, string> = {
  body: "font-body",
  heading: "font-heading",
  inter: "font-inter",
};

const sizes: Record<ProseSize, string> = {
  1: "text-body-1 leading-body-1",
  2: "text-body-2 leading-body-2",
  3: "text-body-3 leading-body-3",
  4: "text-body-4 leading-body-4",
};

export default function Prose({
  color = "black",
  font = "body",
  size = 1,
  className,
  children,
  dangerouslySetInnerHTML,
}: ProseProps) {
  const cls = cn("prose font-normal", sizes[size], fonts[font], colors[color], className);

  if (dangerouslySetInnerHTML) {
    return <div className={cls} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  }

  return (
    <div className={cls}>
      {Array.isArray(children)
        ? children.map((child, i) =>
            typeof child === "string" || typeof child === "number" ? (
              <p key={i}>{child}</p>
            ) : (
              <Fragment key={i}>{child}</Fragment>
            ),
          )
        : children}
    </div>
  );
}
