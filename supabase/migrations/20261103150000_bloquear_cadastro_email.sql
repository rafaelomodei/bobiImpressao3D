-- bobi. — jogadores entram só com Google (DD011). O provedor de e-mail do Supabase Auth
-- continua ligado apenas para as contas internas (painel /admin, modo local e e2e),
-- então qualquer outro cadastro por e-mail é recusado aqui (DD026).
--
-- Por que um trigger e não a opção "desativar cadastros" do Supabase: aquela opção é
-- global e também impediria novos jogadores pelo Google.
--
-- Contas internas usam domínios que não recebem e-mail (bobi.local, bobi.test) e são
-- criadas pelo servidor/scripts com e-mail já confirmado (pnpm admin:create, local:up,
-- e2e:session). Um cadastro público nesses domínios nunca conseguiria ser confirmado.

create or replace function public.block_public_email_signup()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if coalesce(new.raw_app_meta_data ->> 'provider', '') = 'email'
     and lower(coalesce(new.email, '')) !~ '@bobi\.(local|test)$' then
    raise exception 'Cadastro por e-mail desativado: entre com a conta Google.'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;

revoke all on function public.block_public_email_signup() from public, anon, authenticated;

drop trigger if exists block_public_email_signup on auth.users;
create trigger block_public_email_signup
  before insert on auth.users
  for each row execute function public.block_public_email_signup();
