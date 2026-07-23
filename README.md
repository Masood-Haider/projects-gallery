# Masood Haider — Portfolio

A modern, full-stack portfolio website built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**. Features an admin dashboard for managing projects dynamically — no database needed.

---

## ✨ Features

- **🎨 Modern UI** — Dark theme with glass effects and gradient accents
- **📱 Fully Responsive** — Beautiful on all screen sizes
- **🔐 Admin Dashboard** — Password-protected project management
- **🗂️ Project Categories** — Frontend and Full Stack filters
- **📸 Screenshot Gallery** — Showcase multiple project images
- **🚀 Live Demo Links** — Conditional "View Live" button when deployed
- **💾 In-Memory Storage** — Projects persist during server runtime (no database required)
- **⚡ Server Components** — Fast page loads with Next.js 14
- **🎯 SEO Ready** — Metadata and semantic HTML

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd portfolio
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** to see the website.

### 3. Access Admin Dashboard

Go to **http://localhost:3000/admin**

Default password: `masood@admin2024`

*To change the password, edit `lib/auth.ts` or set the `ADMIN_PASSWORD` environment variable.*

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── (routes)
│   │   ├── page.tsx              # Home page
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects listing
│   │   │   ├── ProjectsClient.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Project detail page
│   │   │       └── ProjectDetailClient.tsx
│   │   ├── about/
│   │   │   └── page.tsx          # About page with CV download
│   │   └── admin/
│   │       ├── layout.tsx        # Admin-only layout
│   │       ├── page.tsx
│   │       └── AdminDashboard.tsx # Full project CRUD
│   ├── api/
│   │   ├── auth/route.ts         # Admin authentication
│   │   └── projects/
│   │       ├── route.ts          # GET all, POST new
│   │       └── [id]/route.ts     # GET, PUT, DELETE by id
│   ├── layout.tsx                # Root layout with Navbar + Footer
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SocialIcons.tsx
│   └── ProjectCard.tsx
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── store.ts                  # In-memory project storage
│   ├── auth.ts                   # Password check
│   └── social.ts                 # Social media links config
├── public/
│   └── cv/                       # Place your CV PDF here
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 🔧 Configuration

### Social Media Links

Edit **`lib/social.ts`** to update your social links:

```ts
export const socialLinks = [
  { name: "GitHub", url: "https://github.com/masoodhaider", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/masoodhaider", icon: "linkedin" },
  // ...
];
```

### Admin Password

Edit **`lib/auth.ts`** or set an environment variable:

```ts
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "masood@admin2024";
```

### CV Download

Place your CV PDF in `public/cv/masood-haider-cv.pdf` and update the href in `app/about/page.tsx` if needed.

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variable `ADMIN_PASSWORD` (optional)
4. Deploy!

> **Note:** Projects added via the admin dashboard will be lost on serverless redeployments. For production persistence, replace the in-memory store (`lib/store.ts`) with a file-based solution or database.

---

## 🎨 Customization

### Colors

Edit **`tailwind.config.ts`** to change the brand colors:

```ts
colors: {
  brand: {
    500: "#6366f1", // Primary color
    // ...
  }
}
```

### Fonts

Update the `@import` in **`app/globals.css`** to use a different Google Font.

### Seed Projects

Edit the `seedProjects` array in **`lib/store.ts`** to customize the initial projects shown before you add your own.

---

## 🛠️ Tech Stack

- **[Next.js 14](https://nextjs.org/)** — React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Lucide React](https://lucide.dev/)** — Icon library (planned)
- **[Vercel](https://vercel.com/)** — Recommended deployment platform

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Masood Haider**

- Portfolio: [masoodhaider.com](https://masoodhaider.com) *(update with your URL)*
- GitHub: [@masoodhaider](https://github.com/masoodhaider)
- LinkedIn: [masoodhaider](https://linkedin.com/in/masoodhaider)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/masoodhaider/portfolio/issues).

---

Made with ❤️ using Next.js and Tailwind CSS
