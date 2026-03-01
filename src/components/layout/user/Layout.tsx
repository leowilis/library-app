
import Navbar from './Navbar'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--primary-100)' }}>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 pb-10">
        {children}
      </main>
      
    </div>
  )
}