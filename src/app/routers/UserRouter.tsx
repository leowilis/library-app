import { Routes, Route, Navigate } from 'react-router-dom';
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
        <Route path='/search' element={<SearchPage />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/category/:id' element={<SearchPage />} />
        <Route path='/authors/:id/books' element={<BooksByAuthorPage />} />
      </Routes>
    </UserLayout>
  );
}
