import { Link } from "react-router-dom";

interface RodotecLogoProps {
  variant?: "navbar" | "footer" | "admin";
  className?: string;
  showText?: boolean;
  linkTo?: string | null;
}

export function RodotecLogo({
  variant = "navbar",
  className = "",
  showText = true,
  linkTo = "/"
}: RodotecLogoProps) {
  const sizeClasses = {
    navbar: "h-20",
    footer: "h-20",
    admin: "h-24"
  };

  const LogoContent = () => (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <img
        src="/images/logo/rodotec.png"
        alt="RODOTEC - Equipamentos Rodoviários"
        className={`${sizeClasses[variant]} w-auto object-contain`}
        loading="eager"
      />

      {/* Text (optional) */}
      {showText && variant === "navbar" && (
        <div className="hidden sm:block">
          <p className="text-gray-400 text-xs">Equipamentos Rodoviários</p>
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#030712] rounded"
        aria-label="RODOTEC - Página inicial"
      >
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
