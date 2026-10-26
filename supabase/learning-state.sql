-- Execute uma vez no SQL Editor do projeto Supabase, após ativar Clerk em
-- Authentication > Sign In / Providers > Third-Party Auth.
-- O ID do usuário Clerk é texto (sub do JWT), não UUID de auth.users.
begin;

create table public.learning_state (
  user_id text primary key,
  state jsonb not null check (jsonb_typeof(state) = 'object')
);

alter table public.learning_state enable row level security;
revoke all on table public.learning_state from anon, authenticated;
grant select, insert, update on table public.learning_state to authenticated;

create policy "read own learning state"
on public.learning_state for select to authenticated
using ((select auth.jwt()->>'sub') = user_id);

create policy "create own learning state"
on public.learning_state for insert to authenticated
with check ((select auth.jwt()->>'sub') = user_id);

create policy "update own learning state"
on public.learning_state for update to authenticated
using ((select auth.jwt()->>'sub') = user_id)
with check ((select auth.jwt()->>'sub') = user_id);

commit;
