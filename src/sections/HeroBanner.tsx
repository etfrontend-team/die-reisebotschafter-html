import Image from "next/image";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Prose from "@/components/ui/Prose";

type HeroBannerData = {
  tag: string;
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
};

const heroData: HeroBannerData = {
  tag: "Seychelles",
  title: "Dream islands Seychelles",
  subtitle: "14-day small group camping tour from Johannesburg to Livingstone",
  image: { src: "/images/hero-banner-image.webp", alt: "Red desert dunes at sunrise" },
  cta: { label: "Request This Trip", href: "#" },
};

export default function HeroBanner() {
  const { tag, title, subtitle, image, cta } = heroData;

  return (
    <section className="hero-banner" aria-label={title}>
      <div className="hero-banner-card">
        <div className="hero-banner-image-wrap">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="hero-banner-image"
          />
        </div>

        <div className="hero-banner-content">
          <span className="hero-banner-tag">{tag}</span>
          <Heading level={1} color="white" className="hero-banner-title">
            {title}
          </Heading>
          <Prose color="white" className="hero-banner-subtitle">
            {subtitle}
          </Prose>
          <Button href={cta.href} variant="white" className="hero-banner-cta">
            {cta.label}
          </Button>
        </div>

        <div className="hero-banner-search" role="search">
          <span className="hero-banner-search-icon">
            <Image
              src="/images/icons/search-white.svg"
              width={16.8889}
              height={16.8889}
              alt=""
              aria-hidden="true"
            />
          </span>
          <label htmlFor="hero-search" className="sr-only">
            Where would you like to go?
          </label>
          <input
            id="hero-search"
            type="search"
            name="q"
            placeholder="Where would you like to go?"
            className="hero-banner-search-input"
          />
          <Button type="button" variant="white" icon={false} className="hero-banner-search-btn">
            Find Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
}
