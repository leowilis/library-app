export const EndPoints = {
  // Auth
  Login: "/api/auth/login",
  Register: "/api/auth/register",

  // Books
  Book: "/api/books",
  BooksDetail: (id: number) => `/api/books/${id}`,
  BooksRecommend: "/api/books/recommend",

  // Authors
  Authors: "/api/authors",
  AuthorsPopular: "/api/authors/popular",
  AuthorBooks: (id: number) => `/api/authors/${id}/books`,

  // Categories
  Categories: "/api/categories",

  // Cart
  Cart: "/api/cart",
  CartItems: "/api/cart/items",
  Cart_Item: (itemId: number) => `/api/cart/items/${itemId}`,
  CartCheckout: "/api/cart/checkout",

  // Loans
  Loans: "/api/loans",
  LoansFromCart: "/api/loans/from-cart",
  LoansMy: "/api/loans/my",
  LoansReturn: (id: number) => `/api/loans/${id}/return`,

  // Me
  Me: "/api/me",
  MeLoans: "/api/me/loans",
  MeReviews: "/api/me/reviews",

  // Reviews
  Reviews: "/api/reviews",
  ReviewsBook: (bookId: number) => `/api/reviews/book/${bookId}`,
  Review: (id: number) => `/api/reviews/${id}`,

  // Admin
  AdminOverview: "/api/admin/overview",
  AdminBooks: "/api/admin/books",
  AdminLoans: "/api/admin/loans",
  Admin_Loan: (id: number) => `/api/admin/loans/${id}`,
  AdminLoansOverdue: "/api/admin/loans/overdue",
  AdminUsers: "/api/admin/users",
};

export const Query_Keys = {
  Books: "books",
  BooksDetail: "bookDetail",
  BooksRecommend: "booksRecommend",
  Authors: "authors",
  AuthorsPopular: "authorsPopular",
  AuthorsBook: "authorBooks",
  Categories: "categories",
  Cart: "cart",
  CartCheckout: "cartCheckout",
  LoansMy: "loansmy",
  Me: "me",
  MeLoans: "meLoans",
  MeReviews: "meReviews",
  ReviewsBook: "reviewsBook",
  AdminOverview: "adminOverview",
  AdminBooks: "adminBooks",
  AdminLoans: "adminLoans",
  AdminLoansOverdue: "adminLoansOverdue",
  AdminUsers: "adminUsers",
};

export const ROUTES = {
  // Auth
  Login: "/login",
  AdminLogin: "/login/admin",
  Register: "/register",

  // User
  Home: "/",
  BookDetail: (id: number) => `/books/${id}`,
  Category: "/category",
  BooksByAuthors: (id: number) => `/authors/${id}`,
  Cart: "/cart",
  CheckOut: "/checkout",
  Profile: "/profile",
  ProfileBorrowed: "/profile?tab=borrowed",
  ProfileReviews: "/profile?tab=reviews",

  // Admin
  AdminDashboard: "/admin/dashboard",
  AdminBookEdit: (id: number) => `/admin/books/${id}/edit`,
  AdminBookPreview: (id: number) => `/admin/books/${id}/preview`,

  // Borrow
  BorrowSuccess: "/borrow-success",

  // Other
  NotFound: "*",
};
