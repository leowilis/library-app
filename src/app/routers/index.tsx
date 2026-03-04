import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants'
import RegisterPage from '@/pages/auth/RegisterPage'
import UserLogin from '@/pages/auth/LoginPage'
import UserRouter from '@/app/routers/UserRouter'
import AdminRouter from './AdminRouter'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.Login} element={<UserLogin />} />
      <Route path={ROUTES.Register} element={<RegisterPage />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<UserRouter />} />
    </Routes>
  )
}