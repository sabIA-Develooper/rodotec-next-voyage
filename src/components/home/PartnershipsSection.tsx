import { useState } from 'react';

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

const partners: Partner[] = [
  {
    name: 'TKA',
    logo: '/images/logos/tka.svg',
    alt: 'Logo TKA',
  },
  {
    name: 'SILPA',
    logo: '/images/logos/silpa.svg',
    alt: 'Logo SILPA',
  },
];

export function PartnershipsSection() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (partnerName: string) => {
    setImageErrors(prev => ({ ...prev, [partnerName]: true }));
  };

  return (
    <section className="section-spacing bg-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #3f4ba3 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Parcerias
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Empresas que confiam e trabalham com a Rodotec
          </p>
        </div>

        {/* Partners Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group bg-white rounded-xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center border border-gray-100 hover:border-brand/20"
              >
                {imageErrors[partner.name] ? (
                  <div className="text-gray-400 text-center">
                    <span className="text-lg font-bold">{partner.name}</span>
                  </div>
                ) : (
                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    loading="lazy"
                    onError={() => handleImageError(partner.name)}
                    className="max-h-16 lg:max-h-20 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Optional decorative element */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-sm text-gray-500">
            Parcerias que fortalecem nossa cadeia de valor
          </p>
        </div>
      </div>
    </section>
  );
}
