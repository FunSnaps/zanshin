import { createClient, getAuthUser } from '@/lib/supabase/server'
import SessionsShell from '@/components/sessions/SessionsShell'
import type { TrainingSession } from '@/lib/types'

export default async function SessionsPage() {
  const [user, supabase] = await Promise.all([getAuthUser(), createClient()])

  const { data } = await supabase
    .from('sessions')
    .select('id, date, disc, techs, notes')
    .eq('user_id', user!.id)
    .order('date', { ascending: false })
    .limit(100)

  const sessions: TrainingSession[] = (data ?? []).map(r => ({
    id:    r.id,
    date:  r.date,
    disc:  r.disc,
    techs: r.techs ?? [],
    notes: r.notes ?? '',
  }))

  return <SessionsShell initialSessions={sessions} />
}
