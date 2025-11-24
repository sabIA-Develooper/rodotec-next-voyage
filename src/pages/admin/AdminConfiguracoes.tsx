import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { localDataLayer } from '@/data/localDataLayer';
import { Settings } from '@/data/localDataLayer';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import api from '@/services/api';
import { Plus, Key } from 'lucide-react';
import type { AdminUser } from '@/types/api';

const AdminConfiguracoes: React.FC = () => {
  const { user, role } = useAdminAuth();
  const isAdmin = role === 'admin';

  const [settings, setSettings] = useState<Settings>({
    empresa: {
      nome: '',
      cnpj: '',
      endereco: '',
      telefone: '',
      email: ''
    },
    aparencia: {
      corPrimaria: '#0D47A1',
      corFundo: '#FFFFFF',
      logoUrl: null,
      faviconUrl: null
    },
    notificacoes: {
      avisarNovosOrcamentos: true
    },
    usuarios: []
  });

  const [activeTab, setActiveTab] = useState('empresa');

  // Estado para lista de usuários
  const [usuarios, setUsuarios] = useState<AdminUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Estado para modal de criar usuário
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    role: 'user' as 'admin' | 'user'
  });

  // Estado para modal de resetar senha
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const savedSettings = localDataLayer.getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  // Carregar usuários do backend
  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await api.auth.listUsers();
      setUsuarios(users);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      // Silently fail - users list will be empty
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleEmpresaChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      empresa: {
        ...prev.empresa,
        [field]: value
      }
    }));
  };

  const handleAparenciaChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      aparencia: {
        ...prev.aparencia,
        [field]: value
      }
    }));
  };

  const handleNotificacaoChange = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notificacoes: {
        ...prev.notificacoes,
        [field]: value
      }
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleAparenciaChange('logoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleAparenciaChange('faviconUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    try {
      localDataLayer.updateSettings(settings);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    }
  };

  const openResetPasswordModal = (usuario: AdminUser) => {
    setResetPasswordUser(usuario);
    setNewPassword('');
    setIsResetPasswordOpen(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetPasswordUser) return;

    if (!newPassword || newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setResettingPassword(true);

    try {
      await api.auth.resetUserPassword(resetPasswordUser._id, newPassword);
      toast.success(`Senha de ${resetPasswordUser.nome} redefinida com sucesso!`);
      setIsResetPasswordOpen(false);
      setResetPasswordUser(null);
      setNewPassword('');
    } catch (error: any) {
      console.error('Erro ao redefinir senha:', error);
      toast.error(error?.message || 'Erro ao redefinir senha');
    } finally {
      setResettingPassword(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUser.nome.trim()) {
      toast.error('Informe o nome do usuário');
      return;
    }
    if (!newUser.email.trim()) {
      toast.error('Informe o e-mail do usuário');
      return;
    }
    if (!newUser.senha || newUser.senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (newUser.senha !== newUser.confirmarSenha) {
      toast.error('As senhas não conferem');
      return;
    }

    setCreatingUser(true);

    try {
      await api.auth.register({
        nome: newUser.nome,
        email: newUser.email,
        senha: newUser.senha,
        role: newUser.role
      });

      toast.success('Usuário criado com sucesso!');
      setIsCreateUserOpen(false);
      setNewUser({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        role: 'user'
      });
      // Recarregar lista de usuários
      loadUsers();
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      toast.error(error?.message || 'Erro ao criar usuário');
    } finally {
      setCreatingUser(false);
    }
  };

  const openCreateUserModal = () => {
    setNewUser({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      role: 'user'
    });
    setIsCreateUserOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Configurações</h1>
        <p className="text-slate-600">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription className="text-slate-600">Configure as informações básicas da empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da Empresa</Label>
                    <Input id="nome" value={settings.empresa.nome} onChange={(e) => handleEmpresaChange('nome', e.target.value)} placeholder="Nome da empresa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" value={settings.empresa.cnpj} onChange={(e) => handleEmpresaChange('cnpj', e.target.value)} placeholder="00.000.000/0000-00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" value={settings.empresa.endereco} onChange={(e) => handleEmpresaChange('endereco', e.target.value)} placeholder="Rua, número, bairro, cidade, estado" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                    <Input id="telefone" value={settings.empresa.telefone} onChange={(e) => handleEmpresaChange('telefone', e.target.value)} placeholder="(00) 00000-0000" />
                    {settings.empresa.telefone && (
                      <a className="text-sm text-blue-600 hover:underline" href={`https://wa.me/${settings.empresa.telefone.replace(/\D/g, '').startsWith('55') ? settings.empresa.telefone.replace(/\D/g, '') : '55' + settings.empresa.telefone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">Abrir chat no WhatsApp</a>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" value={settings.empresa.email} onChange={(e) => handleEmpresaChange('email', e.target.value)} placeholder="contato@empresa.com.br" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle>Aparência do Sistema</CardTitle>
                <CardDescription className="text-slate-600">Personalize as cores e logos do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="corPrimaria">Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input id="corPrimaria" type="color" value={settings.aparencia.corPrimaria} onChange={(e) => handleAparenciaChange('corPrimaria', e.target.value)} className="w-20" />
                      <Input value={settings.aparencia.corPrimaria} onChange={(e) => handleAparenciaChange('corPrimaria', e.target.value)} placeholder="#0D47A1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="corFundo">Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input id="corFundo" type="color" value={settings.aparencia.corFundo} onChange={(e) => handleAparenciaChange('corFundo', e.target.value)} className="w-20" />
                      <Input value={settings.aparencia.corFundo} onChange={(e) => handleAparenciaChange('corFundo', e.target.value)} placeholder="#FFFFFF" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logotipo</Label>
                  <Input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} />
                  {settings.aparencia.logoUrl && (<div className="mt-2"><img src={settings.aparencia.logoUrl} alt="Logo" className="h-16 w-auto" /></div>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <Input id="favicon" type="file" accept="image/*" onChange={handleFaviconUpload} />
                  {settings.aparencia.faviconUrl && (<div className="mt-2"><img src={settings.aparencia.faviconUrl} alt="Favicon" className="h-8 w-8" /></div>)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription className="text-slate-600">Gerencie como você recebe notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="avisarNovosOrcamentos">Avisar sobre novos orçamentos</Label>
                    <p className="text-sm text-gray-500">Receba notificações quando novos orçamentos forem solicitados</p>
                  </div>
                  <Switch id="avisarNovosOrcamentos" checked={settings.notificacoes.avisarNovosOrcamentos} onCheckedChange={(checked) => handleNotificacaoChange('avisarNovosOrcamentos', checked)} />
                </div>
              </CardContent>
            </Card>

        {isAdmin && (
          <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Usuários e Permissões</CardTitle>
                  <CardDescription className="text-slate-600">Gerencie os usuários do sistema</CardDescription>
                </div>
                <Button onClick={openCreateUserModal}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingUsers ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-slate-600">
                        Carregando usuários...
                      </TableCell>
                    </TableRow>
                  ) : usuarios.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-slate-600">
                        Nenhum usuário cadastrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    usuarios.map((usuario) => (
                      <TableRow key={usuario._id}>
                        <TableCell className="text-slate-900 font-medium">{usuario.nome}</TableCell>
                        <TableCell className="text-slate-700">{usuario.email}</TableCell>
                        <TableCell className="text-slate-700">{usuario.role === 'admin' ? 'Administrador' : 'Usuário'}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openResetPasswordModal(usuario)}
                          >
                            <Key className="h-4 w-4 mr-1" />
                            Redefinir Senha
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de criar usuário */}
      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Usuário</DialogTitle>
            <DialogDescription className="text-slate-600">
              Crie um novo usuário para acessar o painel administrativo
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newUserNome">Nome *</Label>
              <Input
                id="newUserNome"
                value={newUser.nome}
                onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                placeholder="Nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newUserEmail">E-mail *</Label>
              <Input
                id="newUserEmail"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="email@empresa.com.br"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newUserRole">Função *</Label>
              <Select value={newUser.role} onValueChange={(value: 'admin' | 'user') => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-600">
                Usuários podem visualizar orçamentos. Administradores podem gerenciar todo o sistema.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newUserSenha">Senha *</Label>
              <Input
                id="newUserSenha"
                type="password"
                value={newUser.senha}
                onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newUserConfirmarSenha">Confirmar Senha *</Label>
              <Input
                id="newUserConfirmarSenha"
                type="password"
                value={newUser.confirmarSenha}
                onChange={(e) => setNewUser({ ...newUser, confirmarSenha: e.target.value })}
                placeholder="Repita a senha"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={creatingUser}>
                {creatingUser ? 'Criando...' : 'Criar Usuário'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de resetar senha */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redefinir Senha</DialogTitle>
            <DialogDescription className="text-slate-600">
              Defina uma nova senha para {resetPasswordUser?.nome}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPasswordInput">Nova Senha *</Label>
              <Input
                id="newPasswordInput"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsResetPasswordOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={resettingPassword}>
                {resettingPassword ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
      </div>
    </div>
  );
};

export default AdminConfiguracoes;
