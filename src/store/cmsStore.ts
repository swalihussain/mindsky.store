import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CmsData {
  hero: {
    offerText: string;
    title: string;
    subtitle: string;
    primaryBtnText: string;
    secondaryBtnText: string;
  };
  promo: {
    title: string;
    subtitle: string;
    btnText: string;
    highlight: string;
  };
}

interface CmsState {
  data: CmsData;
  updateHero: (hero: Partial<CmsData['hero']>) => void;
  updatePromo: (promo: Partial<CmsData['promo']>) => void;
}

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      data: {
        hero: {
          offerText: "🎁 SPECIAL: 20% OFF ALL SUMMER TOYS!",
          title: "Fun, Fashion & Learning for Every Kid",
          subtitle: "Discover play-tested, parent-approved gear from toys to trendy clothing at MindSky.store!",
          primaryBtnText: "🛒 Shop Now",
          secondaryBtnText: "🎁 Explore Offers",
        },
        promo: {
          title: "Join the MindSky VIP Club!",
          subtitle: "Get exclusive early access to new toys, special discounts, and birthday surprises for your little ones.",
          btnText: "Sign Up for Free",
          highlight: "VIP ONLY"
        }
      },
      updateHero: (hero) => set((state) => ({ 
        data: { ...state.data, hero: { ...state.data.hero, ...hero } } 
      })),
      updatePromo: (promo) => set((state) => ({ 
        data: { ...state.data, promo: { ...state.data.promo, ...promo } } 
      })),
    }),
    {
      name: 'cms-storage',
    }
  )
);
