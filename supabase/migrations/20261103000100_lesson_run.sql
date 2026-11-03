-- Início da rodada atual da lição (primeira vez ou revisão): numera tentativas por rodada.
alter table public.lesson_progress add column run_started_at timestamptz not null default now();
