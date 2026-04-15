import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BarChart3 } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContents: 0,
    publishedContents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);

      const { count: usersCount } = await supabase
        .from('admin_users')
        .select('*', { count: 'exact' });

      const { count: contentsCount } = await supabase
        .from('contents')
        .select('*', { count: 'exact' });

      const { count: publishedCount } = await supabase
        .from('contents')
        .select('*', { count: 'exact' })
        .eq('published', true);

      setStats({
        totalUsers: usersCount || 0,
        totalContents: contentsCount || 0,
        publishedContents: publishedCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Contenus',
      value: stats.totalContents,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Publiés',
      value: stats.publishedContents,
      icon: BarChart3,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue sur l'espace d'administration</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          Chargement des statistiques...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.color} rounded-full p-2`}>
                    <Icon className="text-white h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
