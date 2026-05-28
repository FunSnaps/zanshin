'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { RecipeResult, MealSlot } from '@/lib/types'

interface Props {
  day: number
  dayLabel: string
  slot: MealSlot
  slotLabel: string
  onSelect: (recipe: RecipeResult) => void
  onClose: () => void
}

export default function RecipeSearch({ day, dayLabel, slot, slotLabel, onSelect, onClose }: Props) {
  const [query, setQuery]           = useState('')
  const [minProtein, setMinProtein] = useState('')
  const [maxCals, setMaxCals]       = useState('')
  const [results, setResults]       = useState<RecipeResult[]>([])
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  async function search() {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setResults([])
    try {
      const params = new URLSearchParams({ q: query.trim() })
      if (minProtein) params.set('minProtein', minProtein)
      if (maxCals)    params.set('maxCalories', maxCals)
      if (slot === 'snack') params.set('type', 'snack')

      const res = await fetch(`/api/recipes?${params}`)
      if (!res.ok) throw new Error('Search failed')
      const data: { results: RecipeResult[] } = await res.json()
      setResults(data.results)
      if (data.results.length === 0) setError('No recipes found — try different keywords.')
    } catch {
      setError('Search failed. Check your Spoonacular API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex h-[90vh] w-full max-w-lg flex-col rounded-t-2xl bg-bg-primary sm:h-auto sm:max-h-[80vh] sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-3">
          <div>
            <p className="text-sm font-medium text-text-primary">Add to {slotLabel}</p>
            <p className="text-xs text-text-secondary">{dayLabel}</p>
          </div>
          <button onClick={onClose} className="text-xl leading-none text-text-secondary">×</button>
        </div>

        {/* Search controls */}
        <div className="border-b border-border-faint px-4 py-3">
          <div className="mb-2.5 flex gap-2">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
              placeholder="Search recipes…"
              className="flex-1 rounded-lg border border-border-subtle bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary"
            />
            <button
              onClick={search}
              disabled={loading || !query.trim()}
              className="rounded-lg bg-text-primary px-4 py-2 text-sm font-medium text-bg-primary disabled:opacity-40"
            >
              {loading ? '…' : 'Search'}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              value={minProtein}
              onChange={e => setMinProtein(e.target.value)}
              placeholder="Min protein (g)"
              type="number"
              min={0}
              className="w-32 rounded-lg border border-border-subtle bg-bg-secondary px-3 py-1.5 text-xs text-text-primary placeholder:text-text-secondary"
            />
            <input
              value={maxCals}
              onChange={e => setMaxCals(e.target.value)}
              placeholder="Max calories"
              type="number"
              min={0}
              className="w-32 rounded-lg border border-border-subtle bg-bg-secondary px-3 py-1.5 text-xs text-text-primary placeholder:text-text-secondary"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {error && <p className="py-4 text-center text-sm text-text-secondary">{error}</p>}
          {results.length === 0 && !error && !loading && (
            <p className="py-8 text-center text-sm text-text-secondary">
              Search for a recipe above — filter by protein or calories to match your targets.
            </p>
          )}
          <div className="flex flex-col gap-2">
            {results.map(r => (
              <button
                key={r.id}
                onClick={() => { onSelect(r); onClose() }}
                className="flex items-center gap-3 rounded-xl border border-border-faint bg-bg-secondary px-3 py-2.5 text-left transition-colors hover:border-border-subtle"
              >
                {r.image && (
                  <Image
                    src={r.image}
                    alt={r.title}
                    width={56}
                    height={42}
                    className="h-10 w-14 rounded-lg object-cover"
                    unoptimized
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">{r.title}</p>
                  <div className="mt-0.5 flex gap-2">
                    <span className="text-xs text-text-secondary">{r.calories} kcal</span>
                    <span className="text-xs text-text-secondary">{r.protein}g protein</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
