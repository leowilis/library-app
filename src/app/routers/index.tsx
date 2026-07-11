import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RegisterPage from '@/pages/auth/Register/RegisterPage';
import UserLogin from '@/pages/auth/LoginPage';
import UserRouter from '@/app/routers/UserRouter';
import AdminRouter from '@/app/routers/AdminRouter';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.Login} element={<UserLogin />} />
      <Route path={ROUTES.Register} element={<RegisterPage />} />
      <Route path={`${ROUTES.AdminRoot}/*`} element={<AdminRouter />} />
      <Route path='/*' element={<UserRouter />} />
    </Routes>
  );
}
