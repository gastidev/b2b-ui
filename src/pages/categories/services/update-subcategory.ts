import {
  SubcategoryFormData,
  Subcategory,
} from '../domain/types';
import { gastiClient } from '@/lib/api';

export const updateSubcategory = async (
  categoryId: string,
  subcategoryId: string,
  data: Partial<SubcategoryFormData>
): Promise<Subcategory> => {
  const { data: response } =
    await gastiClient.patch<Subcategory>(
      `/categories/${categoryId}/subcategories/${subcategoryId}`,
      data
    );
  return response;
};
