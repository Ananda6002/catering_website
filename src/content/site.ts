/**
 * Central business configuration — replace these sample values with the real
 * business details once provided. Everything on the site reads from here.
 *
 * NOTE: nothing sensitive belongs here; keep secrets in env vars.
 */

export const site = {
  name: "Saffron & Sage",
  tagline: "Catering & Event Craft",
  legalName: "Saffron & Sage Catering Co.",
  description:
    "Bespoke catering for weddings, corporate gatherings and family celebrations. Seasonal menus, gracious service, unforgettable tables.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappNumber: "919876543210",
  email: "hello@saffronandsage.test",
  city: "Bengaluru",
  addressLine: "12 Lavelle Road, Bengaluru 560001",
  mapUrl: "https://maps.google.com/?q=Lavelle+Road+Bengaluru",
  hours: [
    { days: "Monday — Friday", time: "9:00 am – 7:00 pm" },
    { days: "Saturday", time: "10:00 am – 5:00 pm" },
    { days: "Sunday", time: "By appointment" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
};

/** Pre-filled WhatsApp enquiry message */
export function whatsappMessage(eventType?: string) {
  const base = `Hello ${site.name}! I'd like to enquire about catering`;
  return eventType
    ? `${base} for a ${eventType}.`
    : `${base} for an upcoming event.`;
}

export function whatsappLink(eventType?: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage(eventType)
  )}`;
}

/** File paths for the future real logo — swap these when the logo arrives. */
export const logoAssets = {
  /** drop the real logo file at /public/logo.svg and update nothing else */
  src: "/logo.svg",
  alt: `${site.name} logo`,
};
