"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

type ContactAction = {
  label: string;
  href: string;
  icon: { default: string; active: string };
};

const contactData: ContactAction[] = [
  {
    label: "Consultation Appointment",
    href: "#",
    icon: {
      default: "/images/icons/phone-call-cherry.svg",
      active: "/images/icons/phone-call.svg",
    },
  },
  {
    label: "Chat",
    href: "#",
    icon: {
      default: "/images/icons/message-square.svg",
      active: "/images/icons/message-square-white.svg",
    },
  },
];

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!widgetRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <aside
      ref={widgetRef}
      className={cn("contact-widget", isOpen && "contact-widget--open")}
      aria-label="Contact"
    >
      <div id="contact-widget-actions" className="contact-widget-actions">
        {contactData.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            role="link"
            target="_self"
            aria-label={action.label}
            className="contact-widget-btn"
            onClick={() => setIsOpen(false)}
          >
            <span className="contact-widget-icon">
              <Image
                src={action.icon.default}
                width={24}
                height={24}
                alt=""
                aria-hidden="true"
                className="contact-widget-icon-default"
              />
              <Image
                src={action.icon.active}
                width={24}
                height={24}
                alt=""
                aria-hidden="true"
                className="contact-widget-icon-active"
              />
            </span>
            <span className="contact-widget-label-wrap" aria-hidden="true">
              <span className="contact-widget-label">{action.label}</span>
            </span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
        aria-controls="contact-widget-actions"
        className="contact-widget-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="contact-widget-toggle-icon">
          <Image src="/images/icons/plus.svg" width={24} height={24} alt="" aria-hidden="true" />
        </span>
      </button>
    </aside>
  );
}
