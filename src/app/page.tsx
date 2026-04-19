import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductSection from "@/components/ProductSection";
import LearnPlaySection from "@/components/LearnPlaySection";
import ReviewSection from "@/components/ReviewSection";
import WhatsAppSection from "@/components/WhatsAppSection";

import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow pt-20 bg-soft-gradient">
        <ErrorBoundary>
          <HeroSection />
          <CategorySection />
          <ProductSection />
          <LearnPlaySection />
          <ReviewSection />
          <WhatsAppSection />
        </ErrorBoundary>
      </main>
    </div>
  );
}
