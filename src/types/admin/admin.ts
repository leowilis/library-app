export interface AdminOverview {
  totalBooks: number;
  totalUsers: number;
  activeLoans: number;
  overdueLoans: number;
}

// Book

/**
 * Author embedded inside a Book object.
 */
export interface BookAuthor {
  id: number;
  name: string;
}

/**
 * Category embedded inside a Book object.
 */
export interface BookCategory {
  id: number;
  name: string;
}

/**
 * Book record as returned by the admin books endpoint.
 */
export interface AdminBook {
  id: number;
  title: string;
  coverImage: string | null;
  stock: number;
  rating: number;
  author: BookAuthor;
  category: BookCategory;
}

/**
 * Paginated response from `GET /api/admin/books`.
 */
export interface AdminBooksResponse {
  books: AdminBook[];
  pagination: Pagination;
}

// User

/**
 * User record as returned by the admin users endpoint.
 */
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
}

/**
 * Paginated response from `GET /api/admin/users`.
 */
export interface AdminUsersResponse {
  users: AdminUser[];
  pagination: Pagination;
}

// Loan
/**
 * Possible statuses for a library loan.
 * - `BORROWED` — currently borrowed, not yet due.
 * - `RETURNED` — book has been returned.
 * - `LATE`     — past due date, not yet returned.
 */
export type LoanStatus = 'BORROWED' | 'RETURNED' | 'LATE';

/**
 * Filter values accepted by the loans list endpoint.
 */
export type LoanStatusFilter = 'active' | 'returned' | 'overdue' | undefined;

/**
 * Loan record as returned by the admin loans endpoint.
 */
export interface AdminLoan {
  id: number;
  status: LoanStatus;
  borrowedAt: string;
  dueAt: string;
  durationDays: number;
  book: {
    title: string;
    coverImage: string | null;
    author: BookAuthor;
    category: BookCategory;
  };
  borrower: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
  };
}

/**
 * Paginated response from `GET /api/admin/loans`.
 */
export interface AdminLoansResponse {
  loans: AdminLoan[];
  pagination: Pagination;
}

/**
 * Admin overview for dashboard
 */
export interface AdminOverview {
  totals: {
    users: number;
    books: number;
  };
  loans: {
    active: number;
    overdue: number;
  };
}

// Components

/**
 * Props for the `StatCard` component used in the Admin Dashboard.
 */
export interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
  isLoading: boolean;
  accent: string;
}

// Shared

/**
 * Standard pagination metadata returned by all paginated endpoints.
 */
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Props for the three-dot action menu on each book row.
 * Receives navigation callbacks for preview, edit, and delete actions.
 */
export interface ActionDropdownProps {
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Props for the delete confirmation modal.
 * Controls loading state and confirm/cancel callbacks.
 */
export interface DeleteModalProps {
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}