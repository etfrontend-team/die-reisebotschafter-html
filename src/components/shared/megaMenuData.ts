import type { MegaMenuData, MegaMenuItem } from "@/components/shared/MegaMenu";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

const type = (label: string, imageId: string, alt: string): MegaMenuItem => ({
  label,
  href: "#",
  image: { src: unsplash(imageId), alt },
});

export const destinationsMenu: MegaMenuData = {
  layout: "nested",
  items: [
    {
      label: "Africa",
      href: "#",
      image: { src: unsplash("1546182990-dffeafbe841d"), alt: "Lion in the African savanna" },
      children: [
        { label: "Botswana", href: "#" },
        { label: "Kenya", href: "#" },
        { label: "Malawi", href: "#" },
        { label: "Namibia", href: "#" },
        { label: "South Africa", href: "#" },
        { label: "Tanzania", href: "#" },
        { label: "Uganda/Rwanda", href: "#" },
        { label: "Zambia", href: "#" },
        { label: "Zimbabwe", href: "#" },
      ],
    },
    {
      label: "Antarctic",
      href: "#",
      image: { src: unsplash("1551415923-a2297c7fda79"), alt: "Penguins on Antarctic snow" },
      children: [
        { label: "Antarctic Peninsula", href: "#" },
        { label: "Falkland Islands", href: "#" },
        { label: "South Georgia", href: "#" },
        { label: "Ross Sea", href: "#" },
      ],
    },
    {
      label: "Australia",
      href: "#",
      image: { src: unsplash("1506973035872-a4ec16b8e8d9"), alt: "Sydney harbour and skyline" },
      children: [
        { label: "New South Wales", href: "#" },
        { label: "Northern Territory", href: "#" },
        { label: "Queensland", href: "#" },
        { label: "South Australia", href: "#" },
        { label: "Tasmania", href: "#" },
        { label: "Victoria", href: "#" },
        { label: "Western Australia", href: "#" },
      ],
    },
    {
      label: "Indian Ocean",
      href: "#",
      image: {
        src: unsplash("1514282401047-d79a71a590e8"),
        alt: "Overwater villas in the Maldives",
      },
      children: [
        { label: "Madagascar", href: "#" },
        { label: "Maldives", href: "#" },
        { label: "Mauritius", href: "#" },
        { label: "Réunion", href: "#" },
        { label: "Seychelles", href: "#" },
        { label: "Sri Lanka", href: "#" },
      ],
    },
    {
      label: "Latin America",
      href: "#",
      image: { src: unsplash("1526392060635-9d6019884377"), alt: "Machu Picchu in the Andes" },
      children: [
        { label: "Argentina", href: "#" },
        { label: "Brazil", href: "#" },
        { label: "Chile", href: "#" },
        { label: "Costa Rica", href: "#" },
        { label: "Ecuador/Galápagos", href: "#" },
        { label: "Mexico", href: "#" },
        { label: "Peru", href: "#" },
      ],
    },
    {
      label: "New Zealand",
      href: "#",
      image: { src: unsplash("1507699622108-4be3abd695ad"), alt: "Auckland skyline at dusk" },
      children: [
        { label: "North Island", href: "#" },
        { label: "South Island", href: "#" },
      ],
    },
    {
      label: "North America",
      href: "#",
      image: {
        src: unsplash("1501594907352-04cda38ebc29"),
        alt: "Golden Gate Bridge, San Francisco",
      },
      children: [
        { label: "Alaska", href: "#" },
        { label: "Canada", href: "#" },
        { label: "Hawaii", href: "#" },
        { label: "USA East", href: "#" },
        { label: "USA West", href: "#" },
      ],
    },
    {
      label: "South Seas",
      href: "#",
      image: {
        src: unsplash("1505881502353-a1986add3762"),
        alt: "Wooden jetty to a tropical island",
      },
      children: [
        { label: "Cook Islands", href: "#" },
        { label: "Fiji", href: "#" },
        { label: "French Polynesia", href: "#" },
        { label: "Samoa", href: "#" },
        { label: "Tonga", href: "#" },
      ],
    },
  ],
};

export const travelTypesMenu: MegaMenuData = {
  layout: "columns",
  columns: [
    [
      type(
        "Excursions",
        "1527631746610-bca00a040d60",
        "Traveller walking through an old town street",
      ),
      type("Rail travel", "1474487548417-781cb71495f3", "Train on the tracks"),
      type("Camper/Motorhome", "1523987355523-c7b5b0dd90a7", "Vintage camper at dusk"),
      type("Rental Car", "1449965408869-eaa3f722e40d", "Hand on a steering wheel at sunset"),
      type("Group Travel", "1529156069898-49953e39b3ac", "Group of friends looking at the view"),
      type("Diving trips", "1544551763-46a013bb70d5", "Diver with a school of fish"),
      type("Flying safaris", "1436491865332-7a61a109cc05", "Aeroplane wing above the clouds"),
      type("Cruises", "1548574505-5e239809ee19", "Cruise ships in a turquoise harbour"),
      type("Island combinations", "1559128010-7c1ad6e1b6a5", "Green island in clear water"),
    ],
    [
      type("Active holidays", "1530549387789-4c1017266635", "Swimmer in a pool"),
      type("Rental car trips", "1500530855697-b586d89ba3ee", "Open road through red rocks"),
      type("Accommodation", "1566073771259-6a8506099945", "Lodge with a pool deck"),
      type("beach holiday", "1507525428034-b723cf961d3e", "Beach at sunrise"),
      type("Travel from Germany", "1467269204594-9661b134dd2b", "Historic German old town"),
      type("Camping trips", "1504280390367-361c6d9f38f4", "View from inside a tent"),
      type("Cycling tours", "1541625602330-2277a4c46182", "Cyclists on a coastal road"),
      type("Short tours", "1488085061387-422e29b40080", "Aeroplane window at sunset"),
      type("Country combinations", "1476514525535-07fb3b4ae5f1", "Boat on a mountain lake"),
    ],
    [
      type(
        "Privately guided tours",
        "1488646953014-85cb44e25828",
        "Map, camera and travel notebook",
      ),
      type("Small group tours", "1522202176988-66273c2fd55f", "Small group planning a trip"),
      type("Family trips", "1511895426328-dc8714191300", "Family on the beach at sunset"),
      type("Safaris", "1516426122078-c23e76319801", "Safari jeep at sunset"),
      type("Sailing tours", "1500514966906-fe245eea9344", "Sailing boat on shallow water"),
      type("Hiking trips", "1551632811-561732d1e306", "Hikers on a mountain trail"),
      type("World travel", "1469854523086-cc02fe5d8800", "Camper van on a desert road"),
    ],
  ],
};
