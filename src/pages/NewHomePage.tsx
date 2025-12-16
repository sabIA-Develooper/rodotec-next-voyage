import { HeroSection } from "@/components/home/HeroSection";
import { PlatformSection } from "@/components/home/PlatformSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { StatsSection } from "@/components/home/StatsSection";
import { MethodSection } from "@/components/home/MethodSection";
import { LocationSection } from "@/components/home/LocationSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ContactSection } from "@/components/home/ContactSection";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function NewHomePage() {
  return (
    <>
      <SEO 
        title="Início"
        description="RODOTEC - Fabricante sergipana de implementos rodoviários de alta qualidade. Especializada em poliguindastes, carrocerias, caçambas basculantes, tanques e food trucks. Engenharia brasileira de excelência."
        keywords="rodotec, implementos rodoviários, poliguindaste, carroceria, caçamba basculante, tanque, equipamentos rodoviários, sergipe, brasil"
        ogType="website"
      />
      
      <div className="min-h-screen bg-[#020617]">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        <WhatsAppButton />

        <main className="relative">
          <HeroSection />
          <PlatformSection />
          <ProductsSection />
          <TechnologySection />
          <StatsSection />
          <MethodSection />
          <LocationSection />
          <PartnersSection />
          <ContactSection />
        </main>

        <NewFooter />
      </div>
    </>
  );
}

