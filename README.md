# Satyam Pal — Developer Portfolio

A premium, modern developer portfolio built with React 18, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 2. Installation & Development

```bash
# Clone the repository and enter the project folder
git clone https://github.com/Satyam-Pal18/satyam-portfolio.git
cd satyam-portfolio

# Install project dependencies
npm install

# Start local Vite development server (default: http://localhost:5173)
npm run dev
```

### 3. Production Build & Preview

```bash
# Compile and optimize for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

---

## 🔑 Environment Configuration

The contact form uses [Web3Forms](https://web3forms.com/) for zero-backend email delivery.

### Setup Instructions:
1. Obtain a free access key from [Web3Forms](https://web3forms.com/).
2. Copy the template environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Open `.env.local` and set your key:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

> **Note:**
> - `.env.example` serves as a sanitized version-controlled template demonstrating expected variable names.
> - Never commit your `.env` or `.env.local` files containing actual keys to version control. They are strictly excluded in `.gitignore`.
> - If `VITE_WEB3FORMS_ACCESS_KEY` is not provided, the contact form automatically offers a direct mailto fallback link to ensure visitors can always reach out.

---

## 🎨 Design System & Typography

- **Color Palette:**
  - Background: Black (`#080808` / `#0f0f0f`)
  - Accent: Orange (`#ff7a00` / `#ff9a40`)
  - Text: Clean white with WCAG-compliant contrast levels (`#ffffff`, `rgba(255,255,255,0.7)`)
- **Typography (Google Fonts):**
  - **Display:** `Poppins` (`font-display`) — Headings, brand logo, and emphasis titles
  - **Body:** `Inter` (`font-body`) — Paragraphs, readable content, and UI controls
  - **Monospace:** `Courier Prime` (`font-mono`) — Labels, stats, dates, and code accents
- **Aesthetic:** Dark mode, glassmorphism cards with backdrop blur, fine radial glows, and interactive custom cursor.

---

## 📁 Project Structure

```
satyam-portfolio/
 ┣ public/
 ┃ ┣ favicon.svg       → Portfolio favicon
 ┃ ┣ resume.pdf        → Downloadable resume PDF
 ┃ ┣ robots.txt        → Search crawler instructions
 ┃ ┣ sitemap.xml       → Production search sitemap
 ┃ ┗ projects/         → Project showcase preview images
 ┣ src/
 ┃ ┣ assets/           → Optimized static assets
 ┃ ┣ components/       → Modular UI components (Navbar, Footer, ContactForm, CustomCursor, etc.)
 ┃ ┣ data/             → Structured data models (projects.js, services.js, skills.js)
 ┃ ┣ pages/            → Route pages (Home, About, Projects, Services, Resume, Contact, NotFound)
 ┃ ┣ App.jsx           → Router, global layout, and scroll-to-top behavior
 ┃ ┣ index.css         → Tailwind directives, utility classes, and custom keyframes
 ┃ ┗ main.jsx          → React root entry point
 ┣ .env.example        → Sanitized environment variable template
 ┣ .gitignore          → Git ignore rules for node_modules, build outputs, and env files
 ┣ index.html          → HTML entry point with metadata & preconnected fonts
 ┣ package.json        → Project manifest and npm scripts
 ┣ tailwind.config.js  → Custom design tokens and animation extensions
 ┗ vite.config.js      → Vite build configuration
```

---

## 📦 Tech Stack

| Package | Version | Purpose |
|---|---|---|
| **React** | 18.3.1 | Core UI component framework |
| **Vite** | 5.3.1 | Blazing-fast build tool and dev server |
| **Tailwind CSS** | 3.4.4 | Utility-first CSS design system |
| **Framer Motion** | 11.0.0 | Page transitions and spring physics micro-interactions |
| **React Router DOM** | 6.23.1 | Single-page client-side routing |
| **React Icons** | 5.2.1 | Lightweight, curated icon packs (`fi`, `fa6`, `si`, `hi2`) |

---

## 🔧 Customisation Guide

1. **Personal Information & Experience:** Update data in `src/data/projects.js`, `src/data/skills.js`, and `src/data/services.js`.
2. **Resume Download:** Place your up-to-date resume in `public/resume.pdf`.
3. **Contact & Social Links:** Update email, LinkedIn, GitHub, and WhatsApp links in `src/components/Footer.jsx` and `src/pages/Contact.jsx`.
4. **Site Metadata & SEO:** Customize title, meta description, and social graph tags in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.

---

Built with ❤️ by [Satyam Pal](https://github.com/Satyam-Pal18)
