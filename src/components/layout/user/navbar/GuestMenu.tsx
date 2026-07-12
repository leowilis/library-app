import Menubar from '@/assets/icon/Menu.svg';

import { ROUTES } from '@/constants';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GuestMenuProps {
  onNavigate: (route: string) => void;
}

export default function GuestMenu({ onNavigate }: GuestMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          aria-label='Open navigation menu'
          className='h-10 w-10 rounded-lg'
        >
          <img src={Menubar} alt='' aria-hidden='true' className='h-7 w-7' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-72 rounded-2xl p-4'>
        <div className='flex gap-3'>
          <Button
            variant='outline'
            className='flex-1 rounded-full'
            onClick={() => onNavigate(ROUTES.Login)}
          >
            Login
          </Button>

          <Button
            className='flex-1 rounded-full'
            onClick={() => onNavigate(ROUTES.Register)}
          >
            Register
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
