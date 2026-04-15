import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Content {
  id: string;
  title: string;
  description: string;
  content_type: 'actualite' | 'event' | 'media';
  image_url?: string;
  published: boolean;
  created_at: string;
}

export function PublicGallery() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'actualite' | 'event' | 'media'>('all');

  useEffect(() => {
    fetchContents();
  }, [filter]);

  async function fetchContents() {
    try {
      setLoading(true);
      let query = supabase
        .from('contents')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('content_type', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContents((data as Content[]) || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  }

  const typeLabel = {
    actualite: 'Actualité',
    event: 'Événement',
    media: 'Média',
  };

  const typeColor = {
    actualite: 'bg-blue-100 text-blue-800',
    event: 'bg-purple-100 text-purple-800',
    media: 'bg-green-100 text-green-800',
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter('actualite')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'actualite'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Actualités
        </button>
        <button
          onClick={() => setFilter('event')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'event'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Événements
        </button>
        <button
          onClick={() => setFilter('media')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'media'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Médias
        </button>
      </div>

      {/* Galerie */}
      {contents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Aucun contenu disponible
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <Card key={content.id} className="hover:shadow-lg transition-shadow">
              {/* Image */}
              {content.image_url && (
                <div className="w-full h-48 overflow-hidden bg-gray-100 rounded-t-lg">
                  <img
                    src={content.image_url}
                    alt={content.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <CardTitle className="line-clamp-2">
                      {content.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(content.created_at).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </div>
                  <Badge className={typeColor[content.content_type]}>
                    {typeLabel[content.content_type]}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 line-clamp-3">
                  {content.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
