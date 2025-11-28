import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber = '5579991412582',
  message = 'Olá! Gostaria de mais informações sobre os produtos Rodotec.'
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] group"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle
        className="w-7 h-7 text-white transition-transform group-hover:scale-110"
        strokeWidth={2}
      />
      <span className="absolute right-full mr-3 px-4 py-2 bg-white rounded-xl shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ color: '#25D366' }}>
        Fale conosco!
      </span>
    </a>
  );
}
