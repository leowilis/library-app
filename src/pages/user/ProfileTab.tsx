/**
 * @file ProfileTab.tsx
 * @description User profile tab showing personal info, loan stats, and profile editing.
 */

import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '@/store/index';
import { useMe, useMyLoansProfile, useUpdateProfile } from '@/hooks/useMe';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AvatarIcon from '@/assets/avatar/avatar.svg';
import { SkeletonProfileCard } from '@/components/ui/skeleton';
import type { Loan } from '@/types/loan';
import type { AxiosError } from 'axios';

// Types

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

interface EditModalProps {
  formData: ProfileFormData;
  isPending: boolean;
  onChange: (field: keyof ProfileFormData, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

// Constants

const LOAN_STATS_CONFIG = [
  {
    key: 'total',
    label: 'Total Loans',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    key: 'active',
    label: 'Active',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    key: 'returned',
    label: 'Returned',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
  },
  { key: 'overdue', label: 'Overdue', color: 'text-red-600', bg: 'bg-red-50' },
] as const;

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400';

// EditModal

/**
 * Modal for editing user profile fields: name, email, and phone.
 */
function EditModal({
  formData,
  isPending,
  onChange,
  onSave,
  onClose,
}: EditModalProps) {
  const fields: {
    key: keyof ProfileFormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
    },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40'>
      <div className='bg-white rounded-3xl p-6 w-full max-w-md space-y-5 md:max-w-lg md:p-8'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-gray-900 md:text-xl'>
            Edit Profile
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 text-2xl leading-none'
          >
            ×
          </button>
        </div>

        <div className='space-y-4'>
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                {label}
              </label>
              <input
                type={type}
                value={formData[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className={inputClass}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isPending}
            className='flex-1 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50'
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ProfileTab

/**
 * Profile tab on the user profile page.
 *
 * Displays user info, loan statistics, and an edit profile modal.
 * Falls back to Redux auth state if API data is unavailable.
 */
export default function ProfileTab() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: meData, isLoading } = useMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { data: loansData } = useMyLoansProfile();

  const me = meData?.data?.user ?? user;
  const loans: Loan[] = loansData ?? [];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: me?.name ?? '',
    email: me?.email ?? '',
    phone: me?.phone ?? '',
  });

  const profileFields = [
    { label: 'Name', value: me?.name },
    { label: 'Email', value: me?.email },
    { label: 'Nomor Handphone', value: me?.phone ?? '-' },
  ];

  const loanStats = {
    total: loans.length,
    active: loans.filter((l) => l.status === 'BORROWED').length,
    returned: loans.filter((l) => l.status === 'RETURNED').length,
    overdue: loans.filter((l) => l.status === 'LATE').length,
  };

  const handleEdit = () => {
    setFormData({
      name: me?.name ?? '',
      email: me?.email ?? '',
      phone: me?.phone ?? '',
    });
    setIsEditing(true);
  };

  const handleFieldChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) return toast.error('Name is required');
    if (!formData.email.trim()) return toast.error('Email is required');

    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        toast.error(
          error.response?.data?.message ?? 'Failed to update profile',
        );
      },
    });
  };

  // ── Loading ──
  if (isLoading) {
    return (
      <div className='space-y-4 md:space-y-6'>
        <div className='h-8 w-24 bg-gray-100 rounded animate-pulse' />
        <SkeletonProfileCard />
      </div>
    );
  }

  return (
    <div className='space-y-4 md:space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>Profile</h1>

      <div className='bg-white rounded-2xl p-5 shadow-sm space-y-8 md:p-8 md:max-w-2xl md:space-y-6'>
        {/* Avatar */}
        <div className='md:flex md:items-center md:gap-5'>
          <img
            src={me?.profilePhoto ?? AvatarIcon}
            alt={me?.name ?? 'avatar'}
            className='w-16 h-16 rounded-full object-cover md:w-20 md:h-20 md:flex-shrink-0'
          />
        </div>

        {/* Profile Fields */}
        <div>
          {profileFields.map(({ label, value }) => (
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
            {LOAN_STATS_CONFIG.map(({ key, label, color, bg }) => (
              <div key={key} className={`${bg} rounded-2xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${color}`}>
                  {loanStats[key]}
                </p>
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
        <EditModal
          formData={formData}
          isPending={isPending}
          onChange={handleFieldChange}
          onSave={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
