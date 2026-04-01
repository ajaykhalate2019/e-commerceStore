import { useQuery } from '@tanstack/react-query';
import { fetchProducts, Product } from '../lib/queries';

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
