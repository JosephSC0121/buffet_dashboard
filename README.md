# 🍽️ Buffet Dashboard

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Directus](https://img.shields.io/badge/Directus-10-lightgrey?logo=directus)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwind-css)

> **A modern inventory management system for buffets, built with React, Next.js 15, and Directus.**

## ✨ Features

✅ Inventory tracking and management  
✅ Order processing and overview  
✅ Modular component architecture  
✅ Fully responsive with TailwindCSS  
✅ Directus integration for headless CMS  
✅ Optimized for performance with Next.js 15  

---

## 📂 Project Structure

```plaintext
.  
├── Dockerfile  
├── app  
│   ├── favicon.ico  
│   ├── globals.css  
│   ├── inventario/  
│   │   └── page.tsx  
│   ├── inventario_general/  
│   │   └── page.tsx  
│   ├── orden/  
│   │   └── page.tsx  
│   ├── store/  
│   │   └── atom.ts  
├── components/  
│   ├── app-accordion.tsx  
│   ├── app-table.tsx  
│   ├── ui/ (Reusable UI elements)  
├── hooks/  
│   ├── use-hour.tsx  
│   ├── use-inventory_check.tsx  
├── lib/  
│   ├── directus.tsx  
│   ├── utils.ts  
├── public/ (Static assets)  
└── types/ (TypeScript definitions)  
```

---

## 🚀 Quick Start

### 1️⃣ Install Dependencies
```sh
pnpm install
```

### 2️⃣ Run Development Server
```sh
pnpm dev
```

### 3️⃣ Build for Production
```sh
pnpm build
```

### 4️⃣ Run with Docker
```sh
docker build -t buffet-dashboard .
docker run -p 3000:3000 buffet-dashboard
```

---

## ⚙️ Environment Variables
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_DIRECTUS_URL=your_directus_instance_url
NEXT_PUBLIC_API_KEY=your_api_key
```

