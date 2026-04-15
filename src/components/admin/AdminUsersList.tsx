import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Trash2, Edit2, Plus } from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export function AdminUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'user'>('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers((data as User[]) || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser() {
    if (!newEmail) {
      toast.error('Email requis');
      return;
    }

    try {
      // Créer l'utilisateur via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUpWithPassword({
        email: newEmail,
        password: Math.random().toString(36).slice(-12), // Mot de passe temporaire
      });

      if (authError) throw authError;

      // Ajouter à la table admin_users
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('admin_users')
          .insert([
            {
              id: authData.user.id,
              email: newEmail,
              role: newRole,
            },
          ]);

        if (dbError) throw dbError;

        toast.success('Utilisateur créé avec succès');
        setNewEmail('');
        setNewRole('user');
        setOpen(false);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Erreur lors de la création de l\'utilisateur');
    }
  }

  async function handleUpdateRole(userId: string, newRole: 'admin' | 'user') {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Rôle mis à jour');
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  }

  async function handleDeleteUser(userId: string) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      // Supprimer de la table admin_users
      const { error: dbError } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userId);

      if (dbError) throw dbError;

      // Supprimer de Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) console.warn('Warning deleting auth user:', authError);

      toast.success('Utilisateur supprimé');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erreur lors de la suppression');
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as 'admin' | 'user')}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
              <Button onClick={handleAddUser} className="w-full">
                Créer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Date création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleUpdateRole(user.id, e.target.value as 'admin' | 'user')
                  }
                  className="px-2 py-1 border rounded-md"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
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
