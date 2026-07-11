import { ChevronLeft } from 'lucide-react';

interface BookPreviewHeaderProps {
  onBack: () => void;
}

export default function BookPreviewHeader({
  onBack,
}: BookPreviewHeaderProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
    >
      <ChevronLeft
        size={18}
        aria-hidden="true"
      />
      <span>Back to Book List</span>
    </button>
  );
}