'use client'

import { useState, useTransition, useMemo } from 'react'
import Image from 'next/image'
import RecipeSearch from './RecipeSearch'
import SettingsPanel from './SettingsPanel'
import PrepView from './PrepView'
import RecipeDetailModal from './RecipeDetailModal'
import { saveMealPlan, removeMealPlan } from '@/actions/saveMealPlan'
import type { PlannedMeal, MealSlot, RecipeResult, UserSettings, PrepEntry } from '@/lib/types'

// ─── helpers ────────────────────────────────────────────────────────────────

function addDays(iso: string, n: number): string {
  const d = new Date(iso)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

function formatDay(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatWeek(weekStart: string): string {
  const start = new Date(weekStart + 'T00:00:00')
  const end   = new Date(weekStart + 'T00:00:00')
  end.setDate(end.getDate() + 6)
  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  return `${fmt(start)} – ${fmt(end)}`
}

const SLOTS: { key: MealSlot; label: string }[] = [
  { key: 'meal1', label: 'Meal 1' },
  { key: 'meal2', label: 'Meal 2' },
  { key: 'snack', label: 'Snack'  },
]

// ─── component ──────────────────────────────────────────────────────────────

interface SearchTarget { day: number; slot: MealSlot }

interface DetailTarget { id: number; title: string; image: string; portions: number }

export default function DietShell({
  initialMeals,
  initialSettings,
  initialWeekStart,
  initialPrepEntries,
}: {
  initialMeals:       PlannedMeal[]
  initialSettings:    UserSettings
  initialWeekStart:   string
  initialPrepEntries: PrepEntry[]
}) {
  const today       = new Date()
  const todayIso    = today.toISOString().split('T')[0]
  const thisMonday  = initialWeekStart

  const [activeTab, setActiveTab]   = useState<'planner' | 'prep'>('planner')
  const [weekStart, setWeekStart]   = useState(initialWeekStart)
  const [meals, setMeals]           = useState(initialMeals)
  const [settings, setSettings]     = useState(initialSettings)
  const [prepEntries]               = useState<PrepEntry[]>(initialPrepEntries)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTarget, setSearchTarget] = useState<SearchTarget | null>(null)
  const [detailTarget, setDetailTarget] = useState<DetailTarget | null>(null)
  const [, startTransition] = useTransition()

  // Build a lookup map: `${weekStart}|${day}|${slot}` → PlannedMeal
  const mealMap = useMemo(() => {
    const map = new Map<string, PlannedMeal>()
    meals.forEach(m => map.set(`${m.weekStart}|${m.day}|${m.slot}`, m))
    return map
  }, [meals])

  function getMeal(day: number, slot: MealSlot): PlannedMeal | undefined {
    return mealMap.get(`${weekStart}|${day}|${slot}`)
  }

  function handleSelect(recipe: RecipeResult) {
    if (!searchTarget) return
    const { day, slot } = searchTarget

    const newMeal: PlannedMeal = {
      id:        crypto.randomUUID(),
      weekStart,
      day,
      slot,
      recipeId:  recipe.id,
      title:     recipe.title,
      image:     recipe.image,
      calories:  recipe.calories,
      protein:   recipe.protein,
    }

    // Optimistic update
    setMeals(prev => [
      ...prev.filter(m => !(m.weekStart === weekStart && m.day === day && m.slot === slot)),
      newMeal,
    ])

    // Persist via Server Action
    startTransition(async () => {
      const fd = new FormData()
      fd.set('weekStart',  weekStart)
      fd.set('day',        String(day))
      fd.set('slot',       slot)
      fd.set('recipeId',   String(recipe.id))
      fd.set('title',      recipe.title)
      fd.set('image',      recipe.image)
      fd.set('calories',   String(recipe.calories))
      fd.set('protein',    String(recipe.protein))
      await saveMealPlan(fd)
    })
  }

  function handleRemove(day: number, slot: MealSlot) {
    setMeals(prev => prev.filter(
      m => !(m.weekStart === weekStart && m.day === day && m.slot === slot),
    ))
    startTransition(async () => {
      await removeMealPlan(weekStart, day, slot)
    })
  }

  // ─── per-day totals ────────────────────────────────────────────────────────

  function dayTotals(day: number) {
    return SLOTS.reduce(
      (acc, { key }) => {
        const m = getMeal(day, key)
        return { cal: acc.cal + (m?.calories ?? 0), pro: acc.pro + (m?.protein ?? 0) }
      },
      { cal: 0, pro: 0 },
    )
  }

  // ─── render ────────────────────────────────────────────────────────────────

  const isThisWeek = weekStart === thisMonday
  const activeSearchSlot = searchTarget
    ? SLOTS.find(s => s.key === searchTarget.slot)
    : null

  return (
    <>
      {/* Tab toggle */}
      <div className="mb-4 flex gap-1 rounded-lg bg-bg-secondary p-1">
        {(['planner', 'prep'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md py-1.5 text-center text-xs font-medium capitalize transition-all ${
              activeTab === tab
                ? 'border border-border-subtle bg-bg-primary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab === 'planner' ? 'Planner' : 'Prep & Shop'}
          </button>
        ))}
      </div>

      {/* Prep tab */}
      {activeTab === 'prep' && (
        <PrepView
          meals={meals}
          prepEntries={prepEntries}
          weekStart={weekStart}
          onViewRecipe={(id, title, image, portions) =>
            setDetailTarget({ id, title, image, portions })
          }
        />
      )}

      {activeTab === 'planner' && (
      <>
      {/* Week navigation */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setWeekStart(prev => addDays(prev, -7))}
          className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-sm text-text-secondary hover:text-text-primary"
        >
          ‹
        </button>
        <span className="flex-1 text-center text-sm font-medium text-text-primary">
          {formatWeek(weekStart)}
          {isThisWeek && <span className="ml-1.5 text-xs text-text-secondary">(this week)</span>}
        </span>
        <button
          onClick={() => setWeekStart(prev => addDays(prev, 7))}
          className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-sm text-text-secondary hover:text-text-primary"
        >
          ›
        </button>
        <button
          onClick={() => { setShowSettings(s => !s) }}
          title="Targets"
          className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-sm text-text-secondary hover:text-text-primary"
        >
          ⚙
        </button>
      </div>

      {!isThisWeek && (
        <button
          onClick={() => setWeekStart(thisMonday)}
          className="mb-3 text-xs text-text-secondary underline underline-offset-2"
        >
          Jump to this week
        </button>
      )}

      {/* Settings panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onClose={() => {
            setShowSettings(false)
            // Settings are persisted server-side; re-read from server after revalidation
            // For optimistic local update we'd need the new values — skip for simplicity;
            // page will revalidate on next navigation
          }}
        />
      )}

      {/* Day cards */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 7 }, (_, dayIdx) => {
          const iso    = addDays(weekStart, dayIdx)
          const totals = dayTotals(dayIdx)
          const calPct = Math.min(100, Math.round((totals.cal / settings.calorieTarget) * 100))
          const proPct = Math.min(100, Math.round((totals.pro / settings.proteinTarget) * 100))
          const isToday = iso === todayIso

          return (
            <div
              key={dayIdx}
              className={`rounded-xl border bg-bg-primary px-4 py-3 ${
                isToday ? 'border-border-subtle' : 'border-border-faint'
              }`}
            >
              {/* Day header */}
              <div className="mb-2.5 flex items-center justify-between">
                <p className={`text-sm font-medium ${isToday ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {formatDay(iso)}
                  {isToday && <span className="ml-1.5 text-xs font-normal text-text-secondary">Today</span>}
                </p>
                {totals.cal > 0 && (
                  <p className="text-xs text-text-secondary">
                    {totals.cal} / {settings.calorieTarget} kcal
                  </p>
                )}
              </div>

              {/* Macro progress bars */}
              {totals.cal > 0 && (
                <div className="mb-3 flex flex-col gap-1">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-bg-secondary">
                    <div
                      className="h-full rounded-full bg-orange-400 transition-[width]"
                      style={{ width: `${calPct}%` }}
                    />
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-bg-secondary">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-[width]"
                      style={{ width: `${proPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-text-secondary">
                    <span>Calories {calPct}%</span>
                    <span>Protein {totals.pro}g / {settings.proteinTarget}g</span>
                  </div>
                </div>
              )}

              {/* Slots */}
              <div className="flex flex-col gap-2">
                {SLOTS.map(({ key, label }) => {
                  const meal = getMeal(dayIdx, key)
                  return (
                    <div key={key} className="flex items-center gap-2">
                      {meal ? (
                        <div className="flex flex-1 items-center gap-2 rounded-lg bg-bg-secondary px-2.5 py-1.5">
                          {meal.image && (
                            <Image
                              src={meal.image}
                              alt={meal.title}
                              width={40}
                              height={30}
                              className="h-7 w-10 rounded object-cover"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-xs font-medium text-text-primary">{meal.title}</p>
                            <p className="text-[10px] text-text-secondary">
                              {meal.calories} kcal · {meal.protein}g protein
                            </p>
                          </div>
                          <button
                            onClick={() => setDetailTarget({ id: meal.recipeId, title: meal.title, image: meal.image, portions: 1 })}
                            title="View recipe"
                            className="shrink-0 text-xs text-text-secondary hover:text-text-primary"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setSearchTarget({ day: dayIdx, slot: key })}
                            title="Replace"
                            className="shrink-0 text-xs text-text-secondary hover:text-text-primary"
                          >
                            Swap
                          </button>
                          <button
                            onClick={() => handleRemove(dayIdx, key)}
                            title="Remove"
                            className="shrink-0 text-xs text-text-secondary hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSearchTarget({ day: dayIdx, slot: key })}
                          className="flex flex-1 items-center gap-1 rounded-lg border border-dashed border-border-faint px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-subtle hover:text-text-primary"
                        >
                          + {label}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      </>
      )}

      {/* Recipe search modal */}
      {searchTarget && activeSearchSlot && (
        <RecipeSearch
          day={searchTarget.day}
          dayLabel={formatDay(addDays(weekStart, searchTarget.day))}
          slot={searchTarget.slot}
          slotLabel={activeSearchSlot.label}
          onSelect={handleSelect}
          onClose={() => setSearchTarget(null)}
        />
      )}

      {/* Recipe detail modal (from planner card click) */}
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
