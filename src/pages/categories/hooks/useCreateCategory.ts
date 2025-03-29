import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createCategory } from '../services/get-categories';
import { toast } from 'sonner';
import { CreateCategoryDTO } from '../domain/types/category';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDTO) =>
      createCategory({
        company_id: data.company_id,
        name: data.name,
        icon: data.icon,
        color: data.color,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Categoría creada exitosamente');
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error al crear la categoría';
      toast.error(errorMessage);
    },
  });
};
