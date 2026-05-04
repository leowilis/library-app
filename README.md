# 📘 Booky — Library Web App

> A modern, responsive library web application built with React + TypeScript. Users can browse books, borrow and return them, write reviews, and manage their profile. Admins get a full dashboard to manage books, users, and loans.

🔗 **Live:** [library-app-indol-nu.vercel.app](https://library-app-indol-nu.vercel.app)  
🎨 **Figma:** [Design Reference](https://www.figma.com/design/YDdMopW8nI2pcxTxXD3Mck/Library-App?node-id=39412-6528&p=f&t=jCXRUJT3gt2yRdOt-0)

---

## 📌 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Deployment](#deployment)

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | Redux Toolkit |
| Server State | TanStack Query v5 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Date Formatting | Day.js |
| Notifications | Sonner |
| Icons | Lucide React |

---

## 🚀 Features

### User
- 🔐 Login & Register with JWT token
- 📚 Browse books with search + category + rating filter
- 📖 Book detail page with reviews and related books
- 🛒 Borrow books with optimistic stock update
- 🔁 Return borrowed books
- ⭐ Add and delete reviews
- 👤 Profile page with loan history and statistics

### Admin
- 📊 Dashboard with library-wide statistics
- 📋 Manage books (add, edit, delete)
- 👥 View and manage users
- 📑 Monitor all active, returned, and overdue loans
- 🔒 Role-based access guard — non-admin redirected to login

---

## 🏗 Architecture

### Custom Hooks — Separation of Concerns
All data fetching and mutation logic lives in dedicated hooks. Pages only handle UI.

```
hooks/
├── admin/
│   ├── useAdminBooks.ts      — paginated book list + optimistic delete
│   ├── useAdminLoans.ts      — loans with overdue normalization
│   ├── useAdminUsers.ts      — paginated user list
│   └── useAdminOverview.ts   — dashboard statistics
├── useBorrowBook.ts          — borrow with optimistic stock decrement
├── useReturnBook.ts          — return with optimistic status update
├── useReviews.ts             — create + delete with optimistic UI
├── useBooks.ts               — book list, detail, recommended
├── useMe.ts                  — profile, loans, reviews
├── useAuthors.ts             — authors and popular authors
├── useCategories.ts          — category list
└── useAuth.ts                — login, register, logout
```

### Optimistic UI
UI updates instantly before the server responds. Rolls back automatically on failure.

| Action | Optimistic Behavior |
|---|---|
| Delete book (admin) | Book disappears immediately |
| Borrow book | Available copies decrements instantly |
| Return book | Loan status changes to Returned instantly |
| Create review | Review appears in list before server confirms |
| Delete review | Review disappears immediately |

### Type Safety
Zero `any` types across the entire codebase. All API responses are typed with interfaces:

```
types/
├── admin/admin.ts   — AdminBook, AdminLoan, AdminUser, AdminOverview
├── book.ts          — Book, BookReview, CreateBookPayload, UpdateBookPayload
├── loan.ts          — Loan, CreateLoanPayload
├── review.ts        — Review, CreateReviewPayload
├── user.ts          — User, UpdateProfilePayload
└── author.ts        — Author, PopularAuthor, AuthorBooksResponse
```

All `useMutation` hooks use explicit generics `<TData, TError, TVariables, TContext>` — errors are typed as `AxiosError<{ message?: string }>`, context interfaces replace `any`.

### State Management
- **Redux Toolkit** — `authSlice` (token + user), `uiSlice` (filter + search state)
- **TanStack Query** — single source of truth for all server data
- No duplicate local state for server data — pages read directly from query cache

---

## 🗂 Project Structure

```
src/
├── assets/           — SVG icons, images, avatars
├── components/
│   ├── layout/       — UserLayout, AdminLayout
│   └── ui/           — shadcn base components + custom (StarRating, Skeleton)
├── constants/        — API endpoints, query keys, routes
├── hooks/            — All custom React hooks
│   └── admin/        — Admin-specific hooks
├── lib/
│   ├── api.ts        — Axios instance with auth interceptor
│   └── utils.ts      — formatDate, cn helper
├── pages/
│   ├── admin/        — Dashboard, BookList, BookForm, UserList, BorrowedList
│   └── user/         — Home, BookDetail, SearchPage, ProfilePage, BorrowTab, ReviewsTab
├── store/
│   ├── authSlice.ts  — token + user state
│   └── uiSlice.ts    — filter + search state
├── types/            — TypeScript interfaces for all data models
├── app/routers/      — UserRouter, AdminRouter (with AdminGuard)
├── App.tsx
└── main.tsx
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install

```bash
git clone https://github.com/leowilis/library-app.git
cd library-app
npm install
```

### Environment

Create `.env` in the root:

```env
VITE_API_URL=https://your-api-url.com
```

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
```

---

## ☁️ Deployment

Deployed on **Vercel** with automatic deploys on push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/leowilis/library-app)

---

## 👨‍💻 Author

**Leo Wilis**  
GitHub: [@leowilis](https://github.com/leowilis)