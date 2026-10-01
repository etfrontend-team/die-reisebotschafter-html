"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import MegaMenu, { type MegaMenuData } from "@/components/shared/MegaMenu";
import { destinationsMenu, travelTypesMenu } from "@/components/shared/megaMenuData";
import MobileMenu from "@/components/shared/MobileMenu";
import StickyNav, { stickyNavData } from "@/components/shared/StickyNav";
import { cn } from "@/utils/cn";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  megaMenu?: MegaMenuData;
};

const FOLD_OFFSET = 20;

const headerData: {
  logo: { src: string; alt: string; width: number; height: number };
  nav: NavItem[];
  cta: { label: string; href: string };
} = {
  logo: {
    src: "/images/site-logo.png",
    alt: "Die Reisebotschafter – Wir waren da.",
    width: 708,
    height: 180,
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "#", hasDropdown: true, megaMenu: destinationsMenu },
    { label: "Types of Travel", href: "#", hasDropdown: true, megaMenu: travelTypesMenu },
    { label: "Offers", href: "#" },
  ],
  cta: { label: "Request This Trip", href: "#" },
};

const megaMenuId = (label: string) => `mega-menu-${label.toLowerCase().replace(/\W+/g, "-")}`;

export default function Header() {
  const pathname = usePathname();
  const [isPastFold, setIsPastFold] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const pastFold = window.scrollY > window.innerHeight - FOLD_OFFSET;
      setIsPastFold(pastFold);
      if (pastFold) setOpenMenu(null);
      setIsScrolled(window.scrollY > 0);
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn("header", isScrolled && "header--scrolled", isPastFold && "header--hidden")}
      >
        <Container variant="full" className="header-inner">
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="header-menu-btn"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span className="header-icon-wrap">
              <Image
                src={isMobileMenuOpen ? "/images/icons/close.svg" : "/images/icons/menu.svg"}
                width={20}
                height={20}
                alt=""
                aria-hidden="true"
              />
            </span>
          </button>

          <Link
            href="/"
            role="link"
            target="_self"
            aria-label="Die Reisebotschafter – home"
            className="header-logo"
          >
            <span className="header-logo-wrap">
              <Image
                src={headerData.logo.src}
                width={headerData.logo.width}
                height={headerData.logo.height}
                alt={headerData.logo.alt}
                sizes="177px"
                className="header-logo-img"
                loading="eager"
                priority
              />
            </span>
          </Link>

          <nav aria-label="Main navigation" className="header-nav">
            <ul className="header-nav-list">
              {headerData.nav.map((item) => {
                const isActive = item.href === pathname;
                const chevron = item.hasDropdown && (
                  <span className="header-icon-wrap">
                    <Image
                      src="/images/icons/chevron-down.svg"
                      width={14}
                      height={14}
                      alt=""
                      aria-hidden="true"
                    />
                  </span>
                );

                if (item.megaMenu) {
                  const isOpen = openMenu === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-label={item.label}
                        aria-expanded={isOpen}
                        aria-controls={megaMenuId(item.label)}
                        className={cn("header-nav-link", isOpen && "header-nav-link--open")}
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                      >
                        {item.label}
                        {chevron}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      role="link"
                      target="_self"
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                      className={cn("header-nav-link", isActive && "header-nav-link--active")}
                    >
                      {item.label}
                      {chevron}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <div className="header-icons">
              <button type="button" aria-label="Wishlist" className="header-icon-btn">
                <span className="header-icon-wrap">
                  <Image
                    src="/images/icons/heart.svg"
                    width={16.8889}
                    height={16.8889}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
              </button>
              <span className="header-divider" aria-hidden="true">
                <Image src="/images/icons/divider.svg" width={1} height={22.5} alt="" />
              </span>
              <button type="button" aria-label="Search" className="header-icon-btn">
                <span className="header-icon-wrap">
                  <Image
                    src="/images/icons/search.svg"
                    width={16.8889}
                    height={16.8889}
                    alt=""
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>

            <Button href={headerData.cta.href} className="header-cta">
              {headerData.cta.label}
            </Button>
          </div>
        </Container>

        <div
          className="header-mega"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpenMenu(null);
          }}
        >
          {headerData.nav.map(
            (item) =>
              item.megaMenu && (
                <MegaMenu
                  key={item.label}
                  id={megaMenuId(item.label)}
                  isOpen={openMenu === item.label}
                  data={item.megaMenu}
                />
              ),
          )}
        </div>

        <MobileMenu
          id="mobile-menu"
          isOpen={isMobileMenuOpen}
          items={headerData.nav}
          cta={headerData.cta}
          onClose={closeMobileMenu}
        />
      </header>

      <StickyNav items={stickyNavData[pathname] ?? []} isVisible={isPastFold} />
    </>
  );
}
