import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { localDataLayer } from '@/data/localDataLayer';
import { Settings } from '@/data/localDataLayer';

const AdminConfiguracoes: React.FC = () => {
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

  useEffect(() => {
    const savedSettings = localDataLayer.getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

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

  const handleResetPassword = (userId: string) => {
    toast.success(`Senha redefinida para usuário ${userId}`);
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
                <CardDescription>Configure as informações básicas da empresa</CardDescription>
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
                <CardDescription>Personalize as cores e logos do sistema</CardDescription>
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
                <CardDescription>Gerencie como você recebe notificações</CardDescription>
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

        <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Usuários e Permissões</CardTitle>
            <CardDescription>Gerencie os usuários do sistema</CardDescription>
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
                {settings.usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.role}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleResetPassword(usuario.id)}>Redefinir Senha</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
      </div>
    </div>
  );
};

export default AdminConfiguracoes;
