-- Run this in Supabase SQL Editor to set up the reconciliation demo.

create table if not exists employees (
  id bigint generated always as identity primary key,
  name text not null,
  username text not null unique,
  password text not null,
  role text not null check (role in ('admin', 'employee')),
  commission_rate numeric(5, 4) not null default 0.5
);

create table if not exists records (
  id bigint generated always as identity primary key,
  employee_id bigint not null references employees(id) on delete cascade,
  date timestamptz not null,
  service text not null check (service in ('Massage', 'Cupping', 'Acupuncture')),
  payment text not null check (payment in ('Cash', 'Check', 'Card')),
  amount numeric(10, 2) not null default 0,
  tip numeric(10, 2) not null default 0
);

create table if not exists settlements (
  id bigint generated always as identity primary key,
  settlement_date date not null unique,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists records_date_idx on records (date);
create index if not exists records_employee_id_idx on records (employee_id);

-- New Supabase projects enable RLS by default; use permissive demo policies.
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
