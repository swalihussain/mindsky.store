import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description?: string;
  ageGroup?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
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
      clearCart: () => set({ items: [] }),
      getCartTotal: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
      getCartCount: () => get().items.reduce((count, item) => count + item.quantity, 0)
    }),
    {
      name: 'mindsky-cart',
    }
  )
);
