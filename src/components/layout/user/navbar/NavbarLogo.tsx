import { Link } from 'react-router-dom';

import Logo from '@/assets/logo/logo.svg';

export default function NavbarLogo() {
  return (
    <Link
      to='/'
      aria-label='Go to home page'
      className='flex flex-shrink-0 items-center gap-2 md:gap-4'
    >
      <img src={Logo} alt='Booky' className='h-10 w-10' />
      <span className='hidden text-xl font-bold md:block md:text-2xl'>
        Booky
      </span>
    </Link>
  );
}
