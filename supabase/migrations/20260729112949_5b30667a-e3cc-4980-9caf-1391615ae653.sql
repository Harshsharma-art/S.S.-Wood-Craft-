-- roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "own roles readable" on public.user_roles for select to authenticated using (auth.uid() = user_id);

-- products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  image_url text,
  category text not null default 'General',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "public read active products" on public.products for select to anon, authenticated using (is_active = true);
create policy "admins read all products" on public.products for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins write products" on public.products for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admins update products" on public.products for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete products" on public.products for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- gallery
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  category text not null default 'General',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.gallery to anon;
grant select, insert, update, delete on public.gallery to authenticated;
grant all on public.gallery to service_role;
alter table public.gallery enable row level security;
create policy "public read active gallery" on public.gallery for select to anon, authenticated using (is_active = true);
create policy "admins read all gallery" on public.gallery for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins write gallery" on public.gallery for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admins update gallery" on public.gallery for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create policy "admins delete gallery" on public.gallery for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- inquiries
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null default '',
  created_at timestamptz not null default now()
);
grant insert on public.inquiries to anon;
grant select, insert, delete on public.inquiries to authenticated;
grant all on public.inquiries to service_role;
alter table public.inquiries enable row level security;
create policy "anyone can submit inquiry" on public.inquiries for insert to anon, authenticated with check (true);
create policy "admins read inquiries" on public.inquiries for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins delete inquiries" on public.inquiries for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- seed products
insert into public.products (name, description, category, display_order) values
('Wooden Door Frames (चौखट)','Seasoned hardwood frames precision-cut for a lifetime of true alignment.','Doors & Frames',1),
('Wooden Doors','Solid and flush doors finished in rich walnut, teak and custom tones.','Doors & Frames',2),
('Wooden Windows','Weather-sealed timber windows crafted for light, air and elegance.','Windows',3),
('Ventilators','Compact wooden ventilators that keep interiors fresh and bright.','Windows',4),
('PVC Wall Panels','Waterproof, easy-clean decorative panels in marble and woodgrain finishes.','Panels',5),
('Modular Vanity','Moisture-resistant bathroom vanities with stone tops and brass hardware.','Modular',6),
('Wooden Interior','End-to-end timber interiors: ceilings, partitions, wall cladding.','Interiors',7),
('TV Units','Statement media walls blending veneer, storage and ambient lighting.','Interiors',8),
('Wardrobes','Sliding and hinged wardrobes engineered around your storage habits.','Modular',9),
('Modular Furniture','Factory-finished modular units assembled cleanly on site.','Modular',10),
('Custom Furniture','Beds, dining tables and one-off pieces built to your drawing.','Custom',11),
('Timber Supply','Graded, kiln-seasoned timber supplied by the piece or the truckload.','Timber',12);

-- seed gallery
insert into public.gallery (title, category, display_order) values
('Modular Kitchen, Moradabad','Kitchen',1),
('Master Bedroom Wardrobe','Bedroom',2),
('Marble-Top Vanity','Bathroom',3),
('Living Room TV Unit','Living',4),
('Carved Main Door','Doors',5),
('Wooden Partition Screen','Interiors',6);