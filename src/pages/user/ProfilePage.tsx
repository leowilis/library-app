import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileTab from './ProfileTab'
import BorrowedTab from './BorrowTab'
import ReviewsTab from './ReviewsTab'


type Tab = 'profile' | 'borrowed' | 'reviews'

const TABS: { key: Tab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'borrowed', label: 'Borrowed List' },
  { key: 'reviews', label: 'Reviews' },
]

export default function ProfilePage() {
  const location = useLocation()

  const getInitialTab = (): Tab => {
    if (location.pathname.includes('borrowed')) return 'borrowed'
    if (location.pathname.includes('reviews')) return 'reviews'
    return 'profile'
  }

  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab)

  return (
    <div className="px-2 pt-4 pb-10 space-y-7">
      <div className="flex bg-neutral-100 rounded-2xl p-2">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
            style={{
              backgroundColor: activeTab === key ? 'white' : 'transparent',
              color: activeTab === key ? 'var(--primary-300)' : '#6b7280',
              fontWeight: activeTab === key ? 600 : 400,
              boxShadow: activeTab === key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'borrowed' && <BorrowedTab />}
      {activeTab === 'reviews' && <ReviewsTab />}
    </div>
  )
}