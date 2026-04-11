import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Engagement from "@/components/home/Engagement";
import PromoBanner from "@/components/home/PromoBanner";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <PromoBanner />
        <Engagement />
        <Reviews />
        <Newsletter />
      </main>
    </div>
  );
}
