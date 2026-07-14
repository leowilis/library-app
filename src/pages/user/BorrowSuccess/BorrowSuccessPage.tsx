import { useLocation, useNavigate } from 'react-router-dom';
import BorrowSuccessCard from './BorrowSuccessCard';
import { ROUTES } from '@/constants';

interface BorrowSuccessState {
  returnDate?: string;
}

export default function BorrowSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as BorrowSuccessState | null;

  return (
    <main className='flex min-h-[70vh] items-center justify-center px-5 py-16'>
      <BorrowSuccessCard
        returnDate={state?.returnDate}
        onBackHome={() => navigate(ROUTES.Home)}
      />
    </main>
  );
}
