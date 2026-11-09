create table if not exists public.invitations (
  id uuid primary key,
  selected_activities text[] not null,
  selected_anime text,
  custom_suggestion text,
  mood text not null,
  selected_date date,
  date_preference text not null,
  created_at timestamptz not null default now(),
  constraint act_len check (cardinality(selected_activities) <= 8),
  constraint mood_ok check (mood in ('cuddle','adventure','lazy','relax','chaos','surprise')),
  constraint pref_ok check (date_preference in ('exact','saturday','sunday','later')),
  constraint anime_len check (char_length(selected_anime) <= 100),
  constraint custom_len check (char_length(custom_suggestion) <= 1000),
  constraint act_or_custom check (cardinality(selected_activities) > 0 or coalesce(char_length(trim(custom_suggestion)),0) > 0),
  constraint date_ok check ((date_preference = 'later' and selected_date is null) or (date_preference <> 'later' and selected_date >= current_date - 1))
);
create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.invitations enable row level security;
alter table public.admins enable row level security;
revoke all on public.invitations, public.admins from anon, authenticated;
grant insert on public.invitations to anon, authenticated;
grant select on public.invitations to authenticated;
grant select on public.admins to authenticated;
create policy "public can create" on public.invitations for insert to anon, authenticated with check (true);
create policy "admin can read" on public.invitations for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));
create policy "self check" on public.admins for select to authenticated using (user_id = auth.uid());
-- После создания своего пользователя в Supabase Auth выполните ОДИН раз:
-- insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';
