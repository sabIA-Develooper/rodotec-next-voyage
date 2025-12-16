import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";
import NewHomePage from "./pages/NewHomePage";
import Novidades from "./pages/Novidades";
import Downloads from "./pages/Downloads";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrcamentos from "./pages/admin/AdminOrcamentos";
import AdminOrcamentoDetalhe from "./pages/admin/AdminOrcamentoDetalhe";
import AdminConfiguracoes from "./pages/admin/AdminConfiguracoes";
import AdminProdutos from "./pages/admin/AdminProdutos";
import AdminProdutoEditor from "./pages/admin/AdminProdutoEditor";
import AdminCategorias from "./pages/admin/AdminCategorias";
import ErrorBoundary from "./components/ErrorBoundary";
// Novas páginas do novo frontend
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Representantes from "./pages/Representantes";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import NewContato from "./pages/NewContato";
import NewOrcamento from "./pages/NewOrcamento";
import NewProductCatalog from "./pages/NewProductCatalog";
import NewProductDetail from "./pages/NewProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <ErrorBoundary>
          <Routes>
            {/* Rotas públicas - Novo frontend */}
            <Route path="/" element={<NewHomePage />} />
            <Route path="/produtos" element={<NewProductCatalog />} />
            <Route path="/produtos/:slug" element={<NewProductDetail />} />
            <Route path="/contato" element={<NewContato />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/representantes" element={<Representantes />} />
            <Route path="/orcamento" element={<NewOrcamento />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            
            {/* Rotas antigas - Redirecionamento para manter compatibilidade */}
            <Route path="/tecnologia" element={<NewHomePage />} />
            <Route path="/distribuidores" element={<Navigate to="/representantes" replace />} />
            <Route path="/sobre" element={<Navigate to="/quem-somos" replace />} />
            <Route path="/novidades" element={<Novidades />} />
            <Route path="/downloads" element={<Downloads />} />

            {/* Admin - Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin - Protegido */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos"
              element={
                <ProtectedAdminRoute>
                  <AdminOrcamentos />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/:id"
              element={
                <ProtectedAdminRoute>
                  <AdminOrcamentoDetalhe />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/produtos"
              element={
                <ProtectedAdminRoute>
                  <AdminProdutos />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/produtos/novo"
              element={
                <ProtectedAdminRoute>
                  <AdminProdutoEditor />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/produtos/:id"
              element={
                <ProtectedAdminRoute>
                  <AdminProdutoEditor />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/categorias"
              element={
                <ProtectedAdminRoute>
                  <AdminCategorias />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/configuracoes"
              element={
                <ProtectedAdminRoute>
                  <AdminConfiguracoes />
                </ProtectedAdminRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ErrorBoundary>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
