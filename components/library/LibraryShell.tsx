'use client'

import { useState, useTransition } from 'react'
import { logTechnique } from '@/actions/logTechnique'
import { getTechniques, makeKey } from '@/lib/data/techniques'
import type { TechniqueLog, Technique } from '@/lib/types'

// ── Types ────────────────────────────────────────────────
type Disc    = 'grappling' | 'striking'
type GSub    = 'bjj' | 'wrestling' | 'judo'
type SSub    = 'mt' | 'boxing' | 'kb'

// ── Pill config ──────────────────────────────────────────
const BJJ_BELTS    = ['white','blue','purple','brown','black'] as const
const W_LEVELS     = ['beginner','intermediate','advanced']    as const
const J_BELTS      = ['white','yellow','orange','green','black'] as const
const J_BELT_LABELS: Record<string,string> = {
  white:'White (9th–6th kyu)', yellow:'Yellow (5th kyu)',
  orange:'Orange (4th–3rd kyu)', green:'Green (2nd–1st kyu)', black:'Black (Dan)',
}
const S_LEVELS     = ['beginner','intermediate','advanced','elite'] as const

const BELT_STYLE: Record<string,string> = {
  white:   'bg-white text-neutral-700 border-neutral-300',
  blue:    'bg-blue-700 text-white',
  purple:  'bg-purple-800 text-white',
  brown:   'bg-stone-700 text-white',
  black:   'bg-neutral-900 text-white',
  yellow:  'bg-amber-400 text-white',
  orange:  'bg-orange-600 text-white',
  green:   'bg-green-800 text-white',
  beginner:    'bg-emerald-100 text-emerald-900',
  intermediate:'bg-amber-100 text-amber-900',
  advanced:    'bg-red-100 text-red-900',
  elite:       'bg-neutral-900 text-white',
}

