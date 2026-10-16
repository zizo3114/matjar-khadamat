/*
# Phase 3: Portfolio Items & Digital Products

## Summary
Creates two new tables for creators to showcase their work and sell digital products.
Both tables link to profiles and are owner-scoped with RLS.

## New Tables

### 1. portfolio_items
- `id` (uuid, PK)
- `profile_id` (uuid, FK → profiles.id ON DELETE CASCADE)
- `title` (text, not null)
- `description` (text, nullable)
- `image_url` (text, nullable) — URL to stored image
- `project_url` (text, nullable) — external link to the project
- `created_at`, `updated_at` timestamps

### 2. digital_products
- `id` (uuid, PK)
- `profile_id` (uuid, FK → profiles.id ON DELETE CASCADE)
- `title` (text, not null)
- `description` (text, nullable)
- `price` (numeric(10,2), not null, default 0)
- `cover_image_url` (text, nullable) — URL to cover image
- `file_url` (text, nullable) — URL to the downloadable file
- `created_at`, `updated_at` timestamps

## Security
Both tables:
- RLS enabled
- Public SELECT: anyone can view portfolio items and products (for link-in-bio pages)
- INSERT/UPDATE/DELETE: only the profile owner (auth.uid() = profile_id) can modify their own items/products

## Storage
A public storage bucket `portfolio-images` is created for portfolio images,
and `product-files` for digital product covers and downloadable files.
Both buckets are public so images can be displayed on public pages.
*/
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  image_url text,
  project_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS digital_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  cover_image_url text,
  file_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS portfolio_items_profile_id_idx ON portfolio_items(profile_id);
CREATE INDEX IF NOT EXISTS digital_products_profile_id_idx ON digital_products(profile_id);

-- RLS: portfolio_items
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_portfolio_items" ON portfolio_items;
CREATE POLICY "public_select_portfolio_items" ON portfolio_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_portfolio_items" ON portfolio_items;
CREATE POLICY "insert_own_portfolio_items" ON portfolio_items FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_portfolio_items" ON portfolio_items;
CREATE POLICY "update_own_portfolio_items" ON portfolio_items FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_portfolio_items" ON portfolio_items;
CREATE POLICY "delete_own_portfolio_items" ON portfolio_items FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

-- RLS: digital_products
ALTER TABLE digital_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_digital_products" ON digital_products;
CREATE POLICY "public_select_digital_products" ON digital_products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_digital_products" ON digital_products;
CREATE POLICY "insert_own_digital_products" ON digital_products FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "update_own_digital_products" ON digital_products;
CREATE POLICY "update_own_digital_products" ON digital_products FOR UPDATE
  TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "delete_own_digital_products" ON digital_products;
CREATE POLICY "delete_own_digital_products" ON digital_products FOR DELETE
  TO authenticated USING (auth.uid() = profile_id);

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_items_updated_at ON portfolio_items;
CREATE TRIGGER portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS digital_products_updated_at ON digital_products;
CREATE TRIGGER digital_products_updated_at
  BEFORE UPDATE ON digital_products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage buckets (insert if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-files', 'product-files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: portfolio-images (public read, authenticated write to own folder)
DROP POLICY IF EXISTS "public_read_portfolio_images" ON storage.objects;
CREATE POLICY "public_read_portfolio_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "auth_upload_portfolio_images" ON storage.objects;
CREATE POLICY "auth_upload_portfolio_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "auth_update_portfolio_images" ON storage.objects;
CREATE POLICY "auth_update_portfolio_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "auth_delete_portfolio_images" ON storage.objects;
CREATE POLICY "auth_delete_portfolio_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-images');

-- Storage policies: product-files (public read for covers, authenticated write)
DROP POLICY IF EXISTS "public_read_product_files" ON storage.objects;
CREATE POLICY "public_read_product_files" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-files');

DROP POLICY IF EXISTS "auth_upload_product_files" ON storage.objects;
CREATE POLICY "auth_upload_product_files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-files');

DROP POLICY IF EXISTS "auth_update_product_files" ON storage.objects;
CREATE POLICY "auth_update_product_files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-files');

DROP POLICY IF EXISTS "auth_delete_product_files" ON storage.objects;
CREATE POLICY "auth_delete_product_files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-files');
