import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import NewsletterForm from "@/components/shared/NewsletterForm";

type FooterLink = { label: string; href: string };

const footerData: {
  logo: { src: string; alt: string };
  intro: string;
  columns: { title: string; links: FooterLink[] }[];
  newsletterTitle: string;
  copyright: string;
  legal: FooterLink[];
} = {
  logo: { src: "/images/footer-logo.png", alt: "Die Reisebotschafter – Wir waren da" },
  intro: "For over 40 years, we’ve created personalized journeys to destinations we know and love.",
  columns: [
    {
      title: "Destinations",
      links: [
        { label: "Africa", href: "#" },
        { label: "Antarctic", href: "#" },
        { label: "Indian Ocean", href: "#" },
        { label: "North America", href: "#" },
        { label: "Oceania", href: "#" },
        { label: "Latin America", href: "#" },
        { label: "South Seas", href: "#" },
      ],
    },
    {
      title: "About us",
      links: [
        { label: "About the Travel Amabassadors", href: "#" },
        { label: "Agency Support", href: "#" },
        { label: "Our Travel reports", href: "#" },
        { label: "Travel Insurance", href: "#" },
        { label: "Accessibility Statement", href: "#" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Our Offices", href: "#" },
        { label: "Our Team", href: "#" },
        { label: "Catalog", href: "#" },
      ],
    },
  ],
  newsletterTitle: "Join our newsletter",
  copyright:
    "© Wildside Botswana | The Travel Ambassadors - Your expert for individual long-distance travel",
  legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

function FooterTitle({ children }: { children: string }) {
  return (
    <Heading level={2} size={5} color="white" className="footer-title">
      {children}
    </Heading>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-card">
        <div className="footer-top">
          <div className="footer-brand">
            <Link
              href="/"
              role="link"
              target="_self"
              aria-label="Die Reisebotschafter – home"
              className="footer-logo-wrap"
            >
              <Image
                src={footerData.logo.src}
                alt={footerData.logo.alt}
                width={384}
                height={384}
                sizes="96px"
                loading="lazy"
                className="footer-logo"
              />
            </Link>
            <p className="footer-intro">{footerData.intro}</p>
          </div>

          <div className="footer-links">
            {footerData.columns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="footer-column">
                <FooterTitle>{column.title}</FooterTitle>
                <ul className="footer-list">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        role="link"
                        target="_self"
                        aria-label={link.label}
                        className="footer-link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="footer-newsletter">
              <FooterTitle>{footerData.newsletterTitle}</FooterTitle>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{footerData.copyright}</p>
          <ul className="footer-legal">
            {footerData.legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  role="link"
                  target="_self"
                  aria-label={link.label}
                  className="footer-legal-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
