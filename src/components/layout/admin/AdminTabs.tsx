import { Button } from '@/components/ui/button';

interface TabItem {
  label: string;
  path: string;
}

interface AdminTabsProps {
  tabs: TabItem[];
  pathname: string;
  onNavigate: (path: string) => void;
}

export default function AdminTabs({
  tabs,
  pathname,
  onNavigate,
}: AdminTabsProps) {
  return (
    <div className='m-4 px-4 pt-4 md:px-15 md:pt-12'>
      <div className='flex rounded-2xl bg-neutral-100 p-1.5 md:max-w-3xl'>
        {tabs.map((tab) => {
          const active = pathname.startsWith(tab.path);

          return (
            <Button
              key={tab.path}
              type='button'
              variant='ghost'
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              onClick={() => onNavigate(tab.path)}
              className={[
                'flex-1 rounded-xl px-4 py-2.5 text-sm transition-none',
                'hover:bg-transparent hover:text-inherit',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                active
                  ? 'bg-white font-semibold text-primary-600 shadow-sm'
                  : 'bg-transparent font-medium text-neutral-600',
              ].join(' ')}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
