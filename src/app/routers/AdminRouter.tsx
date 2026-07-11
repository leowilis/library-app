import type { PropsWithChildren } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ROUTES } from '@/constants';
import AdminLayout from '@/components/layout/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminBorrowedList from '@/pages/admin/BorrowedList/AdminBorrowedList';
import AdminUserList from '@/pages/admin/UserList/AdminUserList';
import AdminBookList from '@/pages/admin/booklist/AdminBookList';
import AdminBookForm from '@/pages/admin/BookForm/BookForm';
import AdminBookPreview from '@/pages/admin/BookPreview/AdminBookPreview';

const adminPath = (path: string) => path.replace('/admin/', '');

function AdminGuard({ children }: PropsWithChildren) {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token || user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.Login} replace />;
  }

  return <>{children}</>;
}

export default function AdminRouter() {
  return (
    <AdminGuard>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route
            path={adminPath(ROUTES.AdminDashboard)}
            element={<AdminDashboard />}
          />

          <Route
            path={adminPath(ROUTES.AdminBorrowed)}
            element={<AdminBorrowedList />}
          />

          <Route
            path={adminPath(ROUTES.AdminUsers)}
            element={<AdminUserList />}
          />

          <Route
            path={adminPath(ROUTES.AdminBooks)}
            element={<AdminBookList />}
          />

          <Route
            path={adminPath(ROUTES.AdminBookAdd)}
            element={<AdminBookForm />}
          />

          <Route
            path={adminPath(ROUTES.AdminBookEdit(':id'))}
            element={<AdminBookForm />}
          />

          <Route
            path={adminPath(ROUTES.AdminBookPreview(':id'))}
            element={<AdminBookPreview />}
          />

          <Route
            path='*'
            element={<Navigate to={ROUTES.AdminDashboard} replace />}
          />
        </Route>
      </Routes>
    </AdminGuard>
  );
}
