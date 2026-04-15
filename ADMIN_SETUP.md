# 🔐 Espace Admin - Instructions d'Installation

## ✅ Étapes de configuration

### 1. **Exécuter les migrations SQL Supabase**

Va sur ton **dashboard Supabase** → **SQL Editor** et exécute le contenu du fichier :
```
supabase/migrations/admin_setup.sql
```

Cela va créer :
- Table `admin_users` (utilisateurs avec rôles)
- Table `contents` (actualités, événements, médias)
- Bucket de stockage `content-images` pour les images
- Politiques de sécurité (RLS)

### 2. **Configurer Supabase Storage**

**Important : à faire manuellement dans le dashboard Supabase**

1. Accédez à **Storage** → **Buckets**
2. Créez un nouveau bucket nommé **`content-images`**
3. Rendez-le **public** (Public bucket)
4. Allez dans **Policies** et activez :
   - `public_view_images` - lecture publique
   - `admins_upload_images` - upload pour admins
   - `admins_delete_images` - suppression pour admins

### 3. **Générer les types TypeScript**

Installe/mets à jour Supabase CLI :
```bash
npm install -g supabase
```

Puis synchronise les types :
```bash
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
```

Remplace `YOUR_PROJECT_ID` par ton ID Supabase (visible dans les paramètres du projet).

### 4. **Créer un utilisateur admin**

Pour créer le premier admin manuellement dans Supabase :

**Dans Auth → Users** :
- Crée un nouvel utilisateur avec email/password

**Dans la table `admin_users`** (SQL Editor) :
```sql
INSERT INTO admin_users (id, email, role)
VALUES (
  'USER_ID_FROM_AUTH',
  'admin@example.com',
  'admin'
);
```

### 5. **Routes disponibles**

**Admin :**
- `/admin` - Tableau de bord
- `/admin/login` - Connexion (auto-redirect si pas authentifié)
- `/admin/users` - Gestion des utilisateurs
- `/admin/contents` - Gestion des contenus (actualités, événements, médias) + **upload d'images**

**Public :**
- `/actualites` - Affichage des actualités et contenus publiés
- `/galerie` - Galerie avec filtres par type

---

## 🚀 Fonctionnalités

✅ **Authentification** - Connexion/Déconnexion admin  
✅ **Gestion utilisateurs** - CRUD complet avec rôles  
✅ **Gestion contenus** - Actualités, événements, médias  
✅ **Upload d'images** - Intégration Supabase Storage  
✅ **Preview d'images** - Avant/après upload  
✅ **Galerie publique** - Affichage avec filtres  
✅ **Tableau de bord** - Statistiques en temps réel  
✅ **Responsive** - Mobile-friendly  

---

## 🔒 Sécurité

- ✅ Vérification des rôles admin côté serveur + client
- ✅ Row Level Security (RLS) activé dans Supabase
- ✅ Protection des routes admin
- ✅ Déconnexion automatique si pas authentifié
- ✅ Upload d'images restreint aux admins
- ✅ Galerie publique : affichage des contenus publiés uniquement

---

## 📝 Schéma des tables

### `admin_users`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | ID utilisateur (lié à auth.users) |
| email | TEXT | Email unique |
| role | TEXT | 'admin' ou 'user' |
| created_at | TIMESTAMP | Date création |

### `contents`
| Colonne | Type | Description |
|---------|------|-------------|
| id | UUID | ID unique |
| title | TEXT | Titre du contenu |
| description | TEXT | Description courte |
| content_type | TEXT | 'actualite' \| 'event' \| 'media' |
| content | TEXT | Contenu full (optionnel) |
| image_url | TEXT | URL image uploadée (Supabase Storage) |
| published | BOOLEAN | Publié ou brouillon |
| created_by | UUID | Admin créateur |
| created_at | TIMESTAMP | Date création |

---

## 📸 Workflow Upload d'images

1. Admin accède à `/admin/contents`
2. Clique sur **"Ajouter un contenu"** ou **"Modifier"**
3. Remplit titre, description, sélectionne le type
4. **Upload l'image** (JPG, PNG, WebP, GIF • Max 5 MB)
5. Apperçu s'affiche automatiquement
6. Publie le contenu
7. **Le contenu apparaît** sur `/actualites` ou `/galerie` avec l'image

---

## 💡 Prochaines étapes possibles

1. **Ajouter un éditeur riche** - WYSIWYG pour le contenu
2. **Galerie d'images multiples** - Plusieurs images par contenu
3. **Permissions granulaires** - Rôles éditeur, modérateur, etc.
4. **Commentaires** - Laisser des commentaires sur les actualités
5. **Partage social** - Boutons Facebook, Twitter, etc.
6. **Audit logs** - Tracer toutes les modifications
7. **Export/Import** - Backup de contenus

---

## ⚠️ Troubleshooting

**Erreur : "Cannot read property 'admin_users'"**
→ Les tables SQL n'ont pas été créées. Exécute le fichier migration.

**Erreur : "Access denied" pour upload**
→ Vérifie les politiques RLS dans Supabase Storage. Assure-toi que le bucket 'content-images' est public.

**Erreur : "Storage bucket not found"**
→ Crée le bucket 'content-images' manuellement dans Supabase Dashboard → Storage → Buckets.

**Images ne s'affichent pas publiquement**
→ Rends le bucket 'content-images' public dans les paramètres.

**Routes 404**
→ Assure-toi que la structure des dossiers `src/routes/admin/` existe.

---

## 📋 Checklist finale

- [ ] Exécuter la migration SQL
- [ ] Créer le bucket Supabase Storage
- [ ] Générer les types TypeScript
- [ ] Créer un utilisateur admin
- [ ] Accéder à `/admin` et se connecter
- [ ] Tester l'upload d'une image
- [ ] Vérifier l'affichage sur `/actualites` et `/galerie`
- [ ] Inviter d'autres admins et éditeurs

---

Besoin d'aide ? Contacte l'administrateur ! 🚀
