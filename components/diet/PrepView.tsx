'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import RecipeDetailModal from './RecipeDetailModal'
import { savePrepEntry, togglePrepped } from '@/actions/savePrepPlan'
import type { PlannedMeal, PrepEntry, MealSlot, RecipeDetail, RecipeIngredient } from '@/lib/types'

const SLOT_LABEL: Record<MealSlot, string> = {
  meal1: 'Meal 1',
  meal2: 'Meal 2',
  snack: 'Snack',
}

interface RecipeCard {
  recipeId:    number
  title:       string
  image:       string
  slots:       { day: number; slot: MealSlot }[]  // where it appears this week
  portions:    number
  prepped:     boolean
}

function buildRecipeCards(
  meals: PlannedMeal[],
  weekStart: string,
  prepEntries: PrepEntry[],
): RecipeCard[] {
  const weekMeals = meals.filter(m => m.weekStart === weekStart)
  const byId = new Map<number, RecipeCard>()

  for (const m of weekMeals) {
    if (!byId.has(m.recipeId)) {
      const prep = prepEntries.find(p => p.weekStart === weekStart && p.recipeId === m.recipeId)
      byId.set(m.recipeId, {
        recipeId: m.recipeId,
        title:    m.title,
        image:    m.image,
        slots:    [],
        portions: prep?.portions ?? 1,
        prepped:  prep?.prepped ?? false,
      })
    }
    byId.get(m.recipeId)!.slots.push({ day: m.day, slot: m.slot })
  }

  return Array.from(byId.values())
}

