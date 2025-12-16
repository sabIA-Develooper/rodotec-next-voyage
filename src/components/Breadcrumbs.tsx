import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <Link 
        to="/" 
        className="hover:text-white transition-colors flex items-center gap-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617] rounded"
        aria-label="Voltar para página inicial"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-600" aria-hidden="true" />
            {item.path && !isLast ? (
              <Link 
                to={item.path} 
                className="hover:text-white transition-colors text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617] rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="text-white font-medium" 
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

