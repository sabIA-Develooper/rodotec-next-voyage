-- Corrigir search_path para funções existentes (garantir segurança)
ALTER FUNCTION public.has_role(_user_id UUID, _role app_role) SET search_path TO 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path TO 'public';
ALTER FUNCTION public.handle_new_admin_user() SET search_path TO 'public';