import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signOut } from '../services/auth.service';
import { queryClient } from '@/lib/react-query';

export const useSignOut = () => {
  const navigate = useNavigate();

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // Invalidamos todas las queries
      queryClient.clear();

      // Redirigimos al inicio
      navigate('/', { replace: true });

      toast.success('¡Hasta pronto!');
    },
    onError: () => {
      toast.error('Error al cerrar sesión');
    },
  });

  return {
    signOut: signOutMutation.mutate,
    isLoading: signOutMutation.isPending,
  };
};
