import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user, role, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();

  // Se já está autenticado com role, redirecionar
  useEffect(() => {
    if (user && role && !authLoading) {
      navigate('/admin', { replace: true });
    }
  }, [user, role, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error('Erro ao fazer login', {
          description: error.message || 'Credenciais inválidas',
        });
        setLoading(false);
      } else {
        toast.success('Login realizado!');
        // Redirecionamento será feito pelo useEffect
      }
    } catch (err) {
      toast.error('Erro ao fazer login', {
        description: 'Ocorreu um erro inesperado',
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-white">
      <div className="w-full max-w-md px-4">
        <div className="bg-surface-2 rounded-lg shadow-[var(--shadow-elevated)] border border-line p-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/20">
                <span className="font-heading text-3xl font-bold">R</span>
              </div>
            </div>
            <h1 className="text-2xl font-heading font-bold text-white">RODOTEC</h1>
            <p className="text-muted mt-2">Painel Administrativo</p>
            <p className="text-xs text-muted mt-4 bg-surface rounded-md px-3 py-2">
              Login: admin@rodotec.com.br | Senha: admin123
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={loading}
                className="bg-surface border-line text-white placeholder:text-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-text">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="bg-surface border-line text-white placeholder:text-muted"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand hover:bg-brand-600 text-white font-bold shadow-lg shadow-brand/20"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}