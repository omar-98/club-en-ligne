import { supabase } from './client';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

// Vérifier si l'utilisateur est admin
export async function isUserAdmin(userId?: string): Promise<boolean> {
  try {
    if (!userId) {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return false;
      userId = data.user.id;
    }

    // Récupérer l'info utilisateur depuis la table profiles ou users
    // À adapter selon votre structure Supabase
    const { data } = await supabase
      .from('admin_users')
      .select('id, role')
      .eq('id', userId)
      .single();

    return data?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Récupérer les info utilisateur courant
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return null;

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (adminData) {
      return adminData as AdminUser;
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
