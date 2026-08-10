# WoodCraft Showcase

Build a professional, premium business website for a wood & interior design company called "S.S. WoodCraft Private Limited."

BRAND IDENTITY

- Company: S.S. WoodCraft Private Limited

- Founder & Managing Director: Saddam

- Tagline: "Quality You Deserve. Trust We Build."

- Address: Karanpur Lalpur Road, Moradabad – 244001 (U.P.), India

- Phone: +91 96342 05105 and +91 95556 93396 (make both click-to-call on mobile, and add a floating WhatsApp button linking to https://wa.me/919634205105)

- Color palette: deep forest green (#0d3d2e or similar), warm gold/brass (#d4af37), cream/ivory background (#f8f5ef), with dark walnut wood-tone accents. This should feel premium, warm, and crafted — not generic SaaS. Use elegant serif or semi-serif headings paired with a clean sans-serif body font.

- Overall visual mood: warm ambient lighting, marble countertops, glossy modular cabinetry, gold hardware — like high-end Indian interior design portfolios.

PAGES / SECTIONS (single-page site with smooth-scroll anchor nav, unless noted)

1. HEADER

   - Logo text "S.S. WoodCraft" with a small leaf/wood icon

   - Nav: Home, About, Products, Services, Gallery, Why Us, Contact

   - Phone number visible in header, "Get a Quote" CTA button

2. HERO SECTION

   - Full-width background image slot (I will upload a real photo of a finished kitchen)

   - Headline: "Crafting Timber into Timeless Interiors"

   - Subheadline: "Premium wooden doors, windows, PVC panels & complete interior works — built to last."

   - Two CTA buttons: "View Our Work" (scrolls to Gallery) and "Get a Free Quote" (scrolls to Contact)

3. ABOUT SECTION

   - Short intro about S.S. WoodCraft, founder Saddam, and the business (timber, wooden door frames, windows, doors, PVC panels, vanity & full interior works)

   - Include a founder highlight card with name, title "Founder & Managing Director," and a placeholder circular photo

4. PRODUCTS SECTION (grid of cards, 3-4 per row desktop, 1-2 mobile)

   Display these as product cards with an icon or image placeholder, name, and one-line description:

   - Wooden Door Frames (चौखट)

   - Wooden Doors

   - Wooden Windows

   - Ventilators

   - PVC Wall Panels

   - Modular Vanity

   - Wooden Interior

   - TV Units

   - Wardrobes

   - Modular Furniture

   - Custom Furniture

   - Timber Supply

   IMPORTANT: This product grid must pull its data from a Supabase table called "products" (fields: id, name, description, image_url, category, display_order, is_active) rather than being hardcoded, so it can be managed from an admin panel (see ADMIN PANEL section below). Seed the table with the 12 products listed above on first load.

5. SERVICES SECTION

   List with checkmark icons:

   - Complete Interior Work

   - House Interior

   - Office Interior

   - Modular Furniture

   - Door & Window Manufacturing

   - PVC Panel Installation

   - Vanity Manufacturing

   - Custom Woodwork

   - Site Measurement

   - Project Execution

6. WHY CHOOSE US SECTION

   Icon + short text cards for:

   - Premium Quality Timber

   - Experienced Workforce

   - Modern Manufacturing

   - Customized Designs

   - Affordable Pricing

   - Timely Delivery

   - Professional Installation

7. GALLERY / OUR WORK SECTION

   A masonry or responsive grid photo gallery showcasing completed projects (kitchens, bedrooms, bathroom vanities, wooden partitions/TV units). Use lightbox-style click-to-enlarge. Like the products grid, this must also pull images from a Supabase table called "gallery" (fields: id, title, image_url, category, display_order, is_active) so new project photos can be added later without touching code.

8. CONTACT SECTION

   - Company address, both phone numbers, a simple contact form (name, phone, message — store submissions in a Supabase table "inquiries"), and an embedded Google Map placeholder for Karanpur Lalpur Road, Moradabad

   - WhatsApp and Call Now buttons repeated here

9. FOOTER

   - Company name, tagline, quick links, phone numbers, address, and "© [current year] S.S. WoodCraft Private Limited. All rights reserved."

ADMIN PANEL (this is important — my client needs to manage this himself later without a developer)

- Create a route /admin with a simple login screen using Supabase Auth (email + password). Create one initial admin user during setup.

- After logging in, the admin should land on a dashboard with two tabs: "Products" and "Gallery."

- In each tab, show the existing items in a table/list with thumbnail, name/title, and category.

- Allow: Add New (upload an image directly to Supabase Storage, plus enter name/title, description, category, display order), Edit existing item, Delete item, and a toggle to show/hide an item on the live site (is_active).

- Changes made in the admin panel should reflect on the public Home/Products/Gallery sections immediately (or on refresh) without any code changes.

- Keep the admin UI simple, clean, and mobile-friendly since the client may manage it from his phone.

TECHNICAL NOTES

- Fully responsive (mobile-first — many visitors will be on phones)

- Fast-loading, clean code structure

- Use placeholder images for now; I will replace them with real project photos after generation

- Smooth scroll navigation, subtle fade-in animations on scroll for sections

- SEO-friendly page title: "S.S. WoodCraft Private Limited | Wooden Doors, Windows, PVC Panels & Interior Works in Moradabad"

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://woodcraft-studio-manager.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0469ca78-3d60-4d16-b31e-869743b8aa9e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
