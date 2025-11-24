import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { repository } from '@/data/repository';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Home,
  FileText,
  Settings,
  Package,
  LogOut,
  Search,
  FolderTree,
  Download,
  Upload,
  RotateCcw,
  Menu,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/admin' },
  { icon: FileText, label: 'Orçamentos', path: '/admin/orcamentos' },
  { icon: Package, label: 'Produtos', path: '/admin/produtos' },
  { icon: FolderTree, label: 'Categorias', path: '/admin/categorias' },
  { icon: Settings, label: 'Configurações', path: '/admin/configuracoes' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, signOut } = useAdminAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const getUserInitials = () => {
    if (!user?.email) return 'AD';
    return user.email.substring(0, 2).toUpperCase();
  };

  const handleExport = () => {
    const data = repository.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rodotec-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Dados exportados com sucesso!' });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const content = ev.target?.result as string;
          const success = repository.importData(content);
          if (success) {
            toast({ title: 'Dados importados com sucesso!' });
            window.location.reload();
          } else {
            toast({ title: 'Erro ao importar dados', variant: 'destructive' });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      repository.reset();
      toast({ title: 'Dados resetados com sucesso!' });
      window.location.reload();
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Bar */}
      <header className="bg-slate-800 text-slate-100 border-b border-slate-700 h-14 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-slate-100 hover:bg-slate-700"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <Link to="/admin" className="font-bold text-lg">
              RODOTEC <span className="text-slate-400 font-normal">– Admin</span>
            </Link>

            <div className="relative ml-4 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar..."
                className="pl-10 w-64 h-9 bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:bg-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="sm" onClick={handleExport} className="text-slate-100 hover:bg-slate-700 hidden sm:flex">
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden md:inline">Exportar</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleImport} className="text-slate-100 hover:bg-slate-700 hidden sm:flex">
              <Upload className="h-4 w-4 sm:mr-2" />
              <span className="hidden md:inline">Importar</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-slate-100 hover:bg-slate-700 hidden md:flex">
              <RotateCcw className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Resetar</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full text-slate-100 hover:bg-slate-700">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-slate-600 text-slate-100">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Minha conta</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Mobile-only actions */}
                <div className="sm:hidden">
                  <DropdownMenuItem onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleImport}>
                    <Upload className="mr-2 h-4 w-4" />
                    Importar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleReset}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Resetar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 w-56 bg-slate-800 overflow-y-auto z-40 transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-56 pt-14 min-h-screen bg-slate-100">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
