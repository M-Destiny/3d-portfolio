# 🚀 3D Portfolio

A high-performance, fully responsive 3D portfolio website built with modern WebGL technologies.

![3D Portfolio](https://img.shields.io/badge/Made%20with-React%20Three%20Fiber-purple)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## ✨ Features

- **Immersive 3D Hero** - Animated floating shapes with React Three Fiber
- **Interactive Skills** - 3D constellation visualization with orbit controls
- **Dynamic Projects** - Auto-fetched from GitHub API
- **Experience Timeline** - Animated scroll-triggered transitions
- **Responsive Design** - Mobile-first, works on all devices
- **Performance Optimized** - Lazy loading, code splitting, 60fps target

## 🛠️ Tech Stack

- **Framework:** React + TypeScript + Vite
- **3D:** Three.js, React Three Fiber, @react-three/drei
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS (custom)
- **Deployment:** Vercel

## 🚀 Live Demo

**Production:** https://3d-portfolio-ebon-rho.vercel.app

## 🏗️ Architecture

```
src/
├── components/       # React components
│   ├── Hero.tsx     # 3D hero section
│   ├── Skills.tsx   # 3D skills constellation
│   ├── Projects.tsx # GitHub repos display
│   ├── Experience.tsx # Timeline
│   ├── Contact.tsx  # CTA & social links
│   └── Navigation.tsx # Navbar
├── hooks/           # Custom hooks
│   └── useGitHubRepos.ts # GitHub API
├── data/            # Static data
│   └── profile.ts   # Profile config
├── types/           # TypeScript types
└── App.tsx          # Main app
```

## 🔧 Setup

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build
```

## 🌿 Branches

- `main` - Production
- `dev` - Development
- `feature/*` - Feature branches

## 📡 GitHub Integration

Projects are automatically fetched from GitHub API. Any public repository will appear on the portfolio.

### Manual Sync

The portfolio fetches repositories client-side. For auto-sync, you can set up GitHub Actions to rebuild on schedule.

## 🔐 Environment Variables

Not required - uses public GitHub API.

## 📝 License

MIT

---

Built with 💜 using React Three Fiber
