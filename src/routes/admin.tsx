import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { AdminLoginPage } from '@/components/admin/AdminLoginPage';
import { isUserAdmin } from '@/integrations/supabase/admin-check';

function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const admin = await isUserAdmin(user.id);
        setIsAdmin(admin);
      } catch (error) {
        console.error('Error checking admin:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session?.user) {
        setIsAdmin(false);
        return;
      }

      try {
        const admin = await isUserAdmin(session.user.id);
        setIsAdmin(admin);
      } catch (error) {
        console.error('Error checking admin:', error);
        setIsAdmin(false);
      }
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Vérification des accès...
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLoginPage />;
  }

  return (
    <>
      <AdminNavigation />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});
