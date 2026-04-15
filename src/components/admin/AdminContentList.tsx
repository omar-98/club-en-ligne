import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';
import { Trash2, Edit2, Plus, Eye } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  description: string;
  content_type: 'actualite' | 'event' | 'media';
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface ContentFormData {
  title: string;
  description: string;
  content_type: 'actualite' | 'event' | 'media';
  image_url: string;
  published: boolean;
}

export function AdminContentList() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    description: '',
    content_type: 'actualite',
    image_url: '',
    published: false,
  });

  useEffect(() => {
    fetchContents();
  }, []);

  async function fetchContents() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents((data as Content[]) || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Erreur lors du chargement des contenus');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.title.trim()) {
      toast.error('Le titre est requis');
      return;
    }

    try {
      if (editingContent) {
        // Mise à jour
        const { error } = await supabase
          .from('contents')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingContent.id);

        if (error) throw error;
        toast.success('Contenu mis à jour');
      } else {
        // Création
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { error } = await supabase.from('contents').insert([
          {
            ...formData,
            created_by: user?.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
        toast.success('Contenu créé');
      }

      resetForm();
      fetchContents();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) return;

    try {
      const { error } = await supabase.from('contents').delete().eq('id', id);

      if (error) throw error;

      toast.success('Contenu supprimé');
      fetchContents();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Erreur lors de la suppression');
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      content_type: 'actualite',
      image_url: '',
      published: false,
    });
    setEditingContent(null);
    setOpen(false);
  }

  function handleEdit(content: Content) {
    setEditingContent(content);
    setFormData({
      title: content.title,
      description: content.description,
      content_type: content.content_type,
      image_url: content.image_url || '',
      published: content.published,
    });
    setOpen(true);
  }

  if (loading) {
    return <div className="flex items-center justify-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des contenus</h2>
        <Dialog open={open} onOpenChange={(value) => {
          setOpen(value);
          if (!value) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un contenu
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? 'Modifier le contenu' : 'Ajouter un contenu'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Titre"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={5}
              />

              {/* Upload d'image */}
              <ImageUpload
                onImageUploaded={(url) =>
                  setFormData({ ...formData, image_url: url })
                }
                initialImageUrl={formData.image_url}
              />

              <select
                value={formData.content_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content_type: e.target.value as 'actualite' | 'event' | 'media',
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="actualite">Actualité</option>
                <option value="event">Événement</option>
                <option value="media">Média</option>
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                />
                <span>Publié</span>
              </label>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  Sauvegarder
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Publié</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content) => (
            <TableRow key={content.id}>
              <TableCell>
                {content.image_url ? (
                  <img
                    src={content.image_url}
                    alt={content.title}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">-</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="max-w-xs truncate">{content.title}</TableCell>
              <TableCell>
                {content.content_type === 'actualite'
                  ? 'Actualité'
                  : content.content_type === 'event'
                    ? 'Événement'
                    : 'Média'}
              </TableCell>
              <TableCell>
                <span
                  className={
                    content.published
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-500'
                  }
                >
                  {content.published ? 'Oui' : 'Non'}
                </span>
              </TableCell>
              <TableCell>
                {new Date(content.created_at).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(content)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(content.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
