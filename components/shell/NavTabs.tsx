'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { label: 'Technique Library', href: '/library' },
  { label: 'Session Log',       href: '/sessions' },
  { label: 'Break Review',      href: '/review' },
  { label: 'Meal Planner',      href: '/diet' },
]

export default function NavTabs() {
  const pathname = usePathname()

  return (
    <nav className="mb-6 flex gap-1 rounded-lg bg-bg-secondary p-1">
      {TABS.map(({ label, href }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 rounded-md py-1.5 text-center text-xs font-medium transition-all ${
              active
                ? 'border border-border-subtle bg-bg-primary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
