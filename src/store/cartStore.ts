import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: any;
  name: string;
  price: number;
  category?: string;
  image: string;
  rating?: number;
  description?: string;
  ageGroup?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  appliedPromo: any | null;
  addItem: (item: Product) => void;
  removeItem: (id: any) => void;
  updateQuantity: (id: any, quantity: number) => void;
  applyPromo: (promo: any) => void;
  removePromo: () => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  getGrandTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
           get().removeItem(id);
           return;
        }
        set({
          items: get().items.map((item) => 
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      applyPromo: (promo) => set({ appliedPromo: promo }),
      removePromo: () => set({ appliedPromo: null }),
      clearCart: () => set({ items: [], appliedPromo: null }),
      getCartTotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
      getDiscountAmount: () => {
        const total = get().getCartTotal();
        const promo = get().appliedPromo;
        if (!promo) return 0;
        if (promo.type === 'percentage') {
          return (total * Number(promo.discount)) / 100;
        }
        return Number(promo.discount);
      },
      getGrandTotal: () => {
        const total = get().getCartTotal();
        const discount = get().getDiscountAmount();
        const ship = total > 0 ? 99 : 0; // Flat shipping in Rupee
        return Math.max(0, total - discount + ship);
      },
      getCartCount: () => get().items.reduce((count, item) => count + item.quantity, 0)
    }),
    {
      name: 'mindsky-cart',
    }
  )
);
