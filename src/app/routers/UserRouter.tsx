import { Routes, Route } from 'react-router-dom'
import UserLayout from '@/components/layout/user/Layout'
import Home from '@/pages/user/Home'
import ProfilePage from '@/pages/user/ProfilePage'

export default function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </UserLayout>
  )
}