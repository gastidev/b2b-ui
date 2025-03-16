import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { gastiClient } from '@/lib/api';

const deleteCategory = async (
  id: string
): Promise<void> => {
  await gastiClient.delete(`/categories/${id}`);
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      toast.success('Categoría eliminada exitosamente');
    },
    onError: () => {
      toast.error('Error al eliminar la categoría');
    },
  });
};
