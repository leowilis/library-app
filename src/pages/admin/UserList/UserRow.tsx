import { formatDate } from '@/lib/utils';
import type { AdminUser } from '@/types/admin/admin';

interface UserRowProps {
  user: AdminUser;
  index: number;
}

export default function UserRow({ user, index }: UserRowProps) {
  return (
    <tr className='transition-colors hover:bg-neutral-50'>
      <td className='px-4 py-3 text-gray-500'>{index}</td>
      <td className='px-4 py-3 font-semibold text-neutral-950'>{user.name}</td>
      <td className='px-4 py-3 font-semibold text-neutral-950'>
        {user.phone ?? '-'}
      </td>
      <td className='px-4 py-3 font-semibold text-neutral-950'>{user.email}</td>
      <td className='px-4 py-3 font-semibold text-neutral-950'>
        {formatDate(user.createdAt)}
      </td>
    </tr>
  );
}
