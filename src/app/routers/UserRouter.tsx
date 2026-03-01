import { Routes, Route } from 'react-router-dom'
import UserLayout from '@/components/layout/user/Layout'
import Home from '@/pages/user/Home'

export default function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </UserLayout>
  )
}