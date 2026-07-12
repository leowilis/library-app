import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
    <Dialog open onOpenChange={(open) => !open && !isPending && onClose()}>
      <DialogContent className='max-w-lg rounded-3xl'>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          {FIELDS.map(({ key, label, type, placeholder }) => (
            <div key={key} className='space-y-2'>
              <Label htmlFor={key}>{label}</Label>

              <Input
                id={key}
                type={type}
                value={formData[key]}
                placeholder={placeholder}
                disabled={isPending}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(key, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <DialogFooter className='flex-col gap-3 sm:flex-row'>
          <Button
            variant='outline'
            onClick={onClose}
            disabled={isPending}
            className='flex-1 rounded-full'
          >
            Cancel
          </Button>

          <Button
            onClick={onSave}
            disabled={isPending}
            className='flex-1 rounded-full'
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
