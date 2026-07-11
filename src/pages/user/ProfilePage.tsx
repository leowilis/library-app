import { useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import ProfileTab from './ProfileTab';
import ReviewsTab from './ReviewsTab';
import BorrowedTab from './BorrowedTab';

type Tab = 'profile' | 'borrowed' | 'reviews';

const TABS: { key: Tab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'borrowed', label: 'Borrowed List' },
  { key: 'reviews', label: 'Reviews' },
];

const TAB_COMPONENTS: Record<Tab, ReactNode> = {
  profile: <ProfileTab />,
  borrowed: <BorrowedTab />,
  reviews: <ReviewsTab />,
};

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get('tab');

  const activeTab: Tab = TABS.some((tab) => tab.key === currentTab)
    ? (currentTab as Tab)
    : 'profile';

  return (
    <div className='space-y-6 px-4 pt-4 pb-10 md:px-10 md:py-3'>
      <div className='flex rounded-2xl bg-neutral-100 p-2 md:w-fit'>
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type='button'
            onClick={() => setSearchParams({ tab: key })}
            className={cn(
              'flex-1 rounded-xl py-3 text-sm transition-all md:flex-none md:px-20',
              activeTab === key
                ? 'bg-white font-semibold text-primary-600 shadow'
                : 'bg-transparent font-normal text-neutral-600',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {TAB_COMPONENTS[activeTab]}
    </div>
  );
}
