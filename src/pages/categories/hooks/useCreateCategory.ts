import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { categoriesService } from '../services/categories.service';
import { CreateCategoryDTO } from '../domain/types/category.types';
import { toast } from 'sonner';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) =>
      categoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Categoría creada exitosamente');
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Error al crear la categoría'
      );
    },
  });
};
