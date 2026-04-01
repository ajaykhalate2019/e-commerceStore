import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../lib/queries';

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};
