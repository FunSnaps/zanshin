'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveSession(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const date  = formData.get('date') as string
  const disc  = formData.get('disc') as string
  const techs = (formData.get('techs') as string)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  const notes = formData.get('notes') as string

  if (!date || !disc) throw new Error('date and disc are required')

  const { error } = await supabase.from('sessions').insert({
    user_id: user.id,
    date,
    disc,
    techs,
    notes: notes ?? '',
  })

  if (error) throw new Error(error.message)

  revalidatePath('/sessions')
  revalidatePath('/review')
}
