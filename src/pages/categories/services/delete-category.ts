import { gastiClient } from '@/lib/api';

export const deleteCategory = async (
  id: string
): Promise<void> => {
  await gastiClient.delete(`/categories/${id}`);
};
