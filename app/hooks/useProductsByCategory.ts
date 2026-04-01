import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory, Product } from '../lib/queries';

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
  });
};
