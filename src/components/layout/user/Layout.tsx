import Footer from '@/components/layout/user/Footer';
import Navbar from './navbar/Navbar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className='min-h-screen flex flex-col'
      style={{ backgroundColor: 'var(--primary-100)' }}
    >
      <Navbar />
      <main className='px-3 pt-5 md:px-26 md:grow'>{children}</main>
      <Footer />
    </div>
  );
}
