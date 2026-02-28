# 📘 Portfolio Website — Next.js (Based on Figma)

> A modern responsive portfolio website built with React.js, TypeScript, Tailwind CSS, Shadcn UI, Redux Toolkit, and TanStack Query.

---

## 📌 Table of Contents
1. Project Overview
2. Design Reference
3. Live Preview
4. Tech Stack
5. Features
6. Code Structure
7. Getting Started
8. Deployment

---

## 🧠 1. Project Overview

This project is a portfolio website built using **Next.js 20** with a mobile-first responsive design.

It is a result of slicing a Figma design into a functional web experience, implementing modern frontend best practices and reusable components.

**Goal**
- Transform a Figma design into a responsive website
- Apply clean, maintainable, and scalable frontend code
- Deploy to a production environment

---

## 🎨 2. Design Reference

**Figma Design:**  
https://www.figma.com/design/YDdMopW8nI2pcxTxXD3Mck/Library-App?node-id=39412-6528&p=f&t=jCXRUJT3gt2yRdOt-0

**Design Implementation Notes:**
- Layout consistency with grid and spacing
- Scalable typography
- Well-defined color system
- Responsive behavior across devices
- Component reuse

---

## 👀 3. Live Preview

*(Add screenshot images here in Notion)*

Example placeholders:

📱 Mobile Preview  
🌐 Desktop Preview  
🎨 Figma reference

---

## 🛠 4. Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 20 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Kit | Shadcn |
| Animation | Framer Motion |
| Icons | SVG/Custom |

---

## 🚀 5. Features

✔ Responsive design (Desktop & Mobile)  
✔ Animation using Framer Motion  
✔ Reusable UI components  
✔ Carousel & card animations  
✔ CTA sections and buttons  
✔ Dynamic FAQ component with carousel navigation

---

## 🗂 6. Code Structure

src/
├── app/
| ├──api/
| | ├──contact/
| |   └──route.tsx
│ ├── page.tsx
│ └── layout.tsx
├── components/
│ ├── containers/
| ├── ui/
└── lib/



- **app/** — Main pages & layout  
- **components/ui/** — Shared UI components  
- **components/containers/** — UI sections  
- **assets/** — Static images/icons  
- **lib/** — Utility functions

---

## 🏁 7. Getting Started

## Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install

## Run development server

npm run dev
# or
yarn dev
# or
pnpm dev

## Open app

http://localhost:3000