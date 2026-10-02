"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { cn } from "@/utils/cn";
import { restoreSlideOrder } from "@/utils/swiper";

type Trip = {
  name: string;
  price: string;
  rating: number;
  description: string;
  duration: string;
  route: string;
  image: { src: string; alt: string; position?: string };
  href: string;
};

const MIN_CARD_HEIGHT = 450;
const MIN_IMAGE_GAP = 60;
const FIXED_HEIGHT_BREAKPOINT = 1280;

const description =
  "The camp, built on raised wooden decks, is nestled in the water-rich landscape of the Okavango Delta. The main tent houses the reception area, lounge and dining room.";

const trip = (name: string, slug: string, alt: string, position?: string): Trip => ({
  name,
  price: "From € 899/-",
  rating: 4.5,
  description,
  duration: "14 days",
  route: "Johannesurg to Livingstone",
  image: { src: `/images/trips/${slug}.webp`, alt, position },
  href: "#",
});

const latestTripsData: { title: string; ctaLabel: string; trips: Trip[] } = {
  title: "Our latest travel tips!",
  ctaLabel: "Inquiry Now",
  trips: [
    trip("Monachira Camp", "monachira-camp", "Monachira Camp deck at dusk", "trip-image--right"),
    trip("Trauminseln Seychellen", "trauminseln-seychellen", "Turquoise bay in the Seychelles"),
    trip("Xugana Island Lodge", "xugana-island-lodge", "River winding through the Okavango Delta"),
    trip("Camp Moremi", "camp-moremi", "Thatched lounge at Camp Moremi"),
    trip(
      "Adventure Eternal Ice",
      "adventure-eternal-ice",
      "Iceberg with penguins in the Antarctic",
    ),
    trip(
      "Best of the Kimberleys",
      "best-of-the-kimberleys",
      "Raised lodge in the Kimberley",
      "trip-image--left",
    ),
  ],
};

function TripCard({
  trip,
  ctaLabel,
  expanded,
}: {
  trip: Trip;
  ctaLabel: string;
  expanded: boolean;
}) {
  return (
    <article className={cn("trip-card", expanded && "trip-card--expanded")}>
      <div className="trip-image-wrap">
        <Image
          src={trip.image.src}
          alt={trip.image.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 90vw"
          className={cn("trip-image", trip.image.position)}
        />
      </div>

      <div className="trip-panel">
        <div className="trip-head">
          <div className="trip-rating">
            <span className="trip-icon">
              <Image
                src="/images/icons/rating-stars.svg"
                width={90}
                height={18}
                alt={`Rated ${trip.rating} out of 5`}
              />
            </span>
            <span className="trip-rating-value">{trip.rating}</span>
          </div>
          <div className="trip-title-row">
            <h3 className="trip-name">{trip.name}</h3>
            <p className="trip-price">{trip.price}</p>
          </div>
        </div>

        <div className="trip-collapse">
          <div className="trip-collapse-inner">
            <p className="trip-description">{trip.description}</p>
          </div>
        </div>

        <ul className="trip-meta">
          <li className="trip-meta-item">
            <span className="trip-icon">
              <Image
                src="/images/icons/suitcase.svg"
                width={18}
                height={18}
                alt=""
                aria-hidden="true"
              />
            </span>
            {trip.duration}
          </li>
          <li className="trip-meta-item">
            <span className="trip-icon">
              <Image
                src="/images/icons/map-pin.svg"
                width={18}
                height={18}
                alt=""
                aria-hidden="true"
              />
            </span>
            {trip.route}
          </li>
        </ul>

        <div className="trip-collapse">
          <div className="trip-collapse-inner">
            <Button href={trip.href} ariaLabel={`${ctaLabel}: ${trip.name}`} className="trip-cta">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LatestTrips() {
  const { trips, title, ctaLabel } = latestTripsData;
  const fillRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const syncCardHeights = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = [...slider.querySelectorAll<HTMLElement>(".trip-card")];
    cards.forEach((card) => (card.style.height = ""));
    if (window.innerWidth >= FIXED_HEIGHT_BREAKPOINT) return;

    const expandedHeights = cards.map((card) => {
      const panel = card.querySelector<HTMLElement>(".trip-panel");
      const head = card.querySelector<HTMLElement>(".trip-head");
      if (!panel || !head) return 0;
      let panelHeight = panel.offsetHeight;
      card.querySelectorAll<HTMLElement>(".trip-collapse").forEach((collapse) => {
        const inner = collapse.firstElementChild as HTMLElement | null;
        panelHeight += (inner?.scrollHeight ?? 0) - collapse.offsetHeight;
      });
      panelHeight += 15 - parseFloat(getComputedStyle(head).rowGap || "0");
      return panelHeight + parseFloat(getComputedStyle(card).paddingBottom) + MIN_IMAGE_GAP;
    });

    const height = Math.max(MIN_CARD_HEIGHT, Math.round(Math.max(...expandedHeights)));
    cards.forEach((card) => (card.style.height = `${height}px`));
  }, []);

  useEffect(() => {
    syncCardHeights();
    const observer = new ResizeObserver(syncCardHeights);
    if (sliderRef.current) observer.observe(sliderRef.current);
    document.fonts?.ready.then(syncCardHeights);
    return () => observer.disconnect();
  }, [syncCardHeights]);

  const updateProgress = (index: number) => {
    if (fillRef.current) fillRef.current.style.width = `${((index + 1) / trips.length) * 100}%`;
  };

  return (
    <section
      id="latest-travel-tips"
      className="latest-trips general-spacing"
      aria-labelledby="latest-trips-title"
    >
      <Container>
        <Heading level={2} className="latest-trips-title">
          <span id="latest-trips-title">{title}</span>
        </Heading>

        <div ref={sliderRef} onMouseLeave={() => setExpandedIndex(0)}>
          <Swiper
            className="latest-trips-swiper"
            slidesPerView={1.1}
            spaceBetween={20}
            loop
            breakpoints={{
              768: { slidesPerView: 1.8 },
              1024: { enabled: false, loop: false },
            }}
            onInit={(swiper) => updateProgress(swiper.realIndex)}
            onSlideChange={(swiper) => updateProgress(swiper.realIndex)}
            onBreakpoint={restoreSlideOrder}
          >
            {trips.map((item, i) => (
              <SwiperSlide
                key={item.name}
                className="latest-trips-slide"
                onMouseEnter={() => setExpandedIndex(i)}
                onFocus={() => setExpandedIndex(i)}
              >
                <TripCard trip={item} ctaLabel={ctaLabel} expanded={expandedIndex === i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="latest-trips-progress" aria-hidden="true">
          <span ref={fillRef} className="latest-trips-progress-fill" />
        </div>
      </Container>
    </section>
  );
}
