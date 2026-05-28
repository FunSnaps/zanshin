import { createClient, getAuthUser } from '@/lib/supabase/server'
import DietShell from '@/components/diet/DietShell'
import type { PlannedMeal, UserSettings, PrepEntry } from '@/lib/types'

/** Returns the ISO date of Monday in the current week (local-ish, server-side) */
function thisMonday(): string {
  const d   = new Date()
  const day = d.getUTCDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setUTCDate(d.getUTCDate() + diff)
  return d.toISOString().split('T')[0]
}

export default async function DietPage() {
  const [user, supabase] = await Promise.all([getAuthUser(), createClient()])

  const weekStart = thisMonday()

  // Fetch this week's meal plan + the last 4 weeks so the client can paginate without
  // re-fetching — just grab everything, it's a small personal dataset
  const [mealsRes, settingsRes, prepRes] = await Promise.all([
    supabase
      .from('meal_plan')
      .select('id, week_start, day, slot, recipe_id, recipe_title, recipe_image, calories, protein')
      .eq('user_id', user!.id)
      .gte('week_start', new Date(Date.now() - 56 * 86400000).toISOString().split('T')[0]),
    supabase
      .from('user_settings')
      .select('calorie_target, protein_target')
      .eq('user_id', user!.id)
      .maybeSingle(),
    supabase
      .from('meal_prep')
      .select('id, week_start, recipe_id, recipe_title, recipe_image, portions, prepped')
      .eq('user_id', user!.id)
      .gte('week_start', new Date(Date.now() - 56 * 86400000).toISOString().split('T')[0]),
  ])

  const meals: PlannedMeal[] = (mealsRes.data ?? []).map(r => ({
    id:        r.id,
    weekStart: r.week_start,
    day:       r.day,
    slot:      r.slot,
    recipeId:  r.recipe_id,
    title:     r.recipe_title,
    image:     r.recipe_image,
    calories:  r.calories,
    protein:   r.protein,
  }))

  const settings: UserSettings = {
    calorieTarget: settingsRes.data?.calorie_target ?? 2500,
    proteinTarget: settingsRes.data?.protein_target ?? 150,
  }

  const prepEntries: PrepEntry[] = (prepRes.data ?? []).map(r => ({
    id:          r.id,
    weekStart:   r.week_start,
    recipeId:    r.recipe_id,
    recipeTitle: r.recipe_title,
    recipeImage: r.recipe_image,
    portions:    r.portions,
    prepped:     r.prepped,
  }))

  return (
    <DietShell
      initialMeals={meals}
      initialSettings={settings}
      initialWeekStart={weekStart}
      initialPrepEntries={prepEntries}
    />
  )
}
