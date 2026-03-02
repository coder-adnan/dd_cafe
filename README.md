# ☕ DD Cafe

A premium, bilingual (English / Arabic) cafe website for **DD Cafe — Riyadh's Cozy Coffee Destination**. Built with Next.js 16, featuring a cinematic homepage, interactive menu with cart, and an admin analytics dashboard.

---

## Features

- **Bilingual (i18n)** — Full English & Arabic support with automatic RTL layout switching.
- **Cinematic Homepage** — Hero section, signature drinks showcase, barista profiles, Instagram gallery, and testimonials carousel.
- **Interactive Menu** — Filterable menu grid with add-to-cart functionality.
- **Admin Dashboard** — Sales analytics, order management, and menu inventory powered by Recharts.
- **Responsive Design** — Mobile-first layout with animated hamburger menu navigation.
- **Premium Aesthetics** — Glassmorphism, smooth animations via Framer Motion, and curated typography (Inter + Playfair Display).

---

## Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router, SSG)               |
| Language    | TypeScript 5                                                      |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com)                         |
| UI Library  | [shadcn/ui](https://ui.shadcn.com) (Radix UI + CVA)              |
| Animations  | [Framer Motion](https://www.framer.com/motion/)                   |
| Charts      | [Recharts](https://recharts.org)                                  |
| Icons       | [Lucide React](https://lucide.dev)                                |
| Fonts       | Inter, Playfair Display (via `next/font`)                         |

---

## Project Structure

```
dd_cafe/
├── public/                     # Static assets (images, favicon)
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles & design tokens
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   └── [lang]/             # Locale-based routing (en / ar)
│   │       ├── layout.tsx      # Lang layout (navbar, footer, direction)
│   │       ├── (main)/
│   │       │   ├── page.tsx    # Homepage
│   │       │   └── menu/
│   │       │       └── page.tsx # Menu page
│   │       └── admin/
│   │           └── page.tsx    # Admin dashboard
│   ├── components/
│   │   ├── navbar.tsx          # Responsive navbar with mobile menu
│   │   ├── footer.tsx          # Site footer
│   │   ├── language-switcher.tsx
│   │   ├── direction-setter.tsx # RTL/LTR direction handler
│   │   └── ui/                 # shadcn/ui primitives (Button, Card, Tabs, etc.)
│   ├── dictionaries/
│   │   ├── en.json             # English translations
│   │   └── ar.json             # Arabic translations
│   ├── i18n.ts                 # Locale config & dictionary loader
│   ├── middleware.ts           # Locale redirect middleware
│   └── lib/
│       └── utils.ts            # Utility helpers (cn, etc.)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dd_cafe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   Navigate to [http://localhost:3000](http://localhost:3000). You will be automatically redirected to `/en` (English).

   To view the Arabic version, visit [http://localhost:3000/ar](http://localhost:3000/ar).

---

## Available Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the development server               |
| `npm run build`   | Create an optimized production build        |
| `npm run start`   | Serve the production build locally          |
| `npm run lint`    | Run ESLint across the project              |

---

## Internationalization

The app supports **English** (`en`) and **Arabic** (`ar`) via file-based routing under `src/app/[lang]/`.

- Translation files live in `src/dictionaries/`.
- Middleware in `src/middleware.ts` auto-redirects bare URLs to the default locale (`en`).
- The `LanguageSwitcher` component allows users to toggle between languages.
- Arabic pages automatically switch to **RTL** layout direction.

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new):

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import the project on Vercel.
3. Vercel auto-detects Next.js — no extra config needed.

### Self-Hosted

```bash
npm run build
npm run start
```

The production server will start on port `3000` by default.

---

## License

This project is private and proprietary.
