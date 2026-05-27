'use client'

import { useState, useTransition } from 'react'
import { saveSession } from '@/actions/saveSession'
import type { TrainingSession } from '@/lib/types'

const DISC_COLORS: Record<string, [string, string]> = {
  bjj:        ['#E1F5EE','#085041'],
  wrestling:  ['#EAF3DE','#27500A'],
  judo:       ['#EEEDFE','#26215C'],
  'muay thai':['#FAEEDA','#633806'],
  boxing:     ['#E6F1FB','#0C447C'],
  kickboxing: ['#FAECE7','#4A1B0C'],
  mixed:      ['#F1EFE8','#2C2C2A'],
}

export default function SessionsShell({ initialSessions }: { initialSessions: TrainingSession[] }) {
  const [sessions, setSessions] = useState(initialSessions)
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const fd = new FormData(form)

    startTransition(async () => {
      try {
        await saveSession(fd)
        // Optimistic update
        setSessions(prev => [{
          id:    crypto.randomUUID(),
          date:  fd.get('date') as string,
          disc:  fd.get('disc') as string,
          techs: (fd.get('techs') as string).split(',').map(t => t.trim()).filter(Boolean),
          notes: fd.get('notes') as string,
        }, ...prev])
        form.reset()
        setOpen(false)
      } catch {
        setError('Failed to save. Please try again.')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="mb-5 flex items-center gap-1.5 rounded-lg border border-border-subtle px-3.5 py-2 text-sm text-text-primary transition-colors hover:bg-bg-secondary"
      >
        <span className="text-base leading-none">+</span> Log session
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 rounded-xl bg-bg-secondary p-5"
        >
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-secondary">Date</label>
              <input name="date" type="date" defaultValue={today} required
                className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-secondary">Discipline</label>
              <select name="disc"
                className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary">
                <option value="bjj">BJJ</option>
                <option value="wrestling">Wrestling</option>
                <option value="judo">Judo</option>
                <option value="muay thai">Muay Thai</option>
                <option value="boxing">Boxing</option>
                <option value="kickboxing">Kickboxing</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
          <div className="mb-3 flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Techniques drilled (comma separated)</label>
            <input name="techs" type="text" placeholder="e.g. O-soto-gari, Armbar, Cross-hook"
              className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary" />
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <label className="text-xs text-text-secondary">Notes</label>
            <textarea name="notes" rows={3} placeholder="What clicked? What needs work? Any coach feedback?"
              className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary" />
          </div>
          {error && <p className="mb-3 text-xs text-red-600">{error}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)}
              className="rounded-lg border border-border-subtle px-4 py-1.5 text-sm text-text-secondary">
              Cancel
            </button>
            <button type="submit" disabled={pending}
              className="rounded-lg bg-text-primary px-4 py-1.5 text-sm font-medium text-bg-primary disabled:opacity-50">
              {pending ? 'Saving…' : 'Save session'}
            </button>
          </div>
        </form>
      )}

      {sessions.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">No sessions yet. Tap "Log session" to start.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {sessions.map(s => {
            const [bg, tc] = DISC_COLORS[s.disc] ?? ['#F1EFE8','#2C2C2A']
            return (
              <div key={s.id} className="rounded-xl border border-border-faint bg-bg-primary px-4 py-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">{s.date}</span>
                  <span className="rounded-full px-2 py-0.5 text-[11px]"
                    style={{ background: bg, color: tc }}>
                    {s.disc}
                  </span>
                </div>
                {s.techs.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {s.techs.map(t => (
                      <span key={t} className="rounded-full bg-bg-secondary px-2 py-0.5 text-[11px] text-text-secondary">{t}</span>
                    ))}
                  </div>
                )}
                {s.notes && <p className="text-sm leading-relaxed text-text-secondary">{s.notes}</p>}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
