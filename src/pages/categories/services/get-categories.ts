import { gastiClient } from '@/lib/api';
import { Category } from '../domain/types/category';

export const getCategories = async (): Promise<
  Category[]
> => {
  const { data } = await gastiClient.get<{
    data: Category[];
  }>('/categories');

  return data.data;
};
