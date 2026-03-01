import Footer from '@/components/layout/user/Footer'
import Navbar from './Navbar'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--primary-100)' }}>
      <Navbar />
      <main className="px-4 pt-5">
        {children}
      </main>
      <Footer />
    </div>
  )
}