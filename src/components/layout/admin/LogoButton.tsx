import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo/logo.svg';

export default function LogoButton() {
  const navigate = useNavigate();

  return (
    <button
      type='button'
      aria-label='Go to admin dashboard'
      onClick={() => navigate('/admin/dashboard')}
      className='flex items-center gap-2 cursor-pointer'
    >
      <img src={Logo} alt='Booky' className='h-8 w-8' />
      <span className='text-xl font-bold text-gray-900'>Booky</span>
    </button>
  );
}
