"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Prose from "@/components/ui/Prose";
import { cn } from "@/utils/cn";
import { restoreSlideOrder } from "@/utils/swiper";

type Destination = {
  name: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
};

const destinationCardsData: {
  title: string;
  intro: string;
  cta: { label: string; href: string };
  destinations: Destination[];
} = {
  title: "Individual travel in a personal way",
  intro:
    "For over 40 years we have been planning individual trips to Australia, New Zealand, Africa, the South Pacific and many other regions worldwide.",
  cta: { label: "View All Destinations", href: "#" },
  destinations: [
    {
      name: "Indian Ocean",
      description:
        "Powder-white beaches, granite boulders and turquoise lagoons – the islands of the Indian Ocean are pure relaxation.Powder-white beaches, granite boulders and turquoise lagoons – the islands of the Indian Ocean are pure relaxation.Powder-white beaches, granite boulders and turquoise lagoons – the islands of the Indian Ocean are pure relaxation.Powder-white beaches, granite boulders and turquoise lagoons – the islands of the Indian Ocean are pure relaxation.",
      href: "#",
      image: {
        src: "/images/destinations/indian-ocean.webp",
        alt: "Granite rocks on a beach in the Seychelles",
      },
    },
    {
      name: "South America",
      description:
        "Ancient Inca cities, mighty Andes peaks and vibrant cultures – South America is a continent full of wonders.",
      href: "#",
      image: {
        src: "/images/destinations/south-america.webp",
        alt: "Terraces of Machu Picchu in Peru",
      },
    },
    {
      name: "Africa",
      description:
        "Time moves differently in Africa – let your soul unwind and enjoy the feeling of unlimited freedom amidst unique wildlife.",
      href: "#",
      image: {
        src: "/images/destinations/africa.webp",
        alt: "Elephant and zebra on the savanna in Kenya",
      },
    },
    {
      name: "Antarctic",
      description:
        "Endless ice, towering glaciers and curious penguins – an expedition to the Antarctic stays with you forever.",
      href: "#",
      image: {
        src: "/images/destinations/antarctic.webp",
        alt: "Traveller in a red jacket overlooking Antarctic ice",
      },
    },
    {
      name: "Australia",
      description:
        "Red outback, rugged coastlines and cosmopolitan cities – Australia is the ultimate road trip destination.",
      href: "#",
      image: {
        src: "/images/destinations/australia.webp",
        alt: "Twelve Apostles cliffs on the Great Ocean Road",
      },
    },
  ],
};

export default function DestinationCards() {
  const { title, intro, cta, destinations } = destinationCardsData;
  const featuredIndex = Math.floor(destinations.length / 2);
  const [expandedIndex, setExpandedIndex] = useState(featuredIndex);
  const [activeSlide, setActiveSlide] = useState(featuredIndex);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  return (
    <section id="destinations" className="destinations" aria-labelledby="destinations-title">
      <span className="destinations-border" aria-hidden="true" />

      <Container>
        <div className="destinations-head">
          <Heading level={2} className="destinations-title">
            <span id="destinations-title">{title}</span>
          </Heading>
          <div className="destinations-intro-row">
            <Prose color="grey" className="destinations-intro">
              {intro}
            </Prose>
            <Button href={cta.href} className="destinations-cta">
              {cta.label}
            </Button>
          </div>
        </div>

        <div onMouseLeave={() => setExpandedIndex(featuredIndex)}>
          <Swiper
            className="destinations-swiper"
            slidesPerView={1.14}
            spaceBetween={20}
            initialSlide={featuredIndex}
            loop
            breakpoints={{
              768: { slidesPerView: 1.8 },
              1024: { enabled: false, loop: false },
            }}
            onSwiper={setSwiper}
            onBreakpoint={restoreSlideOrder}
            onSlideChange={(instance) => setActiveSlide(instance.realIndex)}
          >
            {destinations.map((destination, i) => (
              <SwiperSlide
                key={i}
                className={cn(
                  "destinations-slide",
                  expandedIndex === i && "destinations-slide--expanded",
                )}
                onMouseEnter={() => setExpandedIndex(i)}
              >
                <Link
                  href={destination.href}
                  role="link"
                  target="_self"
                  aria-label={`Discover ${destination.name}`}
                  className="destination-card"
                  onFocus={() => setExpandedIndex(i)}
                >
                  <span className="destination-image-wrap">
                    <Image
                      src={destination.image.src}
                      alt={destination.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 36vw, 90vw"
                      className="destination-image"
                    />
                  </span>

                  <div className="destination-content">
                    <Heading level={3} size={2} color="white" className="destination-name">
                      {destination.name}
                    </Heading>
                    <div className="destination-collapse">
                      <div className="destination-collapse-inner">
                        <Prose
                          size={2}
                          color="white"
                          className="destination-description line-clamp-3"
                        >
                          {destination.description}
                        </Prose>
                        <span className="btn btn-arrow btn-white destination-card-cta">
                          <span className="btn-label">Discover {destination.name}</span>
                          <span className="btn-icon-wrap">
                            <ArrowIcon className="btn-icon" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="destinations-dots">
          {destinations.map((destination, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${destination.name}`}
              aria-current={activeSlide === i || undefined}
              className={cn("destinations-dot", activeSlide === i && "destinations-dot--active")}
              onClick={() => swiper?.slideToLoop(i)}
            />
          ))}
        </div>
      </Container>

      <span className="destinations-border destinations-border--bottom" aria-hidden="true" />
    </section>
  );
}
