import Menubar from '@/assets/icon/Menu.svg';
import GuestDropdown from './GuestDropdown';

interface GuestMenuProps {
  menuOpen: boolean;
  onToggle: () => void;
  onNavigate: (route: string) => void;
}

export default function GuestMenu({
  menuOpen,
  onToggle,
  onNavigate,
}: GuestMenuProps) {
  return (
    <>
      <button
        type='button'
        aria-label='Open navigation menu'
        aria-haspopup='menu'
        aria-expanded={menuOpen}
        onClick={onToggle}
        className='transition-transform active:scale-95'
      >
        <img src={Menubar} width={28} height={28} alt='Menu' />
      </button>

      {menuOpen && <GuestDropdown onNavigate={onNavigate} />}
    </>
  );
}
