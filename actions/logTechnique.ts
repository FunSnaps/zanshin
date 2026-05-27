'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logTechnique(key: string, notes: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('technique_logs').upsert(
    {
      user_id: user.id,
      technique_key: key,
      notes,
      logged: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,technique_key' },
  )

  if (error) throw new Error(error.message)

  revalidatePath('/library')
  revalidatePath('/review')
}
