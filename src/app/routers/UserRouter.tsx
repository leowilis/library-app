import type { PropsWithChildren } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ROUTES } from '@/constants';
import UserLayout from '@/components/layout/user/Layout';
import SearchPage from '@/pages/user/SearchPage/SearchPage';
import Home from '@/pages/user/Home/Home';
import ProfilePage from '@/pages/user/ProfilePage';
import BookDetail from '@/pages/user/BookDetail/BookDetail';
import BooksByAuthorPage from '@/pages/Author/BooksByAuthorPage';

function PrivateRoute({ children }: PropsWithChildren) {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? children : <Navigate to={ROUTES.Login} replace />;
}

function SearchRouterWrapper() {
  const location = useLocation();
  const key = `${location.pathname}${location.search}`;
  return <SearchPage key={key} />;
}

export default function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='profile'
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route path='search' element={<SearchRouterWrapper />} />
        <Route path='books/:id' element={<BookDetail />} />
        <Route path='category/:id' element={<SearchRouterWrapper />} />
        <Route path='authors/:id/books' element={<BooksByAuthorPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </UserLayout>
  );
}
