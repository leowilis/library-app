import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants'
import RegisterPage from '@/pages/auth/RegisterPage'
import UserLogin from '@/pages/auth/UserLoginPage'



export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.Login} element={<UserLogin />} />
      <Route path={ROUTES.Register} element={<RegisterPage />} />
      
    </Routes>
  )
}