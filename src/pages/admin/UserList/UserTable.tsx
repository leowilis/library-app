import UserRow from './UserRow';

import type { AdminUser } from '@/types/admin/admin';

const TABLE_HEADERS = ['No', 'Name', 'Nomor Handphone', 'Email', 'Created At'];

interface UserTableProps {
  users: AdminUser[];
  page: number;
  pageSize: number;
}

export default function UserTable({ users, page, pageSize }: UserTableProps) {
  return (
    <div className='hidden overflow-hidden rounded-2xl border-2 border-gray-200 md:block md:max-w-5xl'>
      <table className='w-full text-sm'>
        <thead className='border-b border-gray-200 bg-neutral-50'>
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className='px-4 py-5 text-left text-xs font-semibold uppercase tracking-wide text-neutral-950'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-100 bg-white'>
          {users.map((user, index) => (
            <UserRow
              key={user.id}
              user={user}
              index={(page - 1) * pageSize + index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
