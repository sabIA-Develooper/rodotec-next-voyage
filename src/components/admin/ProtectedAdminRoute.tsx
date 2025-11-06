import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (!role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}