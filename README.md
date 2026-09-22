# Saffron & Sage — Catering Website

A clean, modern marketing website for a catering business built with **Next.js**, **TypeScript**, and **Tailwind CSS**.


---

## 🚀 Quick Start

Run these commands in your terminal:

```bash
npm install        # Install all project dependencies
npm run dev        # Start development server at http://localhost:3000
npm run build      # Build website for production
npm run start      # Run production build locally
npm run typecheck  # Check TypeScript for errors
```

---

## 📝 How to Update Website Content

You do not need to touch component code to change website text or details. All content is saved in simple TypeScript files inside `src/content/`.

### 1. Business Info & Contact Details
📁 `src/content/site.ts`
- Update business name, tagline, phone number, WhatsApp number, email, physical address, Google Maps link, and social media links.
- Every component (Navbar, Footer, Contact page, Call/WhatsApp floating buttons) updates automatically.

### 2. Logo
1. Put your logo file inside the `public/` folder (e.g., `public/logo.svg`).
2. Update the logo path in `src/content/site.ts` (`logoAssets.src = "/logo.svg"`).
3. If replacing the text mark with an `<img>` tag, update `src/components/ui/Logo.tsx`.

### 3. Menu & Pricing
📁 `src/content/menu.ts`
- Add, edit, reorder, or delete dishes and categories.
- Set dish prices or omit them to show "Price on request".

### 4. Services, Packages, Reviews & Gallery
📁 `src/content/collections.ts`
- **Packages:** Change guest limits, featured items, and pricing.
- **Services:** Set descriptions and optional photo links.
- **Gallery:** Add real photo paths (e.g., `image: "/photos/event1.jpg"`). The website will automatically replace placeholder art with your photo.
- **Testimonials:** Replace sample reviews with real customer feedback.

---

## 🎨 Design & Styling

- **Theme Colors:** All colors (Parchment, Ink, Saffron) are set as CSS variables in `src/app/globals.css`. You can change them anytime.
- **Fonts:** Display serif (Cormorant Garamond) + Body sans (Jost) configured in `src/app/layout.tsx`.

---

## ✉️ Contact & Quote Form Setup

- The quote request form submits data to `src/app/api/quote/route.ts`.
- To receive emails or store inquiries, connect `persistEnquiry()` in that file to an email service (like Resend, Nodemailer, or AWS SES) or a database. Keep secret keys in `.env`.

---

## ✨ Features & Performance

- **Fully Responsive:** Mobile navigation menu, direct WhatsApp & Call buttons.
- **Fast & Accessible:** Includes keyboard navigation, smooth motion support, inline icons, and fast load times.
