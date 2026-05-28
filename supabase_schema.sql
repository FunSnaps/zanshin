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

-- ============================================================
-- Diet / Meal Planner — run this block after the above
-- ============================================================

-- 6. Weekly meal plan slots
create table if not exists meal_plan (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  week_start   date not null,          -- Monday of the week (ISO date)
  day          int  not null           -- 0 = Mon … 6 = Sun
                    check (day between 0 and 6),
  slot         text not null
                    check (slot in ('meal1', 'meal2', 'snack')),
  recipe_id    int  not null,
  recipe_title text not null,
  recipe_image text not null default '',
  calories     int  not null default 0,
  protein      int  not null default 0,
  created_at   timestamptz not null default now(),
  unique (user_id, week_start, day, slot)
);

-- 7. Per-user calorie / protein targets
create table if not exists user_settings (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  calorie_target int not null default 2500,
  protein_target int not null default 150,
  updated_at     timestamptz not null default now()
);

-- 8. RLS for new tables
alter table meal_plan    enable row level security;
alter table user_settings enable row level security;

create policy "Users manage own meal plan"
  on meal_plan for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own settings"
  on user_settings for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
