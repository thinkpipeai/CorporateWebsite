-- Run this in Supabase SQL Editor if login shows "Invalid username or password"
-- but admin/admin should work. Usually caused by Row Level Security (RLS) blocking anon access.

alter table employees enable row level security;
alter table records enable row level security;
alter table settlements enable row level security;

drop policy if exists "demo_allow_all" on employees;
drop policy if exists "demo_allow_all" on records;
drop policy if exists "demo_allow_all" on settlements;

create policy "demo_allow_all" on employees
  for all to anon, authenticated
  using (true) with check (true);

create policy "demo_allow_all" on records
  for all to anon, authenticated
  using (true) with check (true);

create policy "demo_allow_all" on settlements
  for all to anon, authenticated
  using (true) with check (true);

insert into employees (name, username, password, role, commission_rate)
values ('Admin', 'admin', 'admin', 'admin', 1.0)
on conflict (username) do nothing;
