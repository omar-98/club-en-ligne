import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  initialImageUrl?: string;
  bucketName?: string;
}

export function ImageUpload({
  onImageUploaded,
  initialImageUrl,
  bucketName = 'content-images',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Format accepté : JPG, PNG, WebP, GIF');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Taille max : 5 MB');
      return;
    }

    try {
      setUploading(true);

      // Créer un aperçu local
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload à Supabase Storage
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Obtenir l'URL publique
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      onImageUploaded(publicUrlData.publicUrl);
      toast.success('Image uploadée avec succès');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors de l\'upload');
      setImagePreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  function handleRemove() {
    setImagePreview(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Image</label>

      {/* Aperçu de l'image */}
      {imagePreview && (
        <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={imagePreview}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Zone d'upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="text-center cursor-pointer hover:opacity-80"
        >
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin inline-block">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Upload en cours...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <ImageIcon className="h-8 w-8 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600">
                Cliquez pour ajouter une image
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, WebP, GIF • Max 5 MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bouton alternatif */}
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        {uploading ? 'Upload...' : 'Parcourir'}
      </Button>
    </div>
  );
}
