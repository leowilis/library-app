import { Outlet, useLocation, useNavigate, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';

import { ROUTES } from '@/constants';
import { useLogout } from '@/hooks/useAuth';

import AdminHeader from './AdminHeader';
import AdminTabs from './AdminTabs';
import { ADMIN_TABS } from './constants';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);

  const isAddPage = !!matchPath(ROUTES.AdminBookAdd, location.pathname);

  const isEditPage = !!matchPath(
    ROUTES.AdminBookEditPattern,
    location.pathname,
  );

  const isPreviewPage = !!matchPath(
    ROUTES.AdminBookPreviewPattern,
    location.pathname,
  );

  const isFormPage = isAddPage || isEditPage;

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminHeader
        avatar={user?.profilePhoto ?? undefined}
        name={user?.name}
        tabs={ADMIN_TABS}
        onNavigate={(path) => navigate(path)}
        onLogout={logout}
      />

      {!isFormPage && !isPreviewPage && (
        <AdminTabs
          tabs={ADMIN_TABS}
          pathname={location.pathname}
          onNavigate={(path) => navigate(path)}
        />
      )}

      <main className='mx-auto max-w-7xl px-4 py-6 md:mx-12'>
        <Outlet />
      </main>
    </div>
  );
}
