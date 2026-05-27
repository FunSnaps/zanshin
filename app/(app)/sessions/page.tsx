import { createClient } from '@/lib/supabase/server'
import SessionsShell from '@/components/sessions/SessionsShell'
import type { TrainingSession } from '@/lib/types'

export default async function SessionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('sessions')
    .select('id, date, disc, techs, notes')
    .eq('user_id', user!.id)
    .order('date', { ascending: false })

  const sessions: TrainingSession[] = (data ?? []).map(r => ({
    id:    r.id,
    date:  r.date,
    disc:  r.disc,
    techs: r.techs ?? [],
    notes: r.notes ?? '',
  }))

  return <SessionsShell initialSessions={sessions} />
}
