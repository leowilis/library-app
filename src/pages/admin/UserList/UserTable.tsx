import type { AdminUser } from '@/types/admin/admin';

import UserRow from './UserRow';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TABLE_HEADERS = ['No', 'Name', 'Phone Number', 'Email', 'Created At'];

interface UserTableProps {
  users: AdminUser[];
  page: number;
  pageSize: number;
}

export default function UserTable({ users, page, pageSize }: UserTableProps) {
  return (
    <div className='hidden overflow-hidden rounded-2xl border bg-card md:block md:max-w-5xl'>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className='text-xs font-semibold uppercase tracking-wide'
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user, index) => (
            <UserRow
              key={user.id}
              user={user}
              index={(page - 1) * pageSize + index + 1}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
