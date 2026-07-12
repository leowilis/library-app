import { Button } from "@/components/ui/button";

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
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
              onClick={() => onNavigate(tab.path)}
              className={[
                'flex-1 whitespace-nowrap rounded-xl px-1 py-2.5 text-xs transition-all',
                active
                  ? 'bg-white font-semibold text-blue-600 shadow-sm'
                  : 'font-normal text-gray-500 hover:text-blue-600',
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
