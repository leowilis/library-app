import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserLayout from '@/components/layout/user/Layout';
import Home from '@/pages/user/Home';
import ProfilePage from '@/pages/user/ProfilePage';
import SearchPage from '@/pages/user/SearchPage';
import BookDetail from '@/pages/user/BookDetail';
import BooksByAuthorPage from '@/pages/Author/AuthorBook';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// Auth Guard
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <>{children}</> : <Navigate to='/login' replace />;
}

// Router Wrapper For Re-Mounting Search
function SearchRouterWrapper() {
  const location = useLocation();
  return <SearchPage key={location.pathname + location.search} />;
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
      </Routes>
    </UserLayout>
  );
}
