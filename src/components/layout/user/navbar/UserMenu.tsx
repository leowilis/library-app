import AvatarIcon from '@/assets/avatar/avatar.png';

import type { User } from '@/types/user';
import { ROUTES } from '@/constants';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  user: User | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export default function UserMenu({
  user,
  onNavigate,
  onLogout,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-auto gap-3 p-0 hover:bg-transparent'
        >
          <img
            src={user?.profilePhoto ?? AvatarIcon}
            alt={`${user?.name ?? 'User'} profile`}
            className='h-10 w-10 rounded-full object-cover'
          />

          <span className='hidden text-sm font-semibold md:block'>
            {user?.name ?? 'User'}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56 rounded-2xl'>
        <DropdownMenuItem onClick={() => onNavigate(ROUTES.Profile)}>
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onNavigate(`${ROUTES.Profile}?tab=borrowed`)}
        >
          Borrowed List
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onNavigate(`${ROUTES.Profile}?tab=reviews`)}
        >
          Reviews
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className='text-destructive focus:text-destructive'
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
