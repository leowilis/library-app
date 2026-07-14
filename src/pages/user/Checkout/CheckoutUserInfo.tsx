import type { CheckoutResponse } from '@/types/cart';

interface CheckoutUserInfoProps {
  user: CheckoutResponse['data']['user'];
}

export default function CheckoutUserInfo({ user }: CheckoutUserInfoProps) {
  return (
    <section aria-labelledby='user-information-title' className='space-y-5'>
      <h2
        id='user-information-title'
        className='text-lg font-bold text-neutral-900'
      >
        User Information
      </h2>

      <div className='space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm'>
        <div className='flex items-center'>
          <span className='w-full text-sm font-medium text-neutral-500'>
            Name
          </span>

          <span className='text-sm font-semibold text-neutral-900'>
            {user.name}
          </span>
        </div>

        <div className='flex items-center'>
          <span className='w-full text-sm font-medium text-neutral-500'>
            Email
          </span>

          <span className='text-sm font-semibold text-neutral-900'>
            {user.email}
          </span>
        </div>

        <div className='flex items-center'>
          <span className='w-full text-sm font-medium text-neutral-500'>
            Phone Number
          </span>

          <span className='text-sm font-semibold text-neutral-900'>
            {user.nomorHandphone || '-'}
          </span>
        </div>
      </div>
    </section>
  );
}
