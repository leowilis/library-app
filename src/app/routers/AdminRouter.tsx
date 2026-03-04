import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "@/components/layout/admin/Layout";
import AdminUserList from "@/pages/admin/UserList";
import AdminBookList from "@/pages/admin/BookList";
import AdminBookForm from "@/pages/admin/BookForm";
import AdminBorrowedList from "@/pages/admin/BorrowedList";
import AdminBookPreview from "@/pages/admin/BookPreview"; // 1. Import the new component

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={<Navigate to="/admin/borrowed" replace />}
        />
        <Route path="borrowed" element={<AdminBorrowedList />} />
        <Route path="users" element={<AdminUserList />} />
        <Route path="books" element={<AdminBookList />} />
        <Route path="books/add" element={<AdminBookForm />} />
        <Route path="books/:id/edit" element={<AdminBookForm />} />
        <Route path="books/:id" element={<AdminBookPreview />} />
        <Route path="*" element={<Navigate to="/admin/borrowed" replace />} />
      </Route>
    </Routes>
  );
}
