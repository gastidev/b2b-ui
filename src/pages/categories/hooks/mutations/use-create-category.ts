import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createCategory } from '../../services/create-category';
import { CreateCategoryDTO } from '../../domain/types/category';
import { toast } from 'sonner';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) =>
      createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Categoría creada exitosamente');
    },
    onError: () => {
      toast.error('Error al crear la categoría');
    },
  });
};
