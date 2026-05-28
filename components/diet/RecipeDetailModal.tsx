'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { RecipeDetail, RecipeIngredient } from '@/lib/types'

interface Props {
  recipeId: number
  title:    string
  image:    string
  portions: number   // used to scale ingredient amounts
  onClose:  () => void
}

export default function RecipeDetailModal({ recipeId, title, image, portions, onClose }: Props) {
  const [detail, setDetail]   = useState<RecipeDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    fetch(`/api/recipe/${recipeId}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then((d: RecipeDetail) => setDetail(d))
      .catch(() => setError('Could not load recipe. Check your API key.'))
      .finally(() => setLoading(false))
  }, [recipeId])

  const scale = detail ? portions / (detail.servings || 1) : 1

  // Group ingredients by aisle
  const byAisle = detail?.ingredients.reduce<Record<string, RecipeIngredient[]>>((acc, ing) => {
    const key = ing.aisle || 'Other'
    ;(acc[key] ??= []).push(ing)
    return acc
  }, {}) ?? {}

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-bg-primary sm:h-auto sm:max-h-[85vh] sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border-faint p-4">
          <div className="flex items-center gap-3">
            {image && (
              <Image
                src={image}
                alt={title}
                width={56}
                height={42}
                className="h-10 w-14 shrink-0 rounded-lg object-cover"
                unoptimized
              />
            )}
            <p className="text-sm font-medium leading-snug text-text-primary">{title}</p>
          </div>
          <button onClick={onClose} className="shrink-0 text-xl leading-none text-text-secondary">×</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <p className="py-12 text-center text-sm text-text-secondary">Loading recipe…</p>
          )}
          {error && (
            <p className="py-12 text-center text-sm text-red-500">{error}</p>
          )}
          {detail && (
            <>
              {portions !== detail.servings && (
                <p className="mb-4 rounded-lg bg-bg-secondary px-3 py-2 text-xs text-text-secondary">
                  Scaled for <strong className="text-text-primary">{portions} portion{portions !== 1 ? 's' : ''}</strong>
                  {' '}(recipe makes {detail.servings})
                </p>
              )}

              {/* Ingredients */}
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">Ingredients</p>
              <div className="mb-5 flex flex-col gap-3">
                {Object.entries(byAisle).map(([aisle, ings]) => (
                  <div key={aisle}>
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary opacity-70">{aisle}</p>
                    <ul className="flex flex-col gap-0.5">
                      {ings.map((ing, i) => {
                        const scaledAmt = ing.amount * scale
                        const displayAmt = scaledAmt % 1 === 0
                          ? scaledAmt.toFixed(0)
                          : scaledAmt.toFixed(1)
                        return (
                          <li key={i} className="flex items-baseline gap-1.5 text-sm text-text-primary">
                            <span className="text-text-secondary">·</span>
                            <span className="font-medium">{displayAmt}{ing.unit && ` ${ing.unit}`}</span>
                            <span>{ing.name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              {detail.steps.length > 0 && (
                <>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">Instructions</p>
                  <ol className="flex flex-col gap-3">
                    {detail.steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-[10px] font-medium text-text-secondary">
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-text-primary">{step}</p>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {/* Source link */}
              {detail.sourceUrl && (
                <a
                  href={detail.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-xs text-text-secondary underline underline-offset-2"
                >
                  View original recipe ↗
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
