import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ContainerVariant = "sm" | "md" | "full";
type ContainerAlign = "mx-auto" | "ml-auto" | "mr-auto";

interface ContainerProps {
  variant?: ContainerVariant;
  align?: ContainerAlign;
  className?: string;
  children: ReactNode;
}

const variantMap: Record<ContainerVariant, string> = {
  sm: "max-w-1440 md:px-20 px-16",
  md: "max-w-1440 md:px-40 px-30",
  full: "max-w-full md:px-20 px-16",
};

export default function Container({
  variant = "md",
  align = "mx-auto",
  className,
  children,
}: ContainerProps) {
  return <div className={cn("w-full", variantMap[variant], align, className)}>{children}</div>;
}
