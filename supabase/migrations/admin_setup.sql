-- Table pour les utilisateurs admins
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table pour les contenus (actualités, événements, médias)
CREATE TABLE IF NOT EXISTS contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('actualite', 'event', 'media')),
  content TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_contents_published ON contents(published);
CREATE INDEX IF NOT EXISTS idx_contents_type ON contents(content_type);
CREATE INDEX IF NOT EXISTS idx_contents_created_by ON contents(created_by);

-- RLS (Row Level Security) - À adapter selon tes besoins
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

-- Politique pour les admins
CREATE POLICY "admins_manage_users" ON admin_users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "users_view_own" ON admin_users
  FOR SELECT
  USING (id = auth.uid());

-- Politique pour les contenus
CREATE POLICY "public_view_published" ON contents
  FOR SELECT
  USING (published = true);

CREATE POLICY "admins_manage_all_contents" ON contents
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ===== SUPABASE STORAGE SETUP =====
-- À exécuter dans Supabase Dashboard :
-- 1. Créer un bucket 'content-images'
-- 2. Rendre public ou utiliser les RLS ci-dessous

-- Politique pour le bucket images
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_view_images"
ON storage.objects FOR SELECT USING (bucket_id = 'content-images');

CREATE POLICY "admins_upload_images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'content-images'
  AND auth.uid() IN (
    SELECT id FROM admin_users WHERE role = 'admin'
  )
);

CREATE POLICY "admins_delete_images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'content-images'
  AND auth.uid() IN (
    SELECT id FROM admin_users WHERE role = 'admin'
  )
);
