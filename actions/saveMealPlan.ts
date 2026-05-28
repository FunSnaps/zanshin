'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { MealSlot } from '@/lib/types'

export async function saveMealPlan(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthenticated')

  const weekStart  = formData.get('weekStart')  as string
  const day        = Number(formData.get('day'))
  const slot       = formData.get('slot')       as MealSlot
  const recipeId   = Number(formData.get('recipeId'))
  const title      = formData.get('title')      as string
  const image      = formData.get('image')      as string
  const calories   = Number(formData.get('calories'))
  const protein    = Number(formData.get('protein'))

  const { error } = await supabase.from('meal_plan').upsert(
    {
      user_id: user.id,
      week_start: weekStart,
      day,
      slot,
      recipe_id: recipeId,
      recipe_title: title,
      recipe_image: image,
      calories,
      protein,
    },
    { onConflict: 'user_id,week_start,day,slot' },
  )

  if (error) throw new Error(error.message)
  revalidatePath('/diet')
}

export async function removeMealPlan(
  weekStart: string,
  day: number,
  slot: MealSlot,
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthenticated')

  const { error } = await supabase
    .from('meal_plan')
    .delete()
    .eq('user_id', user.id)
    .eq('week_start', weekStart)
    .eq('day', day)
    .eq('slot', slot)

  if (error) throw new Error(error.message)
  revalidatePath('/diet')
}
