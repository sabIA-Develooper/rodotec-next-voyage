import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { RodotecLogo } from '@/components/RodotecLogo';

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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0B1220' }}>
      <div className="w-full max-w-md">
        <div
          className="rounded-3xl border p-8"
          style={{
            backgroundColor: '#0D1528',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <RodotecLogo variant="admin" showText={false} linkTo={null} className="mx-auto" />
            </div>
            <p className="mt-4 text-lg" style={{ color: '#94A3B8' }}>Painel Administrativo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-400 uppercase text-sm tracking-wide">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={loading}
                className="text-white rounded-xl"
                style={{
                  backgroundColor: '#0B1220',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-400 uppercase text-sm tracking-wide">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="text-white rounded-xl"
                style={{
                  backgroundColor: '#0B1220',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl font-bold text-lg"
              style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
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