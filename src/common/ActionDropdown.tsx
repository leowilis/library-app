import { useRef, useState } from 'react';

interface ActionDropdownProps {
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionDropdown = ({
  onPreview,
  onEdit,
  onDelete,
}: ActionDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        aria-label='Open actions menu'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋮
      </button>

      {isOpen && (
        <div
          role='menu'
          className='absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg'
        >
          <button
            type='button'
            role='menuitem'
            onClick={onPreview}
            className='block w-full px-4 py-2 text-left hover:bg-gray-100'
          >
            Preview
          </button>

          <button
            type='button'
            role='menuitem'
            onClick={onEdit}
            className='block w-full px-4 py-2 text-left hover:bg-gray-100'
          >
            Edit
          </button>

          <button
            type='button'
            role='menuitem'
            onClick={onDelete}
            className='block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
