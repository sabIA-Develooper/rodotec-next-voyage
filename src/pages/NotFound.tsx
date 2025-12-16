import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <NewSideNav />
      <ScrollToTop />
      
      <div className="min-h-screen bg-[#020617] pt-28 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#0B1220] rounded-full border border-white/10 mb-8">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl text-gray-400 mb-2">Página não encontrada</p>
          <p className="text-gray-500 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium"
            >
              <Home className="w-5 h-5" />
              Voltar para Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>
      </div>

      <NewFooter />
    </>
  );
};

export default NotFound;
