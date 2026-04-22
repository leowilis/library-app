import { Routes, Route } from 'react-router-dom'
import UserLayout from '@/components/layout/user/Layout'
import Home from '@/pages/user/Home'
import ProfilePage from '@/pages/user/ProfilePage'
import SearchPage from '@/pages/user/SearchPage'
import BookDetail from '@/pages/user/BookDetail'
import Category from '@/pages/user/Category'
import BooksByAuthorPage from '@/pages/Author/AuthorBook'

export default function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/authors/:id/books" element={<BooksByAuthorPage />} />
      </Routes>
    </UserLayout>
  )
}