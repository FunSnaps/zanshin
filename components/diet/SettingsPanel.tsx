'use client'

import { useState, useTransition } from 'react'
import { saveSettings } from '@/actions/saveSettings'
import type { UserSettings } from '@/lib/types'

export default function SettingsPanel({
  settings,
  onClose,
}: {
  settings: UserSettings
  onClose: () => void
}) {
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      try {
        await saveSettings(fd)
        onClose()
      } catch {
        setError('Failed to save settings.')
      }
    })
  }

  return (
    <div className="mb-4 rounded-xl border border-border-subtle bg-bg-secondary p-4">
      <p className="mb-3 text-sm font-medium text-text-primary">Daily Targets</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Calories (kcal)</label>
            <input
              name="calorieTarget"
              type="number"
              min={500}
              max={8000}
              step={50}
              defaultValue={settings.calorieTarget}
              required
              className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Protein (g)</label>
            <input
              name="proteinTarget"
              type="number"
              min={30}
              max={500}
              step={5}
              defaultValue={settings.proteinTarget}
              required
              className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary"
            />
          </div>
        </div>
        {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}
            className="rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-text-secondary">
            Cancel
          </button>
          <button type="submit" disabled={pending}
            className="rounded-lg bg-text-primary px-3 py-1.5 text-xs font-medium text-bg-primary disabled:opacity-50">
            {pending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
