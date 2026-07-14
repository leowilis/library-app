# 📚 Booky — Modern Library Management System

A modern and responsive library management web application built with **React, TypeScript, Vite, and Tailwind CSS**. Users can browse books, manage their cart, borrow multiple books, return books, write reviews, and manage their personal profile. Administrators can manage books, users, and monitor borrowing activities through a dedicated dashboard.

🌐 **Live Demo:** https://library-app-indol-nu.vercel.app

🎨 **Figma Design:** https://www.figma.com/design/YDdMopW8nI2pcxTxXD3Mck/Library-App

---

# ✨ Features

## 👤 User

- Authentication (Login & Register)
- Browse books
- Search books
- Filter by category
- Filter by rating
- Book detail page
- Related books
- Add books to Cart
- Select multiple books
- Checkout selected books
- Borrow multiple books
- Return borrowed books
- Review books
- Edit review
- Delete review
- Profile management
- Borrow history
- Review history

---

## 👨‍💼 Admin

- Dashboard overview
- Book Management
  - Add Book
  - Edit Book
  - Delete Book
- User Management
- Borrowed List
- Returned List
- Overdue List
- Search & Pagination
- Role-based Access Control

---

# 🛠 Tech Stack

| Category         | Technology        |
| ---------------- | ----------------- |
| Framework        | React 19 + Vite   |
| Language         | TypeScript        |
| Styling          | Tailwind CSS      |
| Components       | shadcn/ui         |
| State Management | Redux Toolkit     |
| Server State     | TanStack Query v5 |
| Routing          | React Router DOM  |
| HTTP Client      | Axios             |
| Icons            | Lucide React      |
| Notifications    | Sonner            |

---

# 🚀 Main Features

## Authentication

- JWT Authentication
- Protected Routes
- Admin Guard
- Persistent Login

---

## Books

- Browse books
- Search
- Category Filter
- Rating Filter
- Related Books
- Book Detail

---

## Cart

- Add Book to Cart
- Remove Book
- Select Individual Books
- Select All
- Checkout Selected Books

---

## Borrow

- Borrow directly
- Borrow from Cart
- Borrow multiple books
- Return books
- Borrow duration selection
- Borrow confirmation page

---

## Reviews

- Create Review
- Edit Review
- Delete Review
- Star Rating

---

## Profile

- User Information
- Borrow Statistics
- Loan History
- Review History

---

## Admin Dashboard

### Dashboard

- Total Users
- Total Books
- Total Active Loans
- Total Returned Books
- Total Overdue Books

### Book Management

- Add Book
- Edit Book
- Delete Book
- Search
- Pagination

### User Management

- User List
- Search
- Pagination

### Borrow Management

- Borrowed
- Returned
- Overdue
- Search
- Pagination

---

# ⚡ Optimistic UI

Several mutations update the UI instantly before the server responds.

- Borrow Book
- Return Book
- Create Review
- Update Review
- Delete Review
- Delete Cart Item

---

# 🏗 Architecture

The project follows a feature-based architecture with reusable components and custom hooks.

```
src
│
├── app
├── assets
├── common
├── components
├── constants
├── hooks
│   ├── admin
│   ├── useAuth
│   ├── useBooks
│   ├── useCart
│   ├── useCheckoutBorrow
│   ├── useBorrowBook
│   ├── useReturnBook
│   ├── useReviews
│   ├── useMe
│   └── ...
│
├── layouts
├── lib
├── pages
│   ├── admin
│   └── user
│
├── store
├── types
└── utils
```

---

# 📦 State Management

### Redux Toolkit

Used for:

- Authentication
- UI State

### TanStack Query

Used for:

- Books
- Reviews
- Cart
- Checkout
- Loans
- Users
- Dashboard

---

# 📱 Responsive Design

Optimized for

- Desktop
- Tablet
- Mobile

---

# 🚀 Installation

```bash
git clone https://github.com/leowilis/library-app.git
```

```bash
cd library-app
```

```bash
npm install
```

Create

```
.env
```

```
VITE_API_URL=YOUR_API_URL
```

Run

```bash
npm run dev
```

Build

```bash
npm run build
```

---

# 🚀 Deployment

Hosted on **Vercel**

https://library-app-indol-nu.vercel.app

---

# 👨‍💻 Author

Leo Wilis

GitHub

https://github.com/leowilis

LinkedIn

https://linkedin.com/in/leowilis
