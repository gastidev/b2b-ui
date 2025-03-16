import { gastiClient } from '@/lib/api';
import {
  Category,
  CreateCategoryDTO,
} from '../domain/types/category';

export const createCategory = async (
  data: CreateCategoryDTO
): Promise<Category> => {
  const response = await gastiClient.post<Category>(
    '/categories',
    data
  );
  return response.data;
};
