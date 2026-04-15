import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { LogOut, Home, Users, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function AdminNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  const navItems = [
    { path: '/admin', label: 'Tableau de bord', icon: Home },
    { path: '/admin/users', label: 'Utilisateurs', icon: Users },
    { path: '/admin/contents', label: 'Contenus', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold">
            FCAZ Admin
          </Link>
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600'
                      : 'hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">
            FCAZ Admin
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <div className="mt-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors w-full ${
                    isActive(item.path)
                      ? 'bg-blue-600'
                      : 'hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        )}
      </nav>
    </>
  );
}
