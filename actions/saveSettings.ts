'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function saveSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthenticated')

  const calorieTarget = Number(formData.get('calorieTarget'))
  const proteinTarget = Number(formData.get('proteinTarget'))

  const { error } = await supabase.from('user_settings').upsert(
    {
      user_id:        user.id,
      calorie_target: calorieTarget,
      protein_target: proteinTarget,
      updated_at:     new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )

  if (error) throw new Error(error.message)
  revalidatePath('/diet')
}
