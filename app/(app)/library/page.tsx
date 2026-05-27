import { createClient } from '@/lib/supabase/server'
import LibraryShell from '@/components/library/LibraryShell'
import type { TechniqueLog } from '@/lib/types'

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('technique_logs')
    .select('technique_key, notes, logged')
    .eq('user_id', user!.id)

  const logs: TechniqueLog[] = (data ?? []).map(r => ({
    technique_key: r.technique_key,
    notes: r.notes ?? '',
    logged: r.logged ?? false,
  }))

  return <LibraryShell initialLogs={logs} />
}
