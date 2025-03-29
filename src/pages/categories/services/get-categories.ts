import { gastiClient } from '@/lib/api';
import {
  Category,
  CategoryFormData,
  SubcategoryFormData,
} from '../domain/types';

export const getCategories = async (): Promise<
  Category[]
> => {
  const { data } = await gastiClient.get<{
    data: Category[];
  }>('/categories');

  return data.data;
};

export async function createCategory(
  data: CategoryFormData
): Promise<Category> {
  const response = await gastiClient.post<{
    data: Category;
  }>('/categories', data);
  return response.data.data;
}

export async function updateCategory(
  id: string,
  data: Partial<CategoryFormData>
): Promise<Category> {
  const response = await gastiClient.patch<{
    data: Category;
  }>(`/categories/${id}`, data);
  return response.data.data;
}

export async function deleteCategory(
  id: string
): Promise<void> {
  await gastiClient.delete(`/categories/${id}`);
}

export async function createSubcategory(
  categoryId: string,
  data: SubcategoryFormData
): Promise<Category> {
  const response = await gastiClient.post<{
    data: Category;
  }>(`/categories/${categoryId}/subcategories`, data);
  return response.data.data;
}

export async function updateSubcategory(
  categoryId: string,
  subcategoryId: string,
  data: Partial<SubcategoryFormData>
): Promise<Category> {
  const response = await gastiClient.patch<{
    data: Category;
  }>(
    `/categories/${categoryId}/subcategories/${subcategoryId}`,
    data
  );
  return response.data.data;
}

export async function deleteSubcategory(
  categoryId: string,
  subcategoryId: string
): Promise<void> {
  await gastiClient.delete(
    `/categories/${categoryId}/subcategories/${subcategoryId}`
  );
}
