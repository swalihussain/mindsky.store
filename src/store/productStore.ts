import { create } from 'zustand';

export interface Category {
  id: any;
  name: string;
  imageUrl: string;
  description: string;
  parent: string;
}

export interface Product {
  id: any;
  name: string;
  description: string;
  category: string;
  ageGroup: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discountPrice?: number;
  discount?: string;
  isSale?: boolean;
  isNew?: boolean;
  image: string;
  images?: string[];
  stock: number;
  sku: string;
  badges?: string[];
  status?: string;
  createdAt?: string;
}

interface ProductStoreState {
  products: Product[];
  categories: Category[];
  brands: any[];
  ages: any[];
  isLoading: boolean;
  isCategoriesLoading: boolean;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  categories: [],
  brands: [],
  ages: [
    { id: '1', range: '0–2 Years', label: 'Infants & Toddlers', color: 'bg-blue-100 text-blue-800' },
    { id: '2', range: '3–5 Years', label: 'Preschoolers', color: 'bg-green-100 text-green-800' },
    { id: '3', range: '6–8 Years', label: 'Little Kids', color: 'bg-amber-100 text-amber-800' },
    { id: '4', range: '9–12 Years', label: 'Tweens', color: 'bg-purple-100 text-purple-800' },
  ],
  isLoading: false,
  isCategoriesLoading: false,
  fetchCategories: async () => {
     set({ isCategoriesLoading: true });
     try {
       const res = await fetch('/api/categories');
       const json = await res.json();
       if (json.success) set({ categories: json.data, isCategoriesLoading: false });
     } catch (err) {
       console.error("Failed to load categories", err);
       set({ isCategoriesLoading: false });
     }
  },
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      
      if (json.success) {
        // High-resilience filter: Case-insensitive status check and category presence
        const validDocs = (json.data || []).filter((p: any) => {
          const status = (p.status || "").toLowerCase();
          const hasCategory = !!p.category || !!p.category_id;
          return status === 'active' && hasCategory;
        });
        
        const mappedProducts = validDocs.map((p: any) => {
          const basePrice = parseFloat(p.price || 0);
          const discPrice = parseFloat(p.discountPrice || p.discount_price || 0);
          const hasDiscount = !!discPrice && discPrice < basePrice && discPrice > 0;
          const currentPrice = hasDiscount ? discPrice : basePrice;

          return {
            id: p.id,
            name: p.name || p.product_name || 'Unnamed Product',
            description: p.description || '',
            category: p.category || p.category_id || 'Uncategorized',
            ageGroup: p.ageGroup || p.age_group || '',
            brand: p.brand || p.brand_id || '',
            price: currentPrice,
            oldPrice: hasDiscount ? basePrice : undefined,
            discountPrice: hasDiscount ? discPrice : undefined,
            discount: hasDiscount ? `${Math.round(((basePrice - discPrice) / basePrice) * 100)}% OFF` : null,
            isSale: hasDiscount,
            isNew: true, 
            image: p.imageUrl || p.image_url || '/placeholder.jpg',
            stock: Number(p.stock || 0),
            sku: p.sku || '',
            status: p.status,
            badges: hasDiscount ? ['Sale'] : [],
          };
        });
        set({ products: mappedProducts, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Failed to load DB products", err);
      set({ isLoading: false });
    }
  }
}));
