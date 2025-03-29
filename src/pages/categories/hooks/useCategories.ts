import { useState, useEffect } from 'react';
import {
  Category,
  CategoryFormData,
  SubcategoryFormData,
  Subcategory,
} from '../domain/types';
import {
  getCategories,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
  createSubcategory as createSubcategoryService,
  updateSubcategory as updateSubcategoryService,
  deleteSubcategory as deleteSubcategoryService,
} from '../services/get-categories';
import { toast } from 'sonner';

export const useCategories = (companyId: string) => {
  const [categories, setCategories] = useState<Category[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err as Error);
      toast.error('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (
    categoryData: Omit<CategoryFormData, 'company_id'>
  ) => {
    try {
      const newCategory = await createCategoryService({
        ...categoryData,
        company_id: companyId,
      });
      setCategories((prev) => [
        ...prev,
        { ...newCategory, subcategories: [] },
      ]);
      toast.success('Categoría creada exitosamente');
      return newCategory;
    } catch (err) {
      toast.error('Error al crear la categoría');
      throw err;
    }
  };

  const updateCategory = async (
    id: string,
    category: Partial<CategoryFormData>
  ) => {
    try {
      const updatedCategory = await updateCategoryService(
        id,
        category
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? { ...cat, ...updatedCategory }
            : cat
        )
      );
      toast.success('Categoría actualizada exitosamente');
      return updatedCategory;
    } catch (err) {
      toast.error('Error al actualizar la categoría');
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteCategoryService(id);
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== id)
      );
      toast.success('Categoría eliminada exitosamente');
    } catch (err) {
      toast.error('Error al eliminar la categoría');
      throw err;
    }
  };

  const createSubcategory = async (
    categoryId: string,
    subcategoryData: Omit<
      SubcategoryFormData,
      'category_id'
    >
  ) => {
    try {
      const newSubcategory = await createSubcategoryService(
        categoryId,
        {
          ...subcategoryData,
          category_id: categoryId,
        }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategories: [
                  ...cat.subcategories,
                  newSubcategory as unknown as Subcategory,
                ],
              }
            : cat
        )
      );
      toast.success('Subcategoría creada exitosamente');
      return newSubcategory;
    } catch (err) {
      toast.error('Error al crear la subcategoría');
      throw err;
    }
  };

  const updateSubcategory = async (
    categoryId: string,
    subcategoryId: string,
    subcategory: Partial<SubcategoryFormData>
  ) => {
    try {
      const updatedSubcategory =
        await updateSubcategoryService(
          categoryId,
          subcategoryId,
          subcategory
        );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategories: cat.subcategories.map(
                  (sub) =>
                    sub.id === subcategoryId
                      ? { ...sub, ...updatedSubcategory }
                      : sub
                ),
              }
            : cat
        )
      );
      toast.success(
        'Subcategoría actualizada exitosamente'
      );
      return updatedSubcategory;
    } catch (err) {
      toast.error('Error al actualizar la subcategoría');
      throw err;
    }
  };

  const deleteSubcategory = async (
    categoryId: string,
    subcategoryId: string
  ) => {
    try {
      await deleteSubcategoryService(
        categoryId,
        subcategoryId
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                subcategories: cat.subcategories.filter(
                  (sub) => sub.id !== subcategoryId
                ),
              }
            : cat
        )
      );
      toast.success('Subcategoría eliminada exitosamente');
    } catch (err) {
      toast.error('Error al eliminar la subcategoría');
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    refreshCategories: fetchCategories,
  };
};
