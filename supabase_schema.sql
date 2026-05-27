-- ============================================================
-- Zanshin MMA Journal — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Technique logs (mark-as-logged + personal notes per technique)
create table if not exists technique_logs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  technique_key text not null,  -- e.g. "grappling|bjj|white|0"
  notes        text not null default '',
  logged       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, technique_key)
);

-- 2. Training sessions
create table if not exists sessions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  date       date not null,
  disc       text not null,
  techs      text[] not null default '{}',
  notes      text not null default '',
  created_at timestamptz not null default now()
);

-- 3. Auto-update updated_at for technique_logs
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists technique_logs_updated_at on technique_logs;
create trigger technique_logs_updated_at
  before update on technique_logs
  for each row execute function set_updated_at();

-- 4. Enable Row-Level Security
alter table technique_logs enable row level security;
alter table sessions enable row level security;

-- 5. RLS policies — users see only their own rows
create policy "Users manage own technique logs"
  on technique_logs for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own sessions"
  on sessions for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
