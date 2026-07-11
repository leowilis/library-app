import UserCard from './UserCard';

import type { AdminUser } from '@/types/admin/admin';

interface UserMobileListProps {
  users: AdminUser[];
  page: number;
  pageSize: number;
}

export default function UserMobileList({
  users,
  page,
  pageSize,
}: UserMobileListProps) {
  return (
    <div className='space-y-4 md:hidden'>
      {users.map((user, index) => (
        <UserCard
          key={user.id}
          user={user}
          index={(page - 1) * pageSize + index + 1}
        />
      ))}
    </div>
  );
}
