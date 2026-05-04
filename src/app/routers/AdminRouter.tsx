import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '@/components/layout/admin/Layout';
import AdminUserList from '@/pages/admin/UserList';
import AdminBookList from '@/pages/admin/BookList';
import AdminBookForm from '@/pages/admin/BookForm';
import AdminBorrowedList from '@/pages/admin/BorrowedList';
import AdminBookPreview from '@/pages/admin/BookPreview';
import AdminDashboard from '@/pages/admin/Dashboard';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// Admin Guard
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  if (!token || user?.role !== 'ADMIN') {
    return <Navigate to='/login' replace />;
  }
  return <>{children}</>;
}

export default function AdminRouter() {
  return (
    <AdminGuard>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='borrowed' element={<AdminBorrowedList />} />
          <Route path='users' element={<AdminUserList />} />
          <Route path='books' element={<AdminBookList />} />
          <Route path='books/add' element={<AdminBookForm />} />
          <Route path='books/:id/edit' element={<AdminBookForm />} />
          <Route path='books/:id' element={<AdminBookPreview />} />
          <Route path='*' element={<Navigate to='/admin/borrowed' replace />} />
        </Route>
      </Routes>
    </AdminGuard>
  );
}
