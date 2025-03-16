import { gastiClient } from '@/lib/api';

export const deleteSubcategory = async (
  categoryId: string,
  subcategoryId: string
): Promise<void> => {
  await gastiClient.delete(
    `/categories/${categoryId}/subcategories/${subcategoryId}`
  );
};
