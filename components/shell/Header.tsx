'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Header({ email }: { email: string }) {
  const router = useRouter()

  async function signOut() {
    const sb = createClient()
    await sb.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-medium text-text-primary">MMA Journal</h1>
        <p className="mt-0.5 text-xs text-text-secondary">Technique library &amp; training log</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-xs text-text-secondary sm:block">{email}</span>
        <button
          onClick={signOut}
          className="text-xs text-text-secondary underline hover:text-text-primary"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
