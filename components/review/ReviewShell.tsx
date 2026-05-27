'use client'

import { getTechniques, parseKey } from '@/lib/data/techniques'
import type { TechniqueLog } from '@/lib/types'

export default function ReviewShell({
  logs,
  sessionCount,
}: {
  logs: TechniqueLog[]
  sessionCount: number
}) {
  const gLogs = logs.filter(l => l.technique_key.startsWith('grappling'))
  const sLogs = logs.filter(l => l.technique_key.startsWith('striking'))

  return (
    <>
      {/* Banner */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3.5">
        <span className="text-xl">🔥</span>
        <p className="text-sm leading-relaxed text-amber-900">
          Coming back after a break? Here&apos;s your mental warm-up — most recently logged techniques by discipline.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {[
          { num: logs.length,   label: 'Total logged' },
          { num: gLogs.length,  label: 'Grappling' },
          { num: sLogs.length,  label: 'Striking' },
        ].map(({ num, label }) => (
          <div key={label} className="rounded-xl bg-bg-secondary p-3 text-center">
            <p className="text-2xl font-medium text-text-primary">{num}</p>
            <p className="mt-0.5 text-xs text-text-secondary">{label}</p>
          </div>
        ))}
      </div>

      {/* Session count */}
      <div className="mb-6 rounded-xl bg-bg-secondary p-3 text-center">
        <p className="text-2xl font-medium text-text-primary">{sessionCount}</p>
        <p className="mt-0.5 text-xs text-text-secondary">Sessions logged</p>
      </div>

      {/* Grappling recent */}
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
        Grappling — most recent
      </p>
      <TechGrid logs={gLogs.slice(0, 4)} loggedClass="border-l-[3px] border-l-emerald-600" />

      {/* Striking recent */}
      <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wide text-text-secondary">
        Striking — most recent
      </p>
      <TechGrid logs={sLogs.slice(0, 4)} loggedClass="border-l-[3px] border-l-orange-600" />
    </>
  )
}

function TechGrid({ logs, loggedClass }: { logs: TechniqueLog[]; loggedClass: string }) {
  if (logs.length === 0) {
    return <p className="text-sm text-text-secondary">None logged yet.</p>
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
      {logs.map(l => {
        const parsed = parseKey(l.technique_key)
        if (!parsed) return null
        const { disc, sub, tier, idx } = parsed
        const techs = getTechniques(disc as 'grappling' | 'striking', sub, tier)
        const tech  = techs[idx]
        if (!tech) return null

        return (
          <div key={l.technique_key}
            className={`rounded-xl border border-border-faint bg-bg-primary p-3.5 ${loggedClass}`}>
            <p className="text-sm font-medium text-text-primary">{tech.name}</p>
            <p className="mt-0.5 text-xs text-text-secondary">{sub} · {tier}</p>
            <span className="mt-2 inline-block rounded-full bg-bg-secondary px-2 py-0.5 text-[11px] text-text-secondary">
              {tech.position}
            </span>
          </div>
        )
      })}
    </div>
  )
}
