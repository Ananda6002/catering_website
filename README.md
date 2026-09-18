# Saffron & Sage — Catering Business Website

A production-quality marketing site for a premium catering business, built with
**Next.js (App Router) + TypeScript + Tailwind CSS v4**.

All business content (name, contact details, menu, packages, testimonials,
gallery entries) is placeholder data living in **one folder** so the real
details can replace it without touching any component.

---

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
```

---

## Replacing the sample business details

### 1. Logo (when the real logo arrives)

1. Drop the logo file into `public/` (e.g. `public/logo.svg`).
2. In `src/content/site.ts`, update:

   ```ts
   export const logoAssets = {
     src: "/logo.svg",
     alt: "Your Business Name logo",
   };
   ```

3. In `src/components/ui/Logo.tsx`, replace the placeholder `<span>` mark with
   an `<img>` using `logoAssets.src`. The layout reserves a stable slot, so
   nothing else needs to change. Also update `site.name`, `site.tagline` and
   `metadata` in `src/app/layout.tsx`.

### 2. Business info

`src/content/site.ts` — name, tagline, phone, WhatsApp number, email, address,
Google Maps link, hours, social links. Every component (navbar, footer, floating
WhatsApp/call buttons, contact page) reads from this file.

### 3. Menu

`src/content/menu.ts` — dishes per category. Add/remove/reorder freely; the
Menu page and homepage preview adapt automatically. Set real `price` values or
leave them out to show “on request”. Categories can be renamed or added.

### 4. Packages, services, events, testimonials, gallery

`src/content/collections.ts`:

- `packages` — replace features/guests, and set a real `price` string or
  "Custom Quote".
- `services` — each has an `image?` field; set it once photos exist.
- `galleryItems` — each has an `image?` field. Drop photos into `public/` and
  set the path; the placeholder art disappears automatically and the lightbox
  shows the real photo.
- `testimonials` — replace the sample reviews with real client quotes.

### 5. Real photographs

Image slots are deliberately reserved boxes with exact aspect ratios
(`4/5`, `16/10`, `3/4`, `1/1`). When real photos arrive:

- gallery items → set `image: "/photos/xyz.jpg"` in `collections.ts`
- hero / story / about / services slots → pass `src` to the `ImageSlot`
  component (it switches from placeholder art to the photo)

No layout changes are needed anywhere.

---

## Design system

- **Tokens:** `src/app/globals.css` — the whole palette (parchment/ink/saffron)
  lives in `@theme` CSS variables. To re-theme to match the real logo, change
  `--color-saffron`, `--color-saffron-deep` and friends.
- **Type:** Cormorant Garamond (display serif) + Jost (body sans), self-hosted
  via Fontsource in `src/app/layout.tsx`.
- **Components:** `src/components/ui/` — buttons, section headings, reveal
  animations, image slots, counters, ornaments.

## Architecture / backend integration

- Frontend is fully static; the only server route is `POST /api/quote`
  (`src/app/api/quote/route.ts`), which validates with the same schema as the
  client (`src/lib/validation.ts`).
- To go live, implement `persistEnquiry()` in that file — forward to email
  (Resend/Nodemailer/SES), a database, or a CRM webhook. Keep any secrets in
  `.env` (never committed).
- A future admin panel (menu/packages/gallery/testimonials management) can
  read/write the content folder or a database; the UI components are generic
  over the data shapes in `src/content/`.

## Quality notes

- Accessibility: labelled controls, `aria` states for tabs/dialogs/carousel,
  keyboard navigation in the lightbox, visible focus rings, and full
  `prefers-reduced-motion` support.
- Performance: no external font/CDN requests; inline SVG ornament art.
- Mobile: purpose-built nav overlay, horizontal snap rail for event types,
  stacked forms, thumb-reachable fixed WhatsApp/call actions.
