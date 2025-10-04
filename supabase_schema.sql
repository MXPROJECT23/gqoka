-- Auth profiles
create table if not exists profiles (
  id uuid primary key default auth.uid(),
  username text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Garments
create table if not exists garments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  brand text,
  color text,
  size text,
  category text,
  notes text,
  created_at timestamptz default now()
);

-- Photos
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  garment_id uuid not null references garments(id) on delete cascade,
  url text not null,
  created_at timestamptz default now()
);

-- Consents (cookies / privacy)
create table if not exists consents (
  user_id uuid primary key,
  marketing boolean default false,
  analytics boolean default true,
  updated_at timestamptz default now()
);

-- Storage buckets
select storage.create_bucket('garments', public := true);
select storage.create_bucket('avatars',  public := true);

-- RLS
alter table profiles enable row level security;
alter table garments enable row level security;
alter table photos enable row level security;
alter table consents enable row level security;

create policy "profiles owner read" on profiles for select using (auth.uid() = id);
create policy "profiles owner upsert" on profiles
  for insert with check (auth.uid() = id);
create policy "profiles owner update" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "garments owner read" on garments for select using (auth.uid() = user_id);
create policy "garments owner write" on garments for insert with check (auth.uid() = user_id);
create policy "garments owner update" on garments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "garments owner delete" on garments for delete using (auth.uid() = user_id);

create policy "photos by owner read" on photos for select using (
  exists(select 1 from garments g where g.id = photos.garment_id and g.user_id = auth.uid())
);
create policy "photos by owner write" on photos for insert with check (
  exists(select 1 from garments g where g.id = photos.garment_id and g.user_id = auth.uid())
);
create policy "photos by owner update" on photos for update using (
  exists(select 1 from garments g where g.id = photos.garment_id and g.user_id = auth.uid())
) with check (
  exists(select 1 from garments g where g.id = photos.garment_id and g.user_id = auth.uid())
);
create policy "photos by owner delete" on photos for delete using (
  exists(select 1 from garments g where g.id = photos.garment_id and g.user_id = auth.uid())
);

create policy "consents owner read" on consents for select using (auth.uid() = user_id);
create policy "consents owner upsert" on consents
  for insert with check (auth.uid() = user_id);
create policy "consents owner update" on consents
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
