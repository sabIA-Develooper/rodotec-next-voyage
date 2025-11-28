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
    <div className="min-h-screen" style={{ backgroundColor: '#020617' }}>
      {/* Top Bar */}
      <header className="text-white border-b h-14 fixed top-0 left-0 right-0 z-50" style={{
        backgroundColor: '#0B1220',
        borderColor: 'rgba(255, 255, 255, 0.05)'
      }}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-[#0D1528]"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <Link to="/admin" className="font-bold text-lg tracking-tight">
              RODOTEC <span className="text-gray-400 font-normal">– Admin</span>
            </Link>

            <div className="relative ml-4 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar..."
                className="pl-10 w-64 h-9 border text-white placeholder:text-gray-400 focus:border-[#3B4BA8]"
                style={{
                  backgroundColor: '#0D1528',
                  borderColor: 'rgba(255, 255, 255, 0.05)'
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExport}
              className="text-white hover:bg-[#0D1528] hidden sm:flex"
            >
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden md:inline">Exportar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleImport}
              className="text-white hover:bg-[#0D1528] hidden sm:flex"
            >
              <Upload className="h-4 w-4 sm:mr-2" />
              <span className="hidden md:inline">Importar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-white hover:bg-[#0D1528] hidden md:flex"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              <span className="hidden lg:inline">Resetar</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full text-white hover:bg-[#0D1528]">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback style={{ backgroundColor: '#3B4BA8' }} className="text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">Minha conta</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                {/* Mobile-only actions */}
                <div className="sm:hidden">
                  <DropdownMenuItem onClick={handleExport} className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleImport} className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    <Upload className="mr-2 h-4 w-4" />
                    Importar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleReset} className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Resetar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                </div>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:bg-[#0D1528] focus:bg-[#0D1528] hover:text-red-300">
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
      <aside
        className={`fixed left-0 top-14 bottom-0 w-56 overflow-y-auto z-40 transform transition-transform duration-200 ease-in-out border-r ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{
          backgroundColor: '#0B1220',
          borderColor: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={active ? {
                  backgroundColor: '#3B4BA8',
                  boxShadow: '0 0 20px rgba(59, 75, 168, 0.3)'
                } : {}}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = '#0D1528';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-56 pt-14 min-h-screen" style={{ backgroundColor: '#020617' }}>
        <div className="p-8 md:p-12 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
