import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '@/store/index';
import { useMe, useMyLoansProfile, useUpdateProfile } from '@/hooks/useMe';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AvatarIcon from '@/assets/avatar/avatar.svg';
import { SkeletonProfileCard } from '@/components/ui/skeleton';

export default function ProfileTab() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: meData, isLoading } = useMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data: loansData } = useMyLoansProfile();

  const me = meData?.data?.user ?? user;
  const loans = loansData?.data?.loans ?? loansData?.loans ?? [];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: me?.name || '',
    email: me?.email || '',
    phone: me?.phone || '',
  });

  const fields = [
    { label: 'Name', value: me?.name },
    { label: 'Email', value: me?.email },
    { label: 'Nomor Handphone', value: me?.phone ?? '-' },
  ];

  const stats = {
    total: loans.length,
    active: loans.filter((l: any) => l.status === 'BORROWED').length,
    returned: loans.filter((l: any) => l.status === 'RETURNED').length,
    overdue: loans.filter((l: any) => l.status === 'LATE').length,
  };

  const handleEdit = () => {
    setFormData({
      name: me?.name || '',
      email: me?.email || '',
      phone: me?.phone || '',
    });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to update profile',
        );
      },
    });
  };

  // Skeleton Loading
  if (isLoading) {
  return (
    <div className='space-y-4 md:space-y-6'>
      <div className='h-8 w-24 bg-gray-100 rounded animate-pulse' />
      <SkeletonProfileCard />
    </div>
  )
}
  return (
    <div className='space-y-4 md:space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>Profile</h1>

      <div className='bg-white rounded-2xl p-5 shadow-sm space-y-8 md:p-8 md:max-w-2xl md:space-y-6'>
        {/* Avatar + Name row on desktop */}
        <div className='md:flex md:items-center md:gap-5'>
          <img
            src={me?.profilePhoto ?? AvatarIcon}
            alt={me?.name ?? 'avatar'}
            className='w-16 h-16 rounded-full object-cover md:w-20 md:h-20 md:flex-shrink-0'
          />
        </div>

        {/* Fields */}
        <div className='md:rounded-xl'>
          {fields.map(({ label, value }) => (
            <div
              key={label}
              className='flex items-center justify-between py-4 border-gray-100 md:px-4 md:py-3'
            >
              <span className='text-sm text-neutral-950'>{label}</span>
              <span className='text-sm font-semibold text-gray-900'>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Loan Statistics */}
        <div>
          <p className='text-sm font-bold text-gray-700 mb-3'>
            Loan Statistics
          </p>
          <div className='grid grid-cols-2 gap-3'>
            {[
              {
                label: 'Total Loans',
                value: stats.total,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                label: 'Active',
                value: stats.active,
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                label: 'Returned',
                value: stats.returned,
                color: 'text-gray-600',
                bg: 'bg-gray-50',
              },
              {
                label: 'Overdue',
                value: stats.overdue,
                color: 'text-red-600',
                bg: 'bg-red-50',
              },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className='text-xs text-gray-500 mt-1'>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex gap-3 md:justify-center'>
          <Button
            onClick={handleEdit}
            className='flex-1 rounded-full py-6 font-semibold text-white bg-blue-600 hover:bg-blue-700 md:flex-none md:px-[250px]'
          >
            Update Profile
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40'>
          <div className='bg-white rounded-3xl p-6 w-full max-w-md space-y-5 md:max-w-lg md:p-8'>
            {/* Header */}
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-bold text-gray-900 md:text-xl'>
                Edit Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className='text-gray-400 hover:text-gray-600 text-2xl leading-none'
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400'
                  placeholder='Enter your name'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400'
                  placeholder='Enter your phone number'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-3'>
              <button
                onClick={() => setIsEditing(false)}
                className='flex-1 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isPending}
                className='flex-1 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50'
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
