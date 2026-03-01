import { useSelector } from 'react-redux'
import type { RootState } from '@/store/index'
import { useMe } from '@/hooks/useMe'
import { Button } from '@/components/ui/button'
import AvatarIcon from '@/assets/avatar/avatar.svg'

export default function ProfileTab() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { data: meData } = useMe()
  const me = meData?.data?.user ?? user

  const fields = [
    { label: 'Name', value: me?.name },
    { label: 'Email', value: me?.email },
    { label: 'Nomor Handphone', value: me?.phone ?? '-' },
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <img
          src={me?.profilePhoto ?? AvatarIcon}
          alt={me?.name ?? 'avatar'}
          className="w-16 h-16 rounded-full object-cover"
        />

        {fields.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-400">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
          </div>
        ))}

        <Button
          className="w-full rounded-full py-6 font-semibold text-white"
          style={{ backgroundColor: 'var(--primary-300)' }}
        >
          Update Profile
        </Button>
      </div>
    </div>
  )
}