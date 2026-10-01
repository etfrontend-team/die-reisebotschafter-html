"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Prose from "@/components/ui/Prose";
import { cn } from "@/utils/cn";

const expertData: {
  name: string;
  tagline: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
} = {
  name: "Marcel Molitor",
  tagline: "Let’s Create Your Perfect Journey",
  image: { src: "/images/expert-marcel-molitor.webp", alt: "Marcel Molitor, travel ambassador" },
  cta: { label: "Meet Our Travel Ambassadors", href: "#" },
};

export default function ExpertBar() {
  const [isPastFold, setIsPastFold] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      setIsPastFold(window.scrollY > window.innerHeight);
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      {
        rootMargin: "0px 0px 50px 0px",
      },
    );
    if (footer) observer.observe(footer);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  const isVisible = isPastFold && !isFooterInView;

  return (
    <aside
      className={cn(
        "expert-bar",
        isPastFold && "expert-bar--in",
        isFooterInView && "expert-bar--footer",
      )}
      aria-label="Your travel expert"
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <div className="expert-bar-card">
        <div className="expert-bar-image-wrap">
          <Image
            src={expertData.image.src}
            alt={expertData.image.alt}
            width={142}
            height={142}
            loading="lazy"
            className="expert-bar-image"
          />
        </div>
        <div className="expert-bar-text">
          <Heading level={2} size={3} color="cherry" className="expert-bar-name">
            {expertData.name}
          </Heading>
          <Prose color="grey" className="expert-bar-tagline">
            {expertData.tagline}
          </Prose>
        </div>
      </div>
      <Button href={expertData.cta.href} className="expert-bar-cta">
        {expertData.cta.label}
      </Button>
    </aside>
  );
}
