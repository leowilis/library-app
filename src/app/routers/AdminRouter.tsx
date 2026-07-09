import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ROUTES } from '@/constants';
import AdminLayout from '@/components/layout/admin/Layout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminBorrowedList from '@/pages/admin/BorrowedList';
import AdminUserList from '@/pages/admin/UserList';
import AdminBookList from '@/pages/admin/BookList';
import AdminBookForm from '@/pages/admin/BookForm';
import AdminBookPreview from '@/pages/admin/BookPreview';

// Admin Guard (Route Protection)
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token || user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.Login} replace />;
  }

  return <>{children}</>;
}

// Admin Router Configuration
export default function AdminRouter() {
  return (
    <AdminGuard>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path={ROUTES.AdminDashboard.replace('/admin/', '')}
            element={<AdminDashboard />}
          />

          <Route
            path={ROUTES.AdminBorrowed.replace('/admin/', '')}
            element={<AdminBorrowedList />}
          />

          <Route
            path={ROUTES.AdminUsers.replace('/admin/', '')}
            element={<AdminUserList />}
          />

          <Route
            path={ROUTES.AdminBooks.replace('/admin/', '')}
            element={<AdminBookList />}
          />

          <Route
            path={ROUTES.AdminBookAdd.replace('/admin/', '')}
            element={<AdminBookForm />}
          />

          <Route
            path={ROUTES.AdminBookEdit(':id').replace('/admin/', '')}
            element={<AdminBookForm />}
          />

          <Route
            path={ROUTES.AdminBookPreview(':id').replace('/admin/', '')}
            element={<AdminBookPreview />}
          />

          <Route
            path={ROUTES.NotFound}
            element={<Navigate to={ROUTES.AdminBorrowed} replace />}
          />
        </Route>
      </Routes>
    </AdminGuard>
  );
}
