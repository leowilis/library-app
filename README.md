# 📘 Library App — React + TypeScript

> A modern responsive library web application built with React, TypeScript, Tailwind CSS, Shadcn UI, Redux Toolkit, and TanStack Query.

---

## 📌 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Design Reference](#2-design-reference)
3. [Live Preview](#3-live-preview)
4. [Tech Stack](#4-tech-stack)
5. [Features](#5-features)
6. [Architecture](#6-architecture)
7. [Code Structure](#7-code-structure)
8. [Getting Started](#8-getting-started)
9. [Deployment](#9-deployment)

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

(https://library-app-indol-nu.vercel.app)

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
✔ Admin panel (Book, Loan & User management)  
✔ Admin dashboard with library statistics  

---

## 🏗 6. Architecture

### Custom Hooks — Separation of Concern
All data fetching logic is extracted into dedicated custom hooks, keeping pages clean and focused on UI only.

```
hooks/
├── admin/
│   ├── useAdminBooks.ts     — fetch + optimistic delete
│   ├── useAdminLoans.ts     — fetch with status filter
│   ├── useAdminUsers.ts     — fetch paginated users
│   └── useAdminOverview.ts  — dashboard statistics
├── useBorrowBook.ts         — borrow with optimistic UI
├── useReturnBook.ts         — return with optimistic UI
├── useReviews.ts            — create + delete with optimistic UI
└── useMe.ts                 — user profile & loan history
```

### Optimistic UI
Mutations update the UI instantly before the server responds, with automatic rollback on failure. Implemented across:
- **Book delete** (admin) — book disappears instantly, reappears if request fails
- **Borrow book** — available copies decrease immediately
- **Return book** — loan status updates to Returned instantly
- **Create review** — review appears in list before server confirms
- **Delete review** — review disappears instantly, reappears on failure

### TanStack Query as Single Source of Truth
- No duplicate local state for server data
- All pages read from the same query cache
- `invalidateQueries` ensures consistency across pages after mutations
- `select` used in `useBookDetail` to normalize inconsistent API response shapes

### Type Safety
All API response shapes are typed in `src/types/`:
```
types/
├── admin.ts    — AdminBook, AdminLoan, AdminUser, AdminOverview
├── book.ts     — Book, BookReview, CreateBookPayload
├── loan.ts     — Loan, CreateLoanPayload
├── review.ts   — Review, CreateReviewPayload
└── user.ts     — User, UpdateProfilePayload
```

### Error & Loading States
All pages handle three UI states consistently:
- **Loading** — animated skeleton placeholders
- **Error** — error message with icon
- **Empty** — empty state with illustration

---

## 🗂 7. Code Structure

```
src/
├── assets/          — Static images & icons
├── components/      — Shared UI components
│   ├── ui/          — Shadcn base components
│   ├── user/        — User-facing components
│   └── layout/      — Layout components
├── constants/       — App constants & API endpoints
├── hooks/           — Custom React hooks
│   └── admin/       — Admin-specific hooks
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

## 🏁 8. Getting Started

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

## ☁️ 9. Deployment

This project is deployed on **Vercel**.

```bash
npm run build
```