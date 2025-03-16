import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { gastiClient } from '@/lib/api';
import { Subcategory } from '../../domain/types/category';

interface CreateSubcategoryDTO {
  name: string;
  description: string;
  categoryId: string;
}

const createSubcategory = async (
  data: CreateSubcategoryDTO
): Promise<Subcategory> => {
  const response = await gastiClient.post(
    `/categories/${data.categoryId}/subcategories`,
    {
      name: data.name,
      description: data.description,
    }
  );
  return response.data;
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Subcategoría creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la subcategoría');
    },
  });
};
