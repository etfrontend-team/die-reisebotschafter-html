"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

export type MegaMenuLink = { label: string; href: string };

export type MegaMenuItem = MegaMenuLink & {
  image: { src: string; alt: string };
  children?: MegaMenuLink[];
};

export type MegaMenuData =
  { layout: "nested"; items: MegaMenuItem[] } | { layout: "columns"; columns: MegaMenuItem[][] };

type MegaMenuProps = {
  id: string;
  isOpen: boolean;
  data: MegaMenuData;
};

export default function MegaMenu({ id, isOpen, data }: MegaMenuProps) {
  const items = data.layout === "nested" ? data.items : data.columns.flat();
  const [activeLabel, setActiveLabel] = useState(items[0]?.label);
  const activeItem = items.find((item) => item.label === activeLabel) ?? items[0];

  if (!activeItem) return null;

  const activate = (label: string) => ({
    onMouseEnter: () => setActiveLabel(label),
    onFocus: () => setActiveLabel(label),
  });

  return (
    <div
      id={id}
      className={cn("mega-menu", isOpen && "mega-menu--open")}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {data.layout === "nested" ? (
        <>
          <ul className="mega-menu-parents">
            {data.items.map((item) => {
              const isActive = item === activeItem;
              return (
                <li key={item.label} className="mega-menu-parent-item">
                  <Link
                    href={item.href}
                    role="link"
                    target="_self"
                    aria-label={item.label}
                    aria-current={isActive ? "true" : undefined}
                    className={cn("mega-menu-parent", isActive && "mega-menu-parent--active")}
                    {...activate(item.label)}
                  >
                    {item.label}
                    <span className="mega-menu-chevron">
                      <Image
                        src={
                          isActive
                            ? "/images/icons/chevron-right-white.svg"
                            : "/images/icons/chevron-right.svg"
                        }
                        width={20}
                        height={20}
                        alt=""
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="mega-menu-children" aria-label={activeItem.label}>
            {activeItem.children?.map((child) => (
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
        </>
      ) : (
        <div className="mega-menu-columns">
          {data.columns.map((column, i) => (
            <ul key={i} className="mega-menu-column">
              {column.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    role="link"
                    target="_self"
                    aria-label={item.label}
                    className={cn(
                      "mega-menu-link",
                      item === activeItem && "mega-menu-link--active",
                    )}
                    {...activate(item.label)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}

      <div className="mega-menu-image-wrap">
        {items.map((item) => (
          <Image
            key={item.label}
            src={item.image.src}
            alt={item.image.alt}
            aria-hidden={item !== activeItem}
            fill
            sizes="380px"
            loading="lazy"
            className={cn("mega-menu-image", item === activeItem && "mega-menu-image--active")}
          />
        ))}
      </div>
    </div>
  );
}
