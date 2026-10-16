/*
# Creator Support Platform — Phase 1: Auth & Profile Schema

## Summary
Sets up the core user-facing schema for a Ko-fi-style creator support platform.

## Changes

### 1. Extended User Profiles Table
A `profiles` table stores public-facing user data linked 1:1 to Supabase's built-in auth.users.
- `id` (uuid, PK, matches auth.users.id)
- `username` (text, unique, not null) — public handle
- `role` (text, default 'supporter') — 'creator' or 'supporter'
- `bio` (text, nullable) — short self-description
- `avatar_url` (text, nullable) — profile picture URL
- `social_links` (jsonb, nullable) — flexible map of platform → URL
- `created_at`, `updated_at` timestamps

### 2. Security
- RLS enabled on `profiles`
- Public SELECT: anyone (anon + authenticated) can view profiles
- INSERT: authenticated users can only insert their own profile (id = auth.uid())
- UPDATE: authenticated users can only update their own profile
- DELETE: authenticated users can only delete their own profile

### 3. Auto-create Profile Trigger
A trigger fires on new auth.users inserts to automatically create
a minimal profile row so every user always has one.

### Notes
- Role field uses a check constraint: only 'creator' or 'supporter' allowed.
- social_links is jsonb for flexibility (twitter, instagram, etc.).
- username auto-generated from email prefix on trigger creation; user updates it after.
*/

-- Profiles table (one per auth user)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'supporter' CHECK (role IN ('creator', 'supporter')),
  bio text,
  avatar_url text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast username lookups
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can view profiles (public platform)
DROP POLICY IF EXISTS "public_select_profiles" ON profiles;
CREATE POLICY "public_select_profiles" ON profiles FOR SELECT
  TO anon, authenticated USING (true);

-- Users can only insert their own profile
DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- Users can only update their own profile
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Users can only delete their own profile
DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Auto-create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  base_username text;
  final_username text;
  suffix int := 0;
BEGIN
  -- Generate base username from email prefix
  base_username := split_part(NEW.email, '@', 1);
  -- Remove non-alphanumeric chars
  base_username := regexp_replace(base_username, '[^a-zA-Z0-9_]', '', 'g');
  -- Ensure minimum length
  IF length(base_username) < 3 THEN
    base_username := base_username || 'user';
  END IF;
  final_username := base_username;

  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    suffix := suffix + 1;
    final_username := base_username || suffix::text;
  END LOOP;

  -- Get role from metadata if provided, default to 'supporter'
  INSERT INTO public.profiles (id, username, role)
  VALUES (
    NEW.id,
    final_username,
    COALESCE(NEW.raw_user_meta_data->>'role', 'supporter')
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at auto-update function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
