-- bobi. — painel administrativo de relatórios (DD026, RF039).
-- O papel administrativo do MVP é só de leitura: observar uso e aprendizagem.
-- Criação/edição de conteúdo continua no Git (DD001 §5, DD017).

-- ---------------------------------------------------------------------------
-- Quem pode abrir o painel /admin. Sem políticas: só o servidor (chave secreta) lê.
-- ---------------------------------------------------------------------------
create table public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- ---------------------------------------------------------------------------
-- Tempo de resposta: da atividade na tela (ou da nova tentativa) até "Verificar".
-- Medido no aparelho; limitado a 1 h para descartar abas esquecidas abertas.
-- ---------------------------------------------------------------------------
alter table public.activity_attempts
  add column duration_ms int check (duration_ms is null or duration_ms between 0 and 3600000);
create index activity_attempts_created on public.activity_attempts (created_at);

-- ---------------------------------------------------------------------------
-- Eventos de sessão: abertura de lição/avaliação, saída pelo botão (X) e saída do app
-- (fechou a aba, trocou de app, bloqueou a tela) no meio de uma atividade.
-- after_error = a última resposta antes da saída estava errada (retenção após erro).
-- ---------------------------------------------------------------------------
create table public.session_events (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  event       text not null check (event in ('activity_open', 'activity_exit', 'app_left')),
  context_id  text not null check (context_id ~ '^BOBI-M0\d-(L\d{2}|AV\d{2})$'),
  activity_id text check (activity_id is null or activity_id ~ '^(A|Q)\d{2}$'),
  after_error boolean not null default false,
  created_at  timestamptz not null default now()
);
create index session_events_created on public.session_events (created_at);
create index session_events_user on public.session_events (user_id, created_at);

alter table public.session_events enable row level security;
create policy "ler as próprias linhas" on public.session_events
  for select to authenticated using ((select auth.uid()) = user_id);
