"use client";

import { useEffect } from 'react';
import { useProductStore } from '@/store/productStore';

export default function StoreInitializer() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchCategories = useProductStore((state) => state.fetchCategories);
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return null;
}
