import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Engagement from "@/components/home/Engagement";
import LearnPlayCorner from "@/components/home/LearnPlayCorner";
import Reviews from "@/components/home/Reviews";
import WhatsAppOrder from "@/components/home/WhatsAppOrder";

import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow pt-20 bg-soft-gradient">
        <ErrorBoundary>
          <Hero />
          <Categories />
          <FeaturedProducts />
          <LearnPlayCorner />
          <Reviews />
          <WhatsAppOrder />
        </ErrorBoundary>
      </main>
    </div>
  );
}
