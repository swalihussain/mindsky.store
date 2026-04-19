import { create } from 'zustand';

interface CmsData {
  hero_title: string;
  hero_subtitle: string;
  hero_button_text: string;
  hero_link: string;
  footer_description: string;
  promo: {
    highlight: string;
    title: string;
    subtitle: string;
    btnText: string;
  }
}

interface CmsState {
  data: CmsData;
  isLoading: boolean;
  fetchCMS: () => Promise<void>;
  updateCMS: (data: Partial<CmsData>) => void;
  updateHero: (hero: Partial<CmsData>) => void;
  updatePromo: (promo: Partial<CmsData['promo']>) => void;
}

export const useCmsStore = create<CmsState>((set) => ({
  data: {
    hero_title: "Fun, Fashion & Learning for Every Kid",
    hero_subtitle: "Discover play-tested, parent-approved gear from toys to trendy clothing at MindSky.store!",
    hero_button_text: "🛒 Shop Now",
    hero_link: "/shop",
    footer_description: "Making learning fun and play educational. Your one-stop shop for kids' toys, clothing, and gear.",
    promo: {
      highlight: "NEW ARRIVALS",
      title: "Science & Discovery",
      subtitle: "Unleash their inner explorer with our physics and chemistry play-kits.",
      btnText: "Explore Collection"
    }
  },
  isLoading: false,
  fetchCMS: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/cms');
      const json = await res.json();
      if (json.success) {
        set({ data: { ...json.data }, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("CMS Fetch Failed", err);
      set({ isLoading: false });
    }
  },
  updateCMS: (newData) => set((state) => ({
    data: { ...state.data, ...newData }
  })),
  updateHero: (hero) => set((state) => ({
    data: { ...state.data, ...hero }
  })),
  updatePromo: (promo) => set((state) => ({
    data: { ...state.data, promo: { ...state.data.promo, ...promo } }
  }))
}));
