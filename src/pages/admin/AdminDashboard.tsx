import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Package, TrendingUp, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newQuotes: 0,
    inProgressQuotes: 0,
    completedQuotes: 0,
    activeProducts: 0,
    draftProducts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [quotesResult, productsResult] = await Promise.all([
      supabase.from('quote_requests').select('status'),
      supabase.from('products').select('status'),
    ]);

    if (quotesResult.data) {
      const newQuotes = quotesResult.data.filter((q) => q.status === 'NEW').length;
      const inProgress = quotesResult.data.filter((q) => q.status === 'IN_PROGRESS').length;
      const completed = quotesResult.data.filter(
        (q) => q.status === 'WON' || q.status === 'CONTACTED'
      ).length;

      setStats((prev) => ({
        ...prev,
        newQuotes,
        inProgressQuotes: inProgress,
        completedQuotes: completed,
      }));
    }

    if (productsResult.data) {
      const active = productsResult.data.filter((p) => p.status === 'ACTIVE').length;
      const draft = productsResult.data.filter((p) => p.status === 'DRAFT').length;

      setStats((prev) => ({
        ...prev,
        activeProducts: active,
        draftProducts: draft,
      }));
    }
  };

  const cards = [
    {
      title: 'Novos Orçamentos',
      value: stats.newQuotes,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: 'Em Andamento',
      value: stats.inProgressQuotes,
      icon: TrendingUp,
      color: 'text-orange-600',
    },
    {
      title: 'Concluídos',
      value: stats.completedQuotes,
      icon: CheckCircle2,
      color: 'text-green-600',
    },
    {
      title: 'Produtos Ativos',
      value: stats.activeProducts,
      icon: Package,
      color: 'text-primary',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimos Orçamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lista dos últimos orçamentos recebidos (em desenvolvimento)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Últimos produtos atualizados (em desenvolvimento)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}