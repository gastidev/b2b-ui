import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/get-categories';
import { Category } from '../../domain/types/category';

interface CategoriesResponse {
  categories: Category[];
  isEmpty: boolean;
}

export const useCategories = () => {
  return useQuery<Category[], unknown, CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => ({
      categories: data,
      isEmpty: data.length === 0,
    }),
  });
};
