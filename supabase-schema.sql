-- Run this in your Supabase SQL editor

create extension if not exists "uuid-ossp";

-- LISTINGS
create table listings (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  price numeric not null,
  currency text not null default 'ZAR',
  category text not null,
  badge text not null default 'new',
  pieces_total int not null default 1,
  pieces_sold int not null default 0,
  image_url text not null default '',
  seller_name text not null default '',
  medium text,
  year int,
  dimensions text,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ADS
create table ads (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  name text not null,
  subtitle text not null,
  position text not null default 'banner',
  link_url text not null default '#',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- APPLICATIONS
create table applications (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  email text not null,
  website text,
  category text not null,
  pieces_per_year text not null,
  pitch text not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- CONTACT MESSAGES
create table contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table listings enable row level security;
alter table ads enable row level security;
alter table applications enable row level security;
alter table contact_messages enable row level security;

-- Public can read active listings and ads
create policy "public read listings" on listings for select using (is_active = true);
create policy "public read ads" on ads for select using (is_active = true);

-- Public can insert applications and messages
create policy "public insert applications" on applications for insert with check (true);
create policy "public insert messages" on contact_messages for insert with check (true);

-- Seed sample listings
insert into listings (title, description, price, currency, category, badge, pieces_total, pieces_sold, seller_name, medium, year) values
('Meridian No. IV', 'Oil on linen, 180 × 140 cm. A study in orbital tension.', 240000, 'ZAR', 'art', 'rare', 7, 3, 'Lena Kahanov', 'Oil on linen', 2025),
('Ferrari 250 GTO', 'Chassis 3647 GT. One of 36 ever built. Full FIA documentation.', 620000000, 'ZAR', 'motor', 'unique', 1, 0, 'Private Vendor', null, 1962),
('Villa Oria, Lugano', 'Historic lakeside estate. 12 rooms, private jetty. Fully restored.', 28500000, 'CHF', 'property', 'rare', 1, 0, 'Estate Agency Luino', null, 1892),
('Imperial Fancy Yellow', '18.4 ct Fancy Vivid Yellow diamond. GIA certified, flawless clarity.', 48200000, 'ZAR', 'jewellery', 'rare', 3, 1, 'Hendriks & Co', null, null),
('Patek Philippe Ref. 1518', '1944. First perpetual calendar chronograph in series. Rose gold case.', 82000000, 'ZAR', 'watch', 'rare', 5, 2, 'Antiquorum', null, 1944),
('Ali vs Frazier I Program', '1971 Madison Square Garden. Signed by both fighters. PSA/DNA 9.', 1850000, 'ZAR', 'memorabilia', 'new', 1, 0, 'Heritage Auctions', null, 1971),
('1952 Topps Mantle PSA 8', 'Mickey Mantle rookie card. One of four graded 8 by PSA worldwide.', 55000000, 'ZAR', 'collectible', 'sold', 1, 1, 'PWCC Marketplace', null, 1952),
('Undercurrent III', 'Ravi Nair — ink, resin, gold leaf on board. 120 × 90 cm.', 310000, 'ZAR', 'art', 'rare', 2, 1, 'Ravi Nair', 'Mixed media', 2024);

-- Seed sample ads
insert into ads (label, name, subtitle, position, link_url, sort_order) values
('Motorcar', 'Rolls-Royce', 'Private Collection 2026', 'banner', '#', 1),
('Timepiece', 'Bovet 1822', 'Récital 26 Brainstorm', 'banner', '#', 2),
('Wine', 'Pétrus 1990', '12-bottle vertical', 'banner', '#', 3),
('Estate', 'Atlantis Royal', 'Dubai — Private residences', 'banner', '#', 4),
('Watch', 'Hublot Big Bang', 'Unico Sapphire — 500 pcs', 'sidebar', '#', 1),
('Motor', 'Aston Martin Valour', '110 units worldwide', 'sidebar', '#', 2),
('Auction', 'Christie''s', 'Hong Kong Sale Sept 2026', 'sidebar', '#', 3);
