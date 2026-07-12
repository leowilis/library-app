import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

interface TabItem {
  label: string;
  path: string;
}

interface ProfileDropdownProps {
  avatar: string;
  name: string;
  tabs: TabItem[];
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function ProfileDropdown({
  avatar,
  name,
  tabs,
  onNavigate,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          aria-label='Open profile menu'
          className='h-auto gap-3 p-0 hover:bg-transparent focus-visible:ring-2'
        >
          <img
            src={avatar}
            alt={`${name} profile`}
            className='h-9 w-9 rounded-full object-cover'
          />

          <span className='text-sm font-semibold text-neutral-900'>{name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-52'>
        {tabs.map((tab) => (
          <DropdownMenuItem key={tab.path} onClick={() => onNavigate(tab.path)}>
            {tab.label}
          </DropdownMenuItem>
        ))}

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