// Format day number 0–6 → 'Mon', 'Tue', …
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function PrepView({
  meals,
  prepEntries,
  weekStart,
  onViewRecipe,
}: {
  meals:        PlannedMeal[]
  prepEntries:  PrepEntry[]
  weekStart:    string
  onViewRecipe: (id: number, title: string, image: string, portions: number) => void
}) {
  const [localEntries, setLocalEntries] = useState(prepEntries)
  const [detailTarget, setDetailTarget] = useState<{ id: number; title: string; image: string; portions: number } | null>(null)
  const [shoppingOpen, setShoppingOpen] = useState(false)
  const [shoppingData, setShoppingData] = useState<{ title: string; aisle: string; ingredients: { original: string }[] }[]>([])
  const [shoppingLoading, setShoppingLoading] = useState(false)
  const [, startTransition] = useTransition()

  const cards = buildRecipeCards(meals, weekStart, localEntries)

  function getEntry(recipeId: number) {
    return localEntries.find(e => e.weekStart === weekStart && e.recipeId === recipeId)
  }

  function updateLocal(recipeId: number, patch: Partial<PrepEntry>) {
    setLocalEntries(prev => {
      const idx = prev.findIndex(e => e.weekStart === weekStart && e.recipeId === recipeId)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], ...patch }
        return next
      }
      return [...prev, {
        id: crypto.randomUUID(),
        weekStart,
        recipeId,
        recipeTitle: cards.find(c => c.recipeId === recipeId)?.title ?? '',
        recipeImage: cards.find(c => c.recipeId === recipeId)?.image ?? '',
        portions: 1,
        prepped: false,
        ...patch,
      }]
    })
  }

  function setPortions(card: RecipeCard, delta: number) {
    const current = getEntry(card.recipeId)?.portions ?? card.portions
    const next = Math.max(1, Math.min(20, current + delta))
    updateLocal(card.recipeId, { portions: next })
    startTransition(async () => {
      const fd = new FormData()
      fd.set('weekStart',   weekStart)
      fd.set('recipeId',    String(card.recipeId))
      fd.set('recipeTitle', card.title)
      fd.set('recipeImage', card.image)
      fd.set('portions',    String(next))
      await savePrepEntry(fd)
    })
  }

  function handleTogglePrepped(card: RecipeCard) {
    const current = getEntry(card.recipeId)?.prepped ?? card.prepped
    const next = !current
    updateLocal(card.recipeId, { prepped: next })
    startTransition(async () => {
      // Ensure the row exists first
      const fd = new FormData()
      fd.set('weekStart',   weekStart)
      fd.set('recipeId',    String(card.recipeId))
      fd.set('recipeTitle', card.title)
      fd.set('recipeImage', card.image)
      fd.set('portions',    String(getEntry(card.recipeId)?.portions ?? card.portions))
      await savePrepEntry(fd)
      await togglePrepped(weekStart, card.recipeId, next)
    })
  }

  async function generateShoppingList() {
    setShoppingLoading(true)
    setShoppingOpen(true)
    setShoppingData([])

    const uniqueIds = Array.from(new Set(cards.map(c => c.recipeId)))
    const results: typeof shoppingData = []

    await Promise.all(uniqueIds.map(async id => {
      try {
        const res = await fetch(`/api/recipe/${id}`)
        if (!res.ok) return
        const detail: RecipeDetail = await res.json()
        const portions = getEntry(id)?.portions ?? 1
        const scale    = portions / (detail.servings || 1)

        const grouped = detail.ingredients.reduce<Record<string, RecipeIngredient[]>>((acc, ing) => {
          const key = ing.aisle || 'Other'
          ;(acc[key] ??= []).push(ing)
          return acc
        }, {})

        for (const [aisle, ings] of Object.entries(grouped)) {
          results.push({
            title: detail.title,
            aisle,
            ingredients: ings.map(ing => {
              const amt = ing.amount * scale
              const display = amt % 1 === 0 ? amt.toFixed(0) : amt.toFixed(1)
              return { original: `${display}${ing.unit ? ' ' + ing.unit : ''} ${ing.name}` }
            }),
          })
        }
      } catch { /* skip */ }
    }))

    setShoppingData(results)
    setShoppingLoading(false)
  }

  // Group shopping list by aisle across all recipes
  const aisleMap = shoppingData.reduce<Record<string, { recipe: string; item: string }[]>>((acc, r) => {
    ;(acc[r.aisle] ??= []).push(...r.ingredients.map(i => ({ recipe: r.title, item: i.original })))
    return acc
  }, {})

  if (cards.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-text-secondary">
        No meals planned for this week yet. Add some in the Planner tab.
      </p>
    )
  }

  return (
    <>
      {/* Recipe cards */}
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">This week's recipes</p>
      <div className="mb-6 flex flex-col gap-3">
        {cards.map(card => {
          const entry     = getEntry(card.recipeId)
          const portions  = entry?.portions ?? card.portions
          const prepped   = entry?.prepped  ?? card.prepped

          return (
            <div
              key={card.recipeId}
              className={`rounded-xl border bg-bg-primary px-4 py-3.5 transition-colors ${
                prepped ? 'border-emerald-300 bg-emerald-50/20' : 'border-border-faint'
              }`}
            >
              <div className="mb-2 flex items-start gap-3">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={56}
                    height={42}
                    className="h-10 w-14 shrink-0 rounded-lg object-cover"
                    unoptimized
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">{card.title}</p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {card.slots.map(s => `${DAY_SHORT[s.day]} ${SLOT_LABEL[s.slot]}`).join(' · ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                {/* Portions stepper */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">Portions</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPortions(card, -1)}
                      disabled={portions <= 1}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border-subtle text-sm text-text-secondary disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-text-primary">{portions}</span>
                    <button
                      onClick={() => setPortions(card, 1)}
                      disabled={portions >= 20}
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border-subtle text-sm text-text-secondary disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* View recipe */}
                  <button
                    onClick={() => setDetailTarget({ id: card.recipeId, title: card.title, image: card.image, portions })}
                    className="rounded-lg border border-border-subtle px-2.5 py-1 text-xs text-text-secondary hover:text-text-primary"
                  >
                    Instructions
                  </button>
                  {/* Mark prepped */}
                  <button
                    onClick={() => handleTogglePrepped(card)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                      prepped
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                        : 'border-border-subtle text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {prepped ? '✓ Prepped' : 'Mark done'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Shopping list */}
      <button
        onClick={shoppingOpen ? () => setShoppingOpen(false) : generateShoppingList}
        className="mb-3 flex w-full items-center justify-between rounded-xl border border-border-subtle px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-text-primary">🛒 Shopping List</span>
        <span className="text-text-secondary">{shoppingOpen ? '▲' : '▼'}</span>
      </button>

      {shoppingOpen && (
        <div className="rounded-xl border border-border-faint bg-bg-secondary px-4 py-3">
          {shoppingLoading && (
            <p className="py-4 text-center text-sm text-text-secondary">Building list…</p>
          )}
          {!shoppingLoading && Object.keys(aisleMap).length === 0 && (
            <p className="text-sm text-text-secondary">Nothing found — are your recipes using Spoonacular?</p>
          )}
          {!shoppingLoading && Object.entries(aisleMap).map(([aisle, items]) => (
            <div key={aisle} className="mb-3">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary">{aisle}</p>
              <ul className="flex flex-col gap-1">
                {items.map((item, i) => (
                  <ShoppingItem key={i} item={item.item} recipe={item.recipe} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Recipe detail modal */}
      {detailTarget && (
        <RecipeDetailModal
          recipeId={detailTarget.id}
          title={detailTarget.title}
          image={detailTarget.image}
          portions={detailTarget.portions}
          onClose={() => setDetailTarget(null)}
        />
      )}
    </>
  )
}

function ShoppingItem({ item, recipe }: { item: string; recipe: string }) {
  const [checked, setChecked] = useState(false)
  return (
    <li className="flex items-start gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
        className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-emerald-600"
      />
      <span className={`text-sm transition-opacity ${checked ? 'text-text-secondary line-through opacity-50' : 'text-text-primary'}`}>
        {item}
        <span className="ml-1 text-xs text-text-secondary">({recipe})</span>
      </span>
    </li>
  )
}
