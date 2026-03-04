import { useRef, useState } from "react";

interface ActionDropdownProps {
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionDropdown = ({ onPreview, onEdit, onDelete }: ActionDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>⋮</button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <button onClick={onPreview} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Preview</button>
          <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
          <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Delete</button>
        </div>
      )}
    </div>
  );
};