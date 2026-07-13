import AvatarIcon from '@/assets/avatar/avatar.png';

import LogoButton from './LogoButton';
import ProfileDropdown from './ProfileDropdown';

interface TabItem {
  label: string;
  path: string;
}

interface AdminHeaderProps {
  avatar?: string | null;
  name?: string | null;
  tabs: TabItem[];
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function AdminHeader({
  avatar,
  name,
  tabs,
  onNavigate,
  onLogout,
}: AdminHeaderProps) {
  return (
    <nav className='flex items-center justify-between bg-white px-6 py-4 shadow-sm'>
      <LogoButton />

      <ProfileDropdown
        avatar={avatar ?? AvatarIcon}
        name={name ?? 'Admin'}
        tabs={tabs}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </nav>
  );
}
