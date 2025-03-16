import {
  CategoryFormData,
  Category,
} from '../domain/types';
import { gastiClient } from '@/lib/api';

export const updateCategory = async (
  id: string,
  data: Partial<CategoryFormData>
): Promise<Category> => {
  const { data: response } =
    await gastiClient.patch<Category>(
      `/categories/${id}`,
      data
    );
  return response;
};
