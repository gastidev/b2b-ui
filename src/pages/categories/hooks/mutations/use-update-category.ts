import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { gastiClient } from '@/lib/api';
import {
  Category,
  UpdateCategoryDTO,
} from '../../domain/types/category';

const updateCategory = async (data: {
  id: string;
  category: UpdateCategoryDTO;
}): Promise<Category> => {
  const response = await gastiClient.patch(
    `/categories/${data.id}`,
    data.category
  );
  return response.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Categoría actualizada exitosamente');
    },
    onError: () => {
      toast.error('Error al actualizar la categoría');
    },
  });
};
