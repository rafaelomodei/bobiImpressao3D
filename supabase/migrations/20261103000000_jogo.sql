-- bobi. — motor de lições, carteira, avaliações, oficina e ranking (incrementos B, D e C).
-- Escrita: somente pelo servidor (chave secreta), depois de validar a sessão (PD001, DD001).
-- Leitura pelo cliente autenticado: somente as próprias linhas (RLS).

-- ---------------------------------------------------------------------------
-- Progresso das lições
-- ---------------------------------------------------------------------------
create table public.lesson_progress (
  user_id            uuid not null references auth.users (id) on delete cascade,
  lesson_id          text not null,
  content_version    text not null,
  -- Próxima atividade pendente (0 = abertura). Retomada pelo servidor (PD003).
  current_step       int  not null default 0 check (current_step >= 0),
  status             text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  -- Repetição em curso de uma lição já concluída (revisão, RF014).
  is_review          boolean not null default false,
  first_completed_at timestamptz,
  last_completed_at  timestamptz,
  completions        int not null default 0,
  updated_at         timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.activity_attempts (
  id              bigint generated always as identity primary key,
  user_id         uuid not null references auth.users (id) on delete cascade,
  -- Lição (BOBI-M01-L01) ou avaliação (BOBI-M01-AV01).
  context_id      text not null,
  activity_id     text not null,
  content_version text not null,
  attempt_no      int  not null check (attempt_no >= 1),
  is_correct      boolean not null,
  hint_used       boolean not null default false,
  is_review       boolean not null default false,
  answer          jsonb not null,
  created_at      timestamptz not null default now()
);
create index activity_attempts_user_ctx on public.activity_attempts (user_id, context_id, activity_id);

-- ---------------------------------------------------------------------------
-- Carteira: XP e Fios auditáveis e idempotentes (RNF013, RNF019, RF046)
-- ---------------------------------------------------------------------------
create table public.wallet_ledger (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users (id) on delete cascade,
  -- Chave idempotente, ex.: lesson:BOBI-M01-L01:first, review:BOBI-M01-L01:2026-11-03.
  event_key      text not null,
  xp             int  not null default 0,
  fios           int  not null default 0,
  -- XP que conta no ranking semanal (PD008).
  competitive_xp int  not null default 0,
  reason         text not null,
  day            date not null default (now() at time zone 'America/Sao_Paulo')::date,
  created_at     timestamptz not null default now(),
  unique (user_id, event_key)
);
create index wallet_ledger_user_day on public.wallet_ledger (user_id, day);

-- Meta diária e sequência (RF026, RF027, DD005).
create table public.daily_activity (
  user_id   uuid not null references auth.users (id) on delete cascade,
  day       date not null,
  lessons   int  not null default 0,
  goal_met  boolean not null default false,
  primary key (user_id, day)
);

-- ---------------------------------------------------------------------------
-- Avaliações de domínio (PD003: 5 questões, aprovação com 4)
-- ---------------------------------------------------------------------------
create table public.assessment_attempts (
  id              bigint generated always as identity primary key,
  user_id         uuid not null references auth.users (id) on delete cascade,
  assessment_id   text not null,
  content_version text not null,
  -- { "Q01": { "answer": ..., "correct": true }, ... }
  answers         jsonb not null default '{}'::jsonb,
  status          text not null default 'in_progress' check (status in ('in_progress', 'finished')),
  score           int,
  passed          boolean,
  started_at      timestamptz not null default now(),
  finished_at     timestamptz
);
create unique index assessment_attempts_one_open
  on public.assessment_attempts (user_id, assessment_id) where status = 'in_progress';

-- ---------------------------------------------------------------------------
-- Uma atividade educacional ativa por conta (PD001, DD008, RF043)
-- ---------------------------------------------------------------------------
create table public.activity_leases (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  device_id  text not null,
  context_id text not null,
  expires_at timestamptz not null,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Oficina (PD007 — valores de teste, DD021)
-- ---------------------------------------------------------------------------
create table public.player_workshop (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  machine_id    text not null default 'bobi-mini',
  upgrades      text[] not null default '{}',
  -- Último nivelamento bem-sucedido no minijogo (null = precisa nivelar).
  leveled_at    timestamptz,
  level_attempts int not null default 0,
  updated_at    timestamptz not null default now()
);

create table public.inventory_entries (
  user_id  uuid not null references auth.users (id) on delete cascade,
  item_id  text not null,
  quantity int  not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create table public.virtual_prints (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  item_id      text not null,
  machine_id   text not null,
  started_at   timestamptz not null default now(),
  ready_at     timestamptz not null,
  state        text not null default 'printing' check (state in ('printing', 'collected', 'cancelled')),
  collected_at timestamptz,
  check (ready_at > started_at)
);
-- Uma fabricação ativa por conta (PD005).
create unique index virtual_prints_one_active on public.virtual_prints (user_id) where state = 'printing';

-- ---------------------------------------------------------------------------
-- RLS: leitura somente das próprias linhas; nenhuma escrita pelo cliente.
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'lesson_progress', 'activity_attempts', 'wallet_ledger', 'daily_activity',
    'assessment_attempts', 'activity_leases', 'player_workshop', 'inventory_entries', 'virtual_prints'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format(
      'create policy "ler as próprias linhas" on public.%I for select to authenticated using ((select auth.uid()) = user_id)',
      t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Ranking semanal global (PD008, DD015): só adultos com opt-in; sem data de nascimento.
-- ---------------------------------------------------------------------------
create or replace function public.weekly_ranking(week_start date, max_rows int default 50)
returns table (pos bigint, nickname text, avatar_id text, xp bigint)
language sql
stable
security definer
set search_path = ''
as $$
  with eligible as (
    select p.user_id, p.nickname, p.avatar_id
    from public.profiles p
    where p.ranking_opt_in
      and p.birth_date <= ((now() at time zone 'America/Sao_Paulo')::date - interval '18 years')
  ),
  scores as (
    select e.nickname, e.avatar_id, sum(w.competitive_xp)::bigint as xp
    from eligible e
    join public.wallet_ledger w on w.user_id = e.user_id
    where w.day >= week_start and w.day < week_start + 7
    group by e.nickname, e.avatar_id
    having sum(w.competitive_xp) > 0
  )
  -- Empate: mesma posição (rank), sem desempate por volume de uso (PD007 §6).
  select rank() over (order by xp desc) as pos, nickname, avatar_id, xp
  from scores
  order by xp desc, lower(nickname)
  limit greatest(1, least(max_rows, 100));
$$;

revoke all on function public.weekly_ranking(date, int) from public, anon;
grant execute on function public.weekly_ranking(date, int) to authenticated;
