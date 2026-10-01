import type React from "react";
import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { cn } from "@/utils/cn";

type ButtonVariant = "white" | "cherry";
type ButtonSize = "default" | "small";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  target?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: "_self" | "_blank";
  type?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "cherry",
    size = "default",
    icon = true,
    ariaLabel,
    disabled = false,
    className,
  } = props;

  const label = ariaLabel ?? (typeof children === "string" ? children : undefined);

  const classes = cn(
    "btn",
    icon ? "btn-arrow" : "btn-simple",
    size === "small" && "btn-small",
    `btn-${variant}`,
    className,
  );

  const content = (
    <>
      <span className="btn-label">{children}</span>
      {icon && (
        <span className="btn-icon-wrap">
          <ArrowIcon className="btn-icon" />
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const target = props.target ?? "_self";
    return (
      <Link
        href={disabled ? "#" : props.href}
        role="link"
        target={target}
        aria-label={label}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
        onClick={props.onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      aria-label={label}
      disabled={disabled}
      className={classes}
      onClick={props.onClick}
    >
      {content}
    </button>
  );
}
