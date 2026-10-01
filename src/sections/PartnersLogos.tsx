"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Heading from "@/components/ui/Heading";

type PartnerLogo = { name: string; src: string; width: number; height: number };

const partnersData: { title: string; logos: PartnerLogo[] } = {
  title: "Our Affiliations and Partners",
  logos: [
    {
      name: "Canada Specialist Program",
      src: "/images/partners/canada-specialist.webp",
      width: 69,
      height: 71,
    },
    {
      name: "Premier Aussie Specialist",
      src: "/images/partners/aussie-specialist.webp",
      width: 59,
      height: 68,
    },
    {
      name: "Allianz selbständiger Reiseunternehmen – Bundesverband e.V.",
      src: "/images/partners/asr.webp",
      width: 103,
      height: 64,
    },
    { name: "IATA Accredited Agent", src: "/images/partners/iata.webp", width: 139, height: 65 },
    {
      name: "Best of Travel Group",
      src: "/images/partners/best-of-travel.webp",
      width: 103,
      height: 49,
    },
  ],
};

function Logo({ logo }: { logo: PartnerLogo }) {
  return (
    <div className="partners-logo">
      <div className="partners-logo-image-wrap">
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.width}
          height={logo.height}
          loading="lazy"
          className="partners-logo-image"
        />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <span className="partners-divider" aria-hidden="true">
      <Image src="/images/icons/divider-vertical.svg" width={1} height={80} alt="" />
    </span>
  );
}

export default function PartnersLogos() {
  const areaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isMarquee, setIsMarquee] = useState(false);

  useEffect(() => {
    const area = areaRef.current;
    const row = measureRef.current;
    if (!area || !row) return;
    const check = () => setIsMarquee(row.scrollWidth > area.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(area);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="partners general-spacing" aria-labelledby="partners-title">
      <Heading level={2} className="partners-title">
        <span id="partners-title">{partnersData.title}</span>
      </Heading>

      <div ref={areaRef} className="partners-area">
        <div ref={measureRef} className="partners-row partners-row--measure" aria-hidden="true">
          {partnersData.logos.map((logo, i) => (
            <Fragment key={logo.name}>
              {i > 0 && <Divider />}
              <Logo logo={logo} />
            </Fragment>
          ))}
        </div>

        {isMarquee ? (
          <Marquee autoFill pauseOnHover speed={40} gradient={false} className="partners-marquee">
            {partnersData.logos.map((logo) => (
              <div key={logo.name} className="partners-marquee-item">
                <Logo logo={logo} />
                <Divider />
              </div>
            ))}
          </Marquee>
        ) : (
          <ul className="partners-row">
            {partnersData.logos.map((logo, i) => (
              <Fragment key={logo.name}>
                {i > 0 && (
                  <li aria-hidden="true">
                    <Divider />
                  </li>
                )}
                <li>
                  <Logo logo={logo} />
                </li>
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
