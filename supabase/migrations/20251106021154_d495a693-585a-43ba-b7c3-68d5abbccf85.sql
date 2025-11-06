-- Criar enum para roles de usuário
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Criar enum para status de produtos
CREATE TYPE public.product_status AS ENUM ('ACTIVE', 'DRAFT');

-- Criar enum para status de orçamentos
CREATE TYPE public.quote_status AS ENUM ('NEW', 'IN_PROGRESS', 'CONTACTED', 'WON', 'LOST');

-- Tabela de perfis de usuários admin
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de roles (CRÍTICO: separada para segurança)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Tabela de categorias
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de coleções
CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  status product_status DEFAULT 'DRAFT',
  price DECIMAL(10,2),
  sku TEXT,
  barcode TEXT,
  stock_qty INTEGER DEFAULT 0,
  allow_backorder BOOLEAN DEFAULT false,
  weight_kg DECIMAL(10,2),
  dimensions_l DECIMAL(10,2),
  dimensions_a DECIMAL(10,2),
  dimensions_p DECIMAL(10,2),
  country_of_origin TEXT DEFAULT 'Brasil',
  hs_code TEXT,
  type TEXT,
  manufacturer TEXT,
  media JSONB DEFAULT '[]'::jsonb,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  seo_title TEXT,
  seo_description TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de relacionamento produtos-coleções (M2M)
CREATE TABLE public.product_collections (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_id)
);

-- Tabela de solicitações de orçamento
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  message TEXT,
  consent_lgpd BOOLEAN DEFAULT false,
  status quote_status DEFAULT 'NEW',
  assignee TEXT,
  notes TEXT,
  source TEXT DEFAULT 'SITE_FORM',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Função de segurança para verificar roles (SECURITY DEFINER para evitar recursão)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies para admin_profiles
CREATE POLICY "Admins podem ver todos os perfis"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins podem inserir perfis"
  ON public.admin_profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.admin_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies para user_roles (somente admins)
CREATE POLICY "Admins podem ver todos os roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem gerenciar roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para categories (admins e editores)
CREATE POLICY "Admins e editores podem ver categorias"
  ON public.categories FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins podem gerenciar categorias"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para collections
CREATE POLICY "Admins e editores podem ver coleções"
  ON public.collections FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins podem gerenciar coleções"
  ON public.collections FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para products
CREATE POLICY "Admins e editores podem ver produtos"
  ON public.products FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins e editores podem criar produtos"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins e editores podem atualizar produtos"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins podem deletar produtos"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para product_collections
CREATE POLICY "Admins e editores podem gerenciar relações produto-coleção"
  ON public.product_collections FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies para quote_requests
CREATE POLICY "Admins e editores podem ver orçamentos"
  ON public.quote_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins e editores podem atualizar orçamentos"
  ON public.quote_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Qualquer pessoa pode criar orçamentos (site público)"
  ON public.quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para criar perfil admin automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Criar bucket de storage para uploads de produtos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-media', 'product-media', true)
ON CONFLICT (id) DO NOTHING;

-- Policies de storage para product-media
CREATE POLICY "Admins e editores podem fazer upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-media' AND
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Todos podem ver mídia de produtos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-media');

CREATE POLICY "Admins e editores podem atualizar mídia"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-media' AND
    (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  );

CREATE POLICY "Admins podem deletar mídia"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-media' AND
    public.has_role(auth.uid(), 'admin')
  );