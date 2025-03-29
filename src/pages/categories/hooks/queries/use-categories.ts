import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/get-categories';
import { Category } from '../../domain/types';

export type CategoriesResponse = Category[];

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => ({
      categories: data,
      isEmpty: data.length === 0,
    }),
  });
};
