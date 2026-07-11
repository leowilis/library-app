import { useEffect, useRef, useState } from 'react';
import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

interface BookActionDropdownProps {
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

type ActionKey = 'preview' | 'edit' | 'delete';

type Action = {
  key: ActionKey;
  label: string;
  icon: LucideIcon;
  color: string;
};

const ACTIONS: Action[] = [
  {
    key: 'preview',
    label: 'Preview',
    icon: Eye,
    color: 'text-gray-700 hover:bg-gray-100',
  },
  {
    key: 'edit',
    label: 'Edit',
    icon: Pencil,
    color: 'text-gray-700 hover:bg-gray-100',
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
    color: 'text-red-600 hover:bg-red-50',
  },
];

export default function BookActionDropdown({
  onPreview,
  onEdit,
  onDelete,
}: BookActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);

    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handlers: Record<ActionKey, () => void> = {
    preview: onPreview,
    edit: onEdit,
    delete: onDelete,
  };

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        aria-label='Open book actions'
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className='rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100'
      >
        <MoreVertical size={18} aria-hidden='true' />
      </button>

      {open && (
        <div
          role='menu'
          className='absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg'
        >
          {ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.key}
                type='button'
                role='menuitem'
                aria-label={action.label}
                onClick={() => {
                  handlers[action.key]();
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${action.color}`}
              >
                <Icon size={16} aria-hidden='true' />
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
