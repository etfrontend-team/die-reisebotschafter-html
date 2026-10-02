import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Prose from "@/components/ui/Prose";
import { cn } from "@/utils/cn";

type TravelType = {
  label: string;
  href: string;
  image: { src: string; alt: string };
};

const travelTypesData: {
  title: string;
  intro: string;
  cta: { label: string; href: string };
  types: TravelType[];
} = {
  title: "Browse by Travel Type",
  intro:
    "Could it be a coincidence that we are called the travel ambassadors? We don't think so, because we can promise you WE WERE THERE and we know the place.",
  cta: { label: "View All Types", href: "#" },
  types: [
    {
      label: "Camper / Motorhome",
      href: "#",
      image: {
        src: "/images/travel-types/camper-motorhome.webp",
        alt: "Traveller beside a motorhome in the mountains",
      },
    },
    {
      label: "Rail Travel",
      href: "#",
      image: { src: "/images/travel-types/rail-travel.webp", alt: "Train winding through hills" },
    },
    {
      label: "Rental car",
      href: "#",
      image: { src: "/images/travel-types/rental-car.webp", alt: "Off-road car on a desert track" },
    },
    {
      label: "Group travel",
      href: "#",
      image: { src: "/images/travel-types/group-travel.webp", alt: "Pelicans flying over the sea" },
    },
    {
      label: "Diving trips",
      href: "#",
      image: { src: "/images/travel-types/diving-trips.webp", alt: "Diver with a school of fish" },
    },
    {
      label: "Excursions",
      href: "#",
      image: { src: "/images/travel-types/excursions.webp", alt: "Safari jeep crossing a river" },
    },
  ],
};

const MOSAIC_SIZE = 6;

export default function TravelTypes() {
  const { title, intro, cta, types } = travelTypesData;
  const groups = Array.from({ length: Math.ceil(types.length / MOSAIC_SIZE) }, (_, i) =>
    types.slice(i * MOSAIC_SIZE, (i + 1) * MOSAIC_SIZE),
  );

  return (
    <section
      id="types-of-travel"
      className="travel-types general-spacing"
      aria-labelledby="travel-types-title"
    >
      <Container>
        <div className="travel-types-head">
          <Heading level={2} className="travel-types-title">
            <span id="travel-types-title">{title}</span>
          </Heading>
          <div className="travel-types-intro-row">
            <Prose color="grey" className="travel-types-intro">
              {intro}
            </Prose>
            <Button href={cta.href} className="travel-types-cta">
              {cta.label}
            </Button>
          </div>
        </div>

        <div className="travel-types-groups">
          {groups.map((group, groupIndex) => (
            <ul key={groupIndex} className="travel-types-grid">
              {group.map((type, i) => (
                <li
                  key={groupIndex * MOSAIC_SIZE + i}
                  className={cn("travel-type", `travel-type--pos-${i + 1}`)}
                >
                  <Link
                    href={type.href}
                    role="link"
                    target="_self"
                    aria-label={type.label}
                    className="travel-type-card"
                  >
                    <span className="travel-type-image-wrap">
                      <Image
                        src={type.image.src}
                        alt={type.image.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="travel-type-image"
                      />
                    </span>
                    <span className="travel-type-label">{type.label}</span>
                    <span className="travel-type-arrow" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Container>
    </section>
  );
}
