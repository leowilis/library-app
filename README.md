# 📘 Library App — React + TypeScript

> A modern responsive library web application built with React, TypeScript, Tailwind CSS, Shadcn UI, Redux Toolkit, and TanStack Query.

---

## 📌 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Design Reference](#2-design-reference)
3. [Live Preview](#3-live-preview)
4. [Tech Stack](#4-tech-stack)
5. [Features](#5-features)
6. [Code Structure](#6-code-structure)
7. [Getting Started](#7-getting-started)
8. [Deployment](#8-deployment)

---

## 🧠 1. Project Overview

This project is a Library App built using **React + Vite** with a mobile-first responsive design.

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

https://library-app-git-main-leowillis-projects.vercel.app/

---

## 🛠 4. Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Kit | Shadcn UI |
| State Management | Redux Toolkit |
| Server State | TanStack Query |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | Sonner |

---

## 🚀 5. Features

✔ Responsive design (Desktop & Mobile)  
✔ User authentication (Login & Register)  
✔ Book browsing, search, and filtering by category  
✔ Add to cart and checkout flow  
✔ Book borrowing and return system  
✔ Review and rating system  
✔ User profile management  
✔ Admin panel (Book & User management)  

---

## 🗂 6. Code Structure

```
src/
├── assets/          — Static images & icons
├── components/      — Shared UI components
│   ├── ui/          — Shadcn base components
│   ├── user/        — User-facing components
│   └── layout/      — Layout components
├── constants/       — App constants & API endpoints
├── hooks/           — Custom React hooks
├── lib/             — Utility functions & API client
├── pages/           — Page components
│   ├── admin/       — Admin pages
│   └── user/        — User pages
├── store/           — Redux store & slices
├── types/           — TypeScript type definitions
├── App.tsx
└── main.tsx
```

---

## 🏁 7. Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Open app

```
http://localhost:5173
```

---

## ☁️ 8. Deployment

This project is deployed on **Vercel**.

```bash
npm run build
```