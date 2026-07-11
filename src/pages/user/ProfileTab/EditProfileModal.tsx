import type { ChangeEvent } from 'react';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

interface EditProfileModalProps {
  formData: ProfileFormData;
  isPending: boolean;
  onChange: (field: keyof ProfileFormData, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500';

const FIELDS: {
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

export default function EditProfileModal({
  formData,
  isPending,
  onChange,
  onSave,
  onClose,
}: EditProfileModalProps) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='edit-profile-title'
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'
    >
      <div className='w-full max-w-md space-y-6 rounded-3xl bg-white p-6 md:max-w-lg md:p-8'>
        <div className='flex items-center justify-between'>
          <h2
            id='edit-profile-title'
            className='text-xl font-bold text-gray-900'
          >
            Edit Profile
          </h2>

          <button
            type='button'
            onClick={onClose}
            disabled={isPending}
            className='text-2xl leading-none text-gray-400 transition hover:text-gray-700 disabled:opacity-50'
          >
            ×
          </button>
        </div>

        <div className='space-y-4'>
          {FIELDS.map(({ key, label, type, placeholder }) => (
            <div key={key} className='space-y-2'>
              <label className='text-sm font-semibold text-gray-700'>
                {label}
              </label>

              <input
                type={type}
                value={formData[key]}
                placeholder={placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(key, e.target.value)
                }
                className={INPUT_CLASS}
              />
            </div>
          ))}
        </div>

        <div className='flex gap-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={isPending}
            className='flex-1 rounded-full border-2 border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50'
          >
            Cancel
          </button>

          <button
            type='button'
            onClick={onSave}
            disabled={isPending}
            className='flex-1 rounded-full bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50'
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
