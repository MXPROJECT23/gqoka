-- Extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "profiles self" on profiles for select using (auth.uid() = id);
create policy "profiles self ins" on profiles for insert with check (auth.uid() = id);
create policy "profiles self upd" on profiles for update using (auth.uid() = id);

-- Brands
create table if not exists brands (
  id bigserial primary key,
  name text unique not null
);
create index if not exists brands_name_trgm on brands using gin (name gin_trgm_ops);

-- Items
create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text,
  brand text,
  color text,
  size text,
  type text,
  photos jsonb default '[]',
  is_favorite boolean default false,
  is_public boolean default false,
  cert_hash text,
  cert_at timestamptz,
  created_at timestamptz default now()
);
alter table items enable row level security;
create index if not exists items_user_id_idx on items(user_id);

create policy "items by owner" on items for select using (user_id = auth.uid());
create policy "items ins by owner" on items for insert with check (user_id = auth.uid());
create policy "items upd by owner" on items for update using (user_id = auth.uid());
create policy "items del by owner" on items for delete using (user_id = auth.uid());

-- Seed brands
insert into brands(name) values
('Nike'),('Adidas'),('Zara'),('H&M'),('Uniqlo'),('Levi''s'),('Gucci'),('Prada'),('Balenciaga')
on conflict do nothing;
