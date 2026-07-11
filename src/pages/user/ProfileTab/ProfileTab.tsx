import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { RootState } from '@/store';
import type { Loan } from '@/types/loan';
import { useMe, useMyLoansProfile, useUpdateProfile } from '@/hooks/useMe';
import { SkeletonProfileCard } from '@/components/ui/skeleton';
import ErrorState from '@/common/ErrorState';
import ProfileInfo from './ProfileInfo';
import LoanStats from './LoanStats';
import EditProfileModal from './EditProfileModal';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileTab() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: meData, isLoading, isError } = useMe();
  const { data: loansData } = useMyLoansProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const me = meData ?? user;
  const loans: Loan[] = loansData ?? [];
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
  });

  const openEditModal = () => {
    setFormData({
      name: me?.name ?? '',
      email: me?.email ?? '',
      phone: me?.phone ?? '',
    });

    setIsEditing(true);
  };

  const handleFieldChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      onError: (error: AxiosError<{ message?: string }>) => {
        toast.error(
          error.response?.data?.message ?? 'Failed to update profile',
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className='space-y-5'>
        <SkeletonProfileCard />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title='Failed to load profile'
        description='Please try again later.'
      />
    );
  }

  return (
    <section className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>Profile</h1>

      <ProfileInfo user={me} onEdit={openEditModal} />

      <LoanStats loans={loans} />

      {isEditing && (
        <EditProfileModal
          formData={formData}
          isPending={isPending}
          onChange={handleFieldChange}
          onSave={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </section>
  );
}
