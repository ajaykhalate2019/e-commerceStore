import { useQuery } from '@tanstack/react-query';
import { fetchProduct, Product } from '../lib/queries';

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};
