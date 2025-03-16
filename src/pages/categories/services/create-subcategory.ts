import {
  SubcategoryFormData,
  Subcategory,
} from '../domain/types';
import { gastiClient } from '@/lib/api';

export const createSubcategory = async (
  categoryId: string,
  data: SubcategoryFormData
): Promise<Subcategory> => {
  const { data: response } =
    await gastiClient.post<Subcategory>(
      `/categories/${categoryId}/subcategories`,
      data
    );
  return response;
};
