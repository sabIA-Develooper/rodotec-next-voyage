import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
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
import { Plus, Key, ChevronLeft } from 'lucide-react';
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

  const [usuarios, setUsuarios] = useState<AdminUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    role: 'user' as 'admin' | 'user'
  });
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
    <AdminLayout>
      <div className="space-y-16">
        {/* Header com botão voltar */}
        <div className="flex items-center gap-6">
          <Link to="/admin">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#0D1528] rounded-xl"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Configurações</h1>
            <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>
              Gerencie as configurações do sistema
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Card Informações da Empresa */}
          <div
            className="rounded-3xl border p-8"
            style={{
              backgroundColor: '#0B1220',
              borderColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Informações da Empresa</h2>
              <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                Configure as informações básicas da empresa
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-gray-400 uppercase text-sm tracking-wide">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="nome"
                    value={settings.empresa.nome}
                    onChange={(e) => handleEmpresaChange('nome', e.target.value)}
                    placeholder="Nome da empresa"
                    className="text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="text-gray-400 uppercase text-sm tracking-wide">
                    CNPJ
                  </Label>
                  <Input
                    id="cnpj"
                    value={settings.empresa.cnpj}
                    onChange={(e) => handleEmpresaChange('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                    className="text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco" className="text-gray-400 uppercase text-sm tracking-wide">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  value={settings.empresa.endereco}
                  onChange={(e) => handleEmpresaChange('endereco', e.target.value)}
                  placeholder="Rua, número, bairro, cidade, estado"
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-gray-400 uppercase text-sm tracking-wide">
                    Telefone/WhatsApp
                  </Label>
                  <Input
                    id="telefone"
                    value={settings.empresa.telefone}
                    onChange={(e) => handleEmpresaChange('telefone', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                  {settings.empresa.telefone && (
                    <a
                      className="text-sm hover:underline"
                      style={{ color: '#3B4BA8' }}
                      href={`https://wa.me/${settings.empresa.telefone.replace(/\D/g, '').startsWith('55') ? settings.empresa.telefone.replace(/\D/g, '') : '55' + settings.empresa.telefone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir chat no WhatsApp
                    </a>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-400 uppercase text-sm tracking-wide">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.empresa.email}
                    onChange={(e) => handleEmpresaChange('email', e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card Aparência */}
          <div
            className="rounded-3xl border p-8"
            style={{
              backgroundColor: '#0B1220',
              borderColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Aparência do Sistema</h2>
              <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                Personalize as cores e logos do sistema
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="corPrimaria" className="text-gray-400 uppercase text-sm tracking-wide">
                    Cor Primária
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="corPrimaria"
                      type="color"
                      value={settings.aparencia.corPrimaria}
                      onChange={(e) => handleAparenciaChange('corPrimaria', e.target.value)}
                      className="w-20 rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                    <Input
                      value={settings.aparencia.corPrimaria}
                      onChange={(e) => handleAparenciaChange('corPrimaria', e.target.value)}
                      placeholder="#0D47A1"
                      className="text-white rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="corFundo" className="text-gray-400 uppercase text-sm tracking-wide">
                    Cor de Fundo
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="corFundo"
                      type="color"
                      value={settings.aparencia.corFundo}
                      onChange={(e) => handleAparenciaChange('corFundo', e.target.value)}
                      className="w-20 rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                    <Input
                      value={settings.aparencia.corFundo}
                      onChange={(e) => handleAparenciaChange('corFundo', e.target.value)}
                      placeholder="#FFFFFF"
                      className="text-white rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-gray-400 uppercase text-sm tracking-wide">
                  Logotipo
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {settings.aparencia.logoUrl && (
                  <div className="mt-2 p-4 rounded-xl" style={{ backgroundColor: '#0D1528' }}>
                    <img src={settings.aparencia.logoUrl} alt="Logo" className="h-16 w-auto" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon" className="text-gray-400 uppercase text-sm tracking-wide">
                  Favicon
                </Label>
                <Input
                  id="favicon"
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconUpload}
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {settings.aparencia.faviconUrl && (
                  <div className="mt-2 p-4 rounded-xl" style={{ backgroundColor: '#0D1528' }}>
                    <img src={settings.aparencia.faviconUrl} alt="Favicon" className="h-8 w-8" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Notificações */}
          <div
            className="rounded-3xl border p-8"
            style={{
              backgroundColor: '#0B1220',
              borderColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Configurações de Notificações</h2>
              <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                Gerencie como você recebe notificações
              </p>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#0D1528' }}>
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="avisarNovosOrcamentos" className="text-white font-medium">
                  Avisar sobre novos orçamentos
                </Label>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  Receba notificações quando novos orçamentos forem solicitados
                </p>
              </div>
              <Switch
                id="avisarNovosOrcamentos"
                checked={settings.notificacoes.avisarNovosOrcamentos}
                onCheckedChange={(checked) => handleNotificacaoChange('avisarNovosOrcamentos', checked)}
              />
            </div>
          </div>

          {/* Card Usuários - apenas para admin */}
          {isAdmin && (
            <div
              className="rounded-3xl border overflow-hidden"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Usuários e Permissões</h2>
                    <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                      Gerencie os usuários do sistema
                    </p>
                  </div>
                  <Button
                    onClick={openCreateUserModal}
                    className="rounded-xl px-4 py-2 font-semibold"
                    style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Usuário
                  </Button>
                </div>

                {loadingUsers ? (
                  <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                    Carregando usuários...
                  </p>
                ) : usuarios.length === 0 ? (
                  <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                    Nenhum usuário cadastrado
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                          <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Nome</TableHead>
                          <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Email</TableHead>
                          <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Função</TableHead>
                          <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usuarios.map((usuario) => (
                          <TableRow
                            key={usuario._id}
                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                            className="hover:bg-[#0D1528]"
                          >
                            <TableCell className="text-white font-medium">{usuario.nome}</TableCell>
                            <TableCell style={{ color: '#94A3B8' }}>{usuario.email}</TableCell>
                            <TableCell style={{ color: '#94A3B8' }}>
                              {usuario.role === 'admin' ? 'Administrador' : 'Usuário'}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResetPasswordModal(usuario)}
                                className="rounded-xl text-white hover:bg-[#0D1528]"
                                style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                              >
                                <Key className="h-4 w-4 mr-1" />
                                Redefinir Senha
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botão salvar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveSettings}
            className="rounded-xl px-8 py-3 font-semibold text-lg"
            style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
          >
            Salvar Configurações
          </Button>
        </div>

        {/* Modal criar usuário */}
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogContent
            className="sm:max-w-md"
            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Novo Usuário</DialogTitle>
              <DialogDescription style={{ color: '#94A3B8' }}>
                Crie um novo usuário para acessar o painel administrativo
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newUserNome" className="text-gray-400 uppercase text-sm tracking-wide">
                  Nome *
                </Label>
                <Input
                  id="newUserNome"
                  value={newUser.nome}
                  onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
                  placeholder="Nome completo"
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newUserEmail" className="text-gray-400 uppercase text-sm tracking-wide">
                  E-mail *
                </Label>
                <Input
                  id="newUserEmail"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@empresa.com.br"
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newUserRole" className="text-gray-400 uppercase text-sm tracking-wide">
                  Função *
                </Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: 'admin' | 'user') => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger
                    className="text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <SelectItem value="user" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                      Usuário
                    </SelectItem>
                    <SelectItem value="admin" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                      Administrador
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  Usuários podem visualizar orçamentos. Administradores podem gerenciar todo o sistema.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newUserSenha" className="text-gray-400 uppercase text-sm tracking-wide">
                  Senha *
                </Label>
                <Input
                  id="newUserSenha"
                  type="password"
                  value={newUser.senha}
                  onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newUserConfirmarSenha" className="text-gray-400 uppercase text-sm tracking-wide">
                  Confirmar Senha *
                </Label>
                <Input
                  id="newUserConfirmarSenha"
                  type="password"
                  value={newUser.confirmarSenha}
                  onChange={(e) => setNewUser({ ...newUser, confirmarSenha: e.target.value })}
                  placeholder="Repita a senha"
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateUserOpen(false)}
                  className="rounded-xl text-white hover:bg-[#0D1528]"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={creatingUser}
                  className="rounded-xl"
                  style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
                >
                  {creatingUser ? 'Criando...' : 'Criar Usuário'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal resetar senha */}
        <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
          <DialogContent
            className="sm:max-w-md"
            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Redefinir Senha</DialogTitle>
              <DialogDescription style={{ color: '#94A3B8' }}>
                Defina uma nova senha para {resetPasswordUser?.nome}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPasswordInput" className="text-gray-400 uppercase text-sm tracking-wide">
                  Nova Senha *
                </Label>
                <Input
                  id="newPasswordInput"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResetPasswordOpen(false)}
                  className="rounded-xl text-white hover:bg-[#0D1528]"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={resettingPassword}
                  className="rounded-xl"
                  style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
                >
                  {resettingPassword ? 'Redefinindo...' : 'Redefinir Senha'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminConfiguracoes;
