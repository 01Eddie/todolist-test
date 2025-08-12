create table if not exists todo (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status boolean not null default false,
  designated text not null,
  user_id uuid references auth.users(id) on delete cascade
);

-- Habilitar Row Level Security RLS
alter table todo disable row level security;
