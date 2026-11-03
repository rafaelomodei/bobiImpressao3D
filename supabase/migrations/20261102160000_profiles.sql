-- bobi. — perfis de jogador (incremento A)
-- DD014: apelido + avatar; nome e foto do Google não são copiados.
-- DD015: data de nascimento declarada no onboarding; não exibida a terceiros.

create table public.profiles (
  user_id      uuid primary key references auth.users (id) on delete cascade,
  nickname     text not null,
  avatar_id    text not null,
  birth_date   date not null,
  ranking_opt_in boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint profiles_nickname_format check (nickname ~ '^[A-Za-z0-9_]{3,20}$'),
  constraint profiles_avatar_format   check (avatar_id ~ '^[a-z0-9-]{1,40}$'),
  constraint profiles_birth_date_range check (
    birth_date >= date '1900-01-01' and birth_date <= current_date
  )
);

-- Apelido único sem diferenciar maiúsculas/minúsculas.
create unique index profiles_nickname_unique on public.profiles (lower(nickname));

alter table public.profiles enable row level security;

-- Cada jogador só lê e grava o próprio perfil. Ranking/cartões públicos
-- usarão uma view própria, sem birth_date (PD008, DD015).
create policy "perfil: ler o próprio"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "perfil: criar o próprio"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "perfil: atualizar o próprio"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
