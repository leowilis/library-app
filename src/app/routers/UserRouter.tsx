import { Routes, Route } from 'react-router-dom'
import UserLayout from '@/components/layout/user/Layout'
import Home from '@/pages/user/Home'
import ProfilePage from '@/pages/user/ProfilePage'
import SearchPage from '@/pages/user/SearchPage'
import BookDetail from '@/pages/user/BookDetail'
import Category from '@/pages/user/Category'
import CartPage from '@/pages/user/Cart-Page'
import CheckoutPage from '@/pages/user/Checkout'
import ReviewsPage from '@/pages/user/Review'

export default function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile/reviews" element={<ReviewsPage />} /> 
      </Routes>
    </UserLayout>
  )
}