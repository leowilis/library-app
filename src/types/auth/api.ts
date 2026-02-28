export const endPoints = {
  // Auth
  Login: "/api/auth/login",
  Register: "/api/auth/register",
};

export const Routes = {
  // Auth
  Login: "/login",
  Register: "/register",
  AdminLogin: "/admin/login",

  // Admin
  AdminDashboard: "/admin/dashboard",
  AdminBooksEdit: (id: number) => `/admin/books/${id}/edit`,
  AdminBooksPreview: (id: number) => `/admin/books/${id}/preview`,
};
