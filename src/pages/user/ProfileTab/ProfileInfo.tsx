import AvatarIcon from '@/assets/avatar/avatar.png';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';

interface ProfileInfoProps {
  user: User | null | undefined;
  onEdit: () => void;
}

export default function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
  const fields = [
    {
      label: 'Name',
      value: user?.name,
    },
    {
      label: 'Email',
      value: user?.email,
    },
    {
      label: 'Phone Number',
      value: user?.phone ?? '-',
    },
  ];

  return (
    <div className='space-y-8 rounded-2xl bg-white p-5 shadow-sm md:max-w-2xl md:space-y-6 md:p-8'>
      <div className='md:flex md:items-center md:gap-5'>
        <img
          src={user?.profilePhoto ?? AvatarIcon}
          alt={user?.name ?? 'avatar'}
          className='h-16 w-16 rounded-full object-cover md:h-20 md:w-20'
        />
      </div>

      <div>
        {fields.map(({ label, value }) => (
          <div key={label} className='flex items-center justify-between py-4'>
            <span className='text-sm text-neutral-900'>{label}</span>

            <span className='text-sm font-semibold text-gray-900'>{value}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onEdit}
        className='w-full rounded-full bg-blue-600 py-6 font-semibold text-white hover:bg-blue-700 md:px-52'
      >
        Update Profile
      </Button>
    </div>
  );
}
