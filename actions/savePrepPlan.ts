'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function savePrepEntry(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthenticated')

  const weekStart   = formData.get('weekStart')   as string
  const recipeId    = Number(formData.get('recipeId'))
  const recipeTitle = formData.get('recipeTitle') as string
  const recipeImage = formData.get('recipeImage') as string
  const portions    = Number(formData.get('portions'))

  const { error } = await supabase.from('meal_prep').upsert(
    { user_id: user.id, week_start: weekStart, recipe_id: recipeId, recipe_title: recipeTitle, recipe_image: recipeImage, portions },
    { onConflict: 'user_id,week_start,recipe_id' },
  )
  if (error) throw new Error(error.message)
  revalidatePath('/diet')
}

export async function togglePrepped(
  weekStart: string,
  recipeId: number,
  prepped: boolean,
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthenticated')

  const { error } = await supabase
    .from('meal_prep')
    .update({ prepped })
    .eq('user_id', user.id)
    .eq('week_start', weekStart)
    .eq('recipe_id', recipeId)
  if (error) throw new Error(error.message)
  revalidatePath('/diet')
}
