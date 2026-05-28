import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/supabase/server'
import Header from '@/components/shell/Header'
import NavTabs from '@/components/shell/NavTabs'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser()

  if (!user) redirect('/login')

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-4">
      <Header email={user.email ?? ''} />
      <NavTabs />
      {children}
    </div>
  )
}