// ── Component ────────────────────────────────────────────
export default function LibraryShell({ initialLogs }: { initialLogs: TechniqueLog[] }) {
  const [disc, setDisc]     = useState<Disc>('grappling')
  const [gsub, setGSub]     = useState<GSub>('bjj')
  const [ssub, setSSub]     = useState<SSub>('mt')
  const [belt, setBelt]     = useState('white')
  const [wlevel, setWLevel] = useState('beginner')
  const [jbelt, setJBelt]   = useState('white')
  const [slevel, setSLevel] = useState('beginner')
  const [modal, setModal]   = useState<{ tech: Technique; key: string } | null>(null)
  const [notes, setNotes]   = useState('')
  const [logs, setLogs]     = useState<Record<string, TechniqueLog>>(() => {
    const map: Record<string, TechniqueLog> = {}
    initialLogs.forEach(l => { map[l.technique_key] = l })
    return map
  })
  const [pending, startTransition] = useTransition()

  const sub  = disc === 'grappling' ? gsub : ssub
  const tier = disc === 'grappling'
    ? (gsub === 'bjj' ? belt : gsub === 'wrestling' ? wlevel : jbelt)
    : slevel
  const techs = getTechniques(disc, sub, tier)

  function openModal(tech: Technique, idx: number) {
    const key = makeKey(disc, sub, tier, idx)
    setNotes(logs[key]?.notes ?? '')
    setModal({ tech, key })
  }

  function handleSave() {
    if (!modal) return
    const { key } = modal
    const n = notes
    setLogs(prev => ({ ...prev, [key]: { technique_key: key, notes: n, logged: true } }))
    setModal(null)
    startTransition(() => { logTechnique(key, n) })
  }

  const isGrappling = disc === 'grappling'
  const loggedClass = isGrappling ? 'border-l-[3px] border-l-emerald-600' : 'border-l-[3px] border-l-orange-600'

  return (
    <>
      {/* ── Discipline tabs ── */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setDisc('grappling')}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
            disc === 'grappling'
              ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
              : 'border-border-subtle text-text-secondary'
          }`}
        >
          Grappling
        </button>
        <button
          onClick={() => setDisc('striking')}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
            disc === 'striking'
              ? 'border-orange-600 bg-orange-50 text-orange-900'
              : 'border-border-subtle text-text-secondary'
          }`}
        >
          Striking
        </button>
      </div>

      {/* ── Sub-discipline tabs ── */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {disc === 'grappling' ? (
          <>
            {(['bjj','wrestling','judo'] as GSub[]).map(s => (
              <button key={s} onClick={() => setGSub(s)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  gsub === s
                    ? s === 'bjj'      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                    : s === 'wrestling'? 'border-lime-600 bg-lime-50 text-lime-900'
                    :                   'border-violet-500 bg-violet-50 text-violet-900'
                    : 'border-border-subtle text-text-secondary'
                }`}
              >
                {s === 'bjj' ? 'BJJ' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </>
        ) : (
          <>
            {([['mt','Muay Thai'],['boxing','Boxing'],['kb','Kickboxing']] as [SSub,string][]).map(([s,label]) => (
              <button key={s} onClick={() => setSSub(s)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  ssub === s
                    ? s === 'mt'     ? 'border-amber-600 bg-amber-50 text-amber-900'
                    : s === 'boxing' ? 'border-blue-500 bg-blue-50 text-blue-900'
                    :                  'border-red-500 bg-red-50 text-red-900'
                    : 'border-border-subtle text-text-secondary'
                }`}
              >
                {label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* ── Belt / level pills ── */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {disc === 'grappling' && gsub === 'bjj' && BJJ_BELTS.map(b => (
          <button key={b} onClick={() => setBelt(b)}
            className={`rounded-full border-[1.5px] px-3 py-1 text-xs font-medium transition-all ${BELT_STYLE[b]} ${
              belt === b ? 'opacity-100' : 'opacity-45 hover:opacity-70'
            }`}
          >{b.charAt(0).toUpperCase() + b.slice(1)}</button>
        ))}
        {disc === 'grappling' && gsub === 'wrestling' && W_LEVELS.map(l => (
          <button key={l} onClick={() => setWLevel(l)}
            className={`rounded-full border-[1.5px] border-transparent px-3 py-1 text-xs font-medium transition-all ${BELT_STYLE[l]} ${
              wlevel === l ? 'opacity-100' : 'opacity-45 hover:opacity-70'
            }`}
          >{l.charAt(0).toUpperCase() + l.slice(1)}</button>
        ))}
        {disc === 'grappling' && gsub === 'judo' && J_BELTS.map(b => (
          <button key={b} onClick={() => setJBelt(b)}
            className={`rounded-full border-[1.5px] px-3 py-1 text-xs font-medium transition-all ${BELT_STYLE[b]} ${
              jbelt === b ? 'opacity-100' : 'opacity-45 hover:opacity-70'
            }`}
          >{J_BELT_LABELS[b]}</button>
        ))}
        {disc === 'striking' && S_LEVELS.map(l => (
          <button key={l} onClick={() => setSLevel(l)}
            className={`rounded-full border-[1.5px] border-transparent px-3 py-1 text-xs font-medium transition-all ${BELT_STYLE[l]} ${
              slevel === l ? 'opacity-100' : 'opacity-45 hover:opacity-70'
            }`}
          >{l.charAt(0).toUpperCase() + l.slice(1)}</button>
        ))}
      </div>

      {/* ── Technique grid ── */}
      {techs.length === 0 ? (
        <p className="py-4 text-sm text-text-secondary">No techniques at this level yet.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
          {techs.map((tech, i) => {
            const key = makeKey(disc, sub, tier, i)
            const isLogged = logs[key]?.logged
            return (
              <button
                key={key}
                onClick={() => openModal(tech, i)}
                className={`rounded-xl border border-border-faint bg-bg-primary p-3.5 text-left transition-colors hover:border-border-primary ${
                  isLogged ? loggedClass : ''
                }`}
              >
                <p className="text-sm font-medium text-text-primary">{tech.name}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{tech.steps.length} steps</p>
                <span className="mt-2 inline-block rounded-full bg-bg-secondary px-2 py-0.5 text-[11px] text-text-secondary">
                  {tech.position}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-10"
          onClick={e => { if (e.target === e.currentTarget) setModal(null) }}
        >
          <div className="w-full max-w-md rounded-xl border border-border-subtle bg-bg-primary p-5">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h2 className="text-base font-medium text-text-primary">{modal.tech.name}</h2>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  isGrappling ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'
                }`}>
                  {sub} · {tier}
                </span>
              </div>
              <button onClick={() => setModal(null)} className="text-lg text-text-secondary">✕</button>
            </div>

            <p className="mb-1 text-[11px] uppercase tracking-wide text-text-secondary">Position / range</p>
            <p className="mb-3 text-sm text-text-primary">{modal.tech.position}</p>

            <p className="mb-2 text-[11px] uppercase tracking-wide text-text-secondary">Execution — step by step</p>
            <ol className="mb-4 list-none space-y-0">
              {modal.tech.steps.map((step, i) => (
                <li key={i} className="flex gap-2.5 border-b border-border-faint py-2 last:border-none">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-[10px] font-medium text-text-secondary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm leading-snug text-text-primary">{step.d}</p>
                    {step.cue && (
                      <p className="mt-0.5 text-[11px] italic text-text-secondary">{step.cue}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <p className="mb-1 text-[11px] uppercase tracking-wide text-text-secondary">My notes</p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Personal cues, coach corrections, things that clicked..."
              rows={3}
              className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-border-primary"
            />
            <button
              onClick={handleSave}
              disabled={pending}
              className="mt-3 w-full rounded-lg bg-text-primary py-2 text-sm font-medium text-bg-primary disabled:opacity-50"
            >
              {logs[modal.key]?.logged ? 'Update notes' : 'Save notes & mark logged'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
