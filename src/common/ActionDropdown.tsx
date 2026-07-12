import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionDropdownProps {
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionDropdown({
  onPreview,
  onEdit,
  onDelete,
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Open actions'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={onPreview}>Preview</DropdownMenuItem>

        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDelete}
          className='text-destructive focus:text-destructive'
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
