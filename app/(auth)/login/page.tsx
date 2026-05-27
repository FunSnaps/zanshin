'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Mode = 'signin' | 'signup'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setInfo('')

    if (!email || !password) { setError('Email and password are required.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    const sb = createClient()

    try {
      if (mode === 'signin') {
        const { error } = await sb.auth.signInWithPassword({ email, password })
        if (error) { setError(error.message); return }
        router.push('/library')
        router.refresh()
      } else {
        const { data, error } = await sb.auth.signUp({ email, password })
        if (error) { setError(error.message); return }
        if (!data.session) {
          setInfo('Check your email for a confirmation link, then sign in.')
        } else {
          router.push('/library')
          router.refresh()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-border-subtle bg-bg-primary p-8">
      <h1 className="mb-1 text-xl font-semibold text-text-primary">Zanshin</h1>
      <p className="mb-6 text-sm text-text-secondary">
        {mode === 'signin' ? 'Sign in to your MMA journal' : 'Create your MMA journal account'}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-text-secondary">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-border-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-xs text-text-secondary">Password</label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-border-primary"
          />
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
        {info  && <p className="text-xs text-green-700">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 rounded-lg bg-text-primary py-2 text-sm font-medium text-bg-primary transition-opacity disabled:opacity-50"
        >
          {loading
            ? (mode === 'signin' ? 'Signing in…' : 'Creating account…')
            : (mode === 'signin' ? 'Sign in'     : 'Create account')}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-text-secondary">
        <button
          onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError(''); setInfo('') }}
          className="font-medium text-text-primary underline"
        >
          {mode === 'signin' ? 'Create an account instead' : 'Already have an account? Sign in'}
        </button>
      </p>
    </div>
  )
}
