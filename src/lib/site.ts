export const SITE = {
  name: "S.S. WoodCraft Private Limited",
  short: "S.S. WoodCraft",
  tagline: "Quality You Deserve. Trust We Build.",
  founder: "Saddam",
  founderTitle: "Founder & Managing Director",
  address: "Karanpur Lalpur Road, Moradabad – 244001 (U.P.), India",
  phones: ["+91 96342 05105", "+91 95556 93396"],
  whatsapp: "https://wa.me/919634205105",
  mapEmbed:
    "https://www.google.com/maps?q=Karanpur+Lalpur+Road,+Moradabad,+244001,+Uttar+Pradesh,+India&output=embed",
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  "Complete Interior Work",
  "House Interior",
  "Office Interior",
  "Modular Furniture",
  "Door & Window Manufacturing",
  "PVC Panel Installation",
  "Vanity Manufacturing",
  "Custom Woodwork",
  "Site Measurement",
  "Project Execution",
];

export const WHY_US = [
  {
    title: "Premium Quality Timber",
    text: "Kiln-seasoned hardwood, graded and inspected before it reaches the bench.",
  },
  {
    title: "Experienced Workforce",
    text: "Carpenters and finishers who have spent decades shaping wood by hand.",
  },
  {
    title: "Modern Manufacturing",
    text: "Machine-calibrated cutting and edge banding for factory-grade accuracy.",
  },
  {
    title: "Customized Designs",
    text: "Every unit drawn around your room, your storage and your taste.",
  },
  {
    title: "Affordable Pricing",
    text: "Transparent, itemised quotations with no surprise additions later.",
  },
  {
    title: "Timely Delivery",
    text: "Committed schedules, tracked stage by stage until handover.",
  },
  {
    title: "Professional Installation",
    text: "Clean, supervised site fitting with a final quality walkthrough.",
  },
];
