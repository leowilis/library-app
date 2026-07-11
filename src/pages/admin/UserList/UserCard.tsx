import { formatDate } from '@/lib/utils';

import type { AdminUser } from '@/types/admin/admin';

interface UserCardProps {
  user: AdminUser;
  index: number;
}

export default function UserCard({ user, index }: UserCardProps) {
  return (
    <div className='space-y-3 rounded-2xl bg-white p-4 shadow-xs'>
      <div className='flex justify-between text-sm'>
        <span className='font-semibold text-neutral-950'>No</span>

        <span className='font-bold text-gray-900'>{index}</span>
      </div>

      <div className='flex justify-between text-sm'>
        <span className='font-semibold text-neutral-950'>Name</span>

        <span className='font-bold text-gray-900'>{user.name}</span>
      </div>

      <div className='flex justify-between text-sm'>
        <span className='font-semibold text-neutral-950'>Email</span>

        <span className='break-all text-right font-bold text-gray-900'>
          {user.email}
        </span>
      </div>

      <div className='flex justify-between text-sm'>
        <span className='font-semibold text-neutral-950'>Nomor Handphone</span>

        <span className='font-bold text-gray-900'>{user.phone ?? '-'}</span>
      </div>

      <div className='flex justify-between text-sm'>
        <span className='font-semibold text-neutral-950'>Created At</span>

        <span className='text-right font-bold text-gray-900'>
          {formatDate(user.createdAt)}
        </span>
      </div>
    </div>
  );
}
