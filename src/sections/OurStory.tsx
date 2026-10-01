import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Prose from "@/components/ui/Prose";
import { cn } from "@/utils/cn";

type StoryPhoto = { src: string; alt: string; position: "tl" | "tr" | "bl" | "br" };

const storyData: {
  title: string;
  paragraphs: string[];
  signature: string;
  cta: { label: string; href: string };
  photos: StoryPhoto[];
} = {
  title: "Dear travel enthusiasts,",
  paragraphs: [
    "For over 40 years, our experienced travel ambassadors have personally explored and tested destinations, discovering authentic experiences beyond the beaten track.",
    "We know the places we love, and we turn that knowledge into unforgettable journeys.",
  ],
  signature: "Your travel ambassadors",
  cta: { label: "Meet Our Travel Ambassadors", href: "#" },
  photos: [
    {
      src: "/images/story/traveller-palms.webp",
      alt: "Traveller among palm trees at San Pedrillo",
      position: "tl",
    },
    {
      src: "/images/story/jumping-traveller.webp",
      alt: "Traveller jumping on a red outback road",
      position: "tr",
    },
    {
      src: "/images/story/beach-huts.webp",
      alt: "Thatched beach huts on a white sand beach",
      position: "bl",
    },
    { src: "/images/story/giraffes.webp", alt: "Giraffes on the savanna", position: "br" },
  ],
};

function Photo({ photo }: { photo: StoryPhoto }) {
  return (
    <div className={cn("story-photo", `story-photo--${photo.position}`)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        loading="lazy"
        sizes="(min-width: 1280px) 35vw, 50vw"
        className="story-photo-image"
      />
    </div>
  );
}

export default function OurStory() {
  const [tl, tr, bl, br] = storyData.photos;

  return (
    <section id="our-story" className="story" aria-labelledby="our-story-title">
      <Container>
        <div className="story-layout">
          <div className="story-row story-row--top">
            <Photo photo={tl} />
            <Photo photo={tr} />
          </div>

          <div className="story-text">
            <div className="story-copy">
              <Heading level={2} className="story-title">
                <span id="our-story-title">{storyData.title}</span>
              </Heading>
              <Prose color="grey" className="story-body">
                {storyData.paragraphs}
              </Prose>
              <p className="story-signature">{storyData.signature}</p>
            </div>
            <Button href={storyData.cta.href}>{storyData.cta.label}</Button>
          </div>

          <div className="story-row story-row--bottom">
            <Photo photo={bl} />
            <Photo photo={br} />
          </div>
        </div>
      </Container>
    </section>
  );
}
