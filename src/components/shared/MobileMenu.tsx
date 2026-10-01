"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { MegaMenuData } from "@/components/shared/MegaMenu";
import { cn } from "@/utils/cn";

export type MobileMenuItem = {
  label: string;
  href: string;
  megaMenu?: MegaMenuData;
};

type MobileMenuProps = {
  id: string;
  isOpen: boolean;
  items: MobileMenuItem[];
  cta: { label: string; href: string };
  onClose: () => void;
};

export default function MobileMenu({ id, isOpen, items, cta, onClose }: MobileMenuProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [openParent, setOpenParent] = useState<string | null>(null);

  const panelItem = items.find((item) => item.label === activePanel);
  const panelData = panelItem?.megaMenu;

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("menu-open");
    window.dispatchEvent(new Event("lenis:stop"));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onDesktop = () => {
      if (desktop.matches) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.classList.remove("menu-open");
      window.dispatchEvent(new Event("lenis:start"));
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isOpen, onClose]);

  const openPanel = (item: MobileMenuItem) => {
    setActivePanel(item.label);
    if (item.megaMenu?.layout === "nested") setOpenParent(item.megaMenu.items[0]?.label ?? null);
  };

  const close = () => {
    onClose();
    setActivePanel(null);
  };

  return (
    <div
      id={id}
      className={cn("mobile-menu", isOpen && "mobile-menu--open")}
      aria-hidden={!isOpen}
      inert={!isOpen}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) close();
      }}
    >
      {panelItem && panelData && (
        <div className="mobile-menu-top">
          <button
            type="button"
            aria-label={`Back to menu from ${panelItem.label}`}
            className="mobile-menu-back"
            onClick={() => setActivePanel(null)}
          >
            <span className="mobile-menu-chevron mobile-menu-chevron--back">
              <Image
                src="/images/icons/chevron-right.svg"
                width={20}
                height={20}
                alt=""
                aria-hidden="true"
              />
            </span>
            {panelItem.label}
          </button>
        </div>
      )}

      <div className="mobile-menu-body" data-lenis-prevent>
        {!panelData ? (
          <ul className="mobile-menu-list">
            {items.map((item) => (
              <li key={item.label}>
                {item.megaMenu ? (
                  <button
                    type="button"
                    aria-label={item.label}
                    className="mobile-menu-row"
                    onClick={() => openPanel(item)}
                  >
                    {item.label}
                    <span className="mobile-menu-chevron mobile-menu-chevron--right">
                      <Image
                        src="/images/icons/chevron-down.svg"
                        width={14}
                        height={14}
                        alt=""
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    role="link"
                    target="_self"
                    aria-label={item.label}
                    className="mobile-menu-row"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mobile-menu-panel">
            {panelData.layout === "nested" ? (
              <ul className="mobile-menu-accordion">
                {panelData.items.map((parent) => {
                  const isOpenParent = parent.label === openParent;
                  return (
                    <li
                      key={parent.label}
                      className={cn(
                        "mobile-menu-accordion-item",
                        isOpenParent && "mobile-menu-accordion-item--open",
                      )}
                    >
                      <button
                        type="button"
                        aria-label={parent.label}
                        aria-expanded={isOpenParent}
                        className="mobile-menu-accordion-btn"
                        onClick={() => setOpenParent(isOpenParent ? null : parent.label)}
                      >
                        {parent.label}
                        <span className="mobile-menu-chevron mobile-menu-chevron--toggle">
                          <Image
                            src={
                              isOpenParent
                                ? "/images/icons/chevron-right-white.svg"
                                : "/images/icons/chevron-right.svg"
                            }
                            width={20}
                            height={20}
                            alt=""
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                      {isOpenParent && (
                        <ul className="mobile-menu-children" aria-label={parent.label}>
                          {parent.children?.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                role="link"
                                target="_self"
                                aria-label={child.label}
                                className="mega-menu-link"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="mobile-menu-grid">
                {panelData.columns.flat().map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      role="link"
                      target="_self"
                      aria-label={link.label}
                      className="mega-menu-link mobile-menu-grid-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className={cn("mobile-menu-footer", panelData && "mobile-menu-footer--bordered")}>
        <Button href={cta.href} className="mobile-menu-cta">
          {cta.label}
        </Button>
      </div>
    </div>
  );
}
