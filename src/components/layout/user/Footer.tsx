import Logo from '@/assets/logo/logo.svg'

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-white mt-10 py-10 px-6 border-t border-gray-300">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Booky" width={32} height={32} />
          <span className="text-4xl font-extrabold text-gray-900">Booky</span>
        </div>

        {/* Description */}
        <p className="text-md font-semibold text-neutral-950 max-w-lg leading-relaxed">
          Discover inspiring stories & timeless knowledge, ready to borrow anytime.
          Explore online or visit our nearest library branch.
        </p>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <p className="text-lg font-extrabold text-gray-700 mb-2">Follow on Social Media</p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-400 hover:text-blue-500 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}