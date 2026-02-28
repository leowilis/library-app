import { Routes, Route } from 'react-router-dom'
import RegisterPage from '@/pages/auth/RegisterPage'
import UserLogin from '@/pages/auth/UserLoginPage'
import { Routes } from '@/types/auth/api'



export default function AppRoutes() {
  return (
    <Routes>
      <Route path={Routes.Login} element={<UserLogin />} />
      <Route path={Routes.Register} element={<RegisterPage />} />
      
    </Routes>
  )
}