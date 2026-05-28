import { createClient, getAuthUser } from '@/lib/supabase/server'
import ReviewShell from '@/components/review/ReviewShell'
import type { TechniqueLog } from '@/lib/types'

export default async function ReviewPage() {
  const [user, supabase] = await Promise.all([getAuthUser(), createClient()])

  const [logsRes, sessionCountRes] = await Promise.all([
    supabase
      .from('technique_logs')
      .select('technique_key, notes, logged')
      .eq('user_id', user!.id)
      .eq('logged', true),
    supabase
      .from('sessions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user!.id),
  ])

  const logs: TechniqueLog[] = (logsRes.data ?? []).map(r => ({
    technique_key: r.technique_key,
    notes:         r.notes ?? '',
    logged:        true,
  }))

  const sessionCount = sessionCountRes.count ?? 0

  return <ReviewShell logs={logs} sessionCount={sessionCount} />
}
