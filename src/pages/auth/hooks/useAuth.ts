import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { useOnboardingStore } from '@/pages/onboarding/store/onboarding.store';
import { queryClient } from '@/lib/react-query';
import { setSession } from '@/lib/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { setUserData, setStep } = useOnboardingStore();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.user.role.toUpperCase() !== 'MANAGER') {
        throw new Error('Este usuario no es un manager');
      }

      // Actualizamos el store de Zustand y la sesión
      const sessionData = {
        token: data.token,
        user: {
          id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          role: data.user.role.toLowerCase() as
            | 'manager'
            | 'employee',
          company_id: data.user.company_id,
        },
      };

      setAuth(sessionData);
      setSession(sessionData);

      // Invalidamos la query de sesión para que se refresque
      queryClient.invalidateQueries({
        queryKey: ['session'],
      });

      // Si no tiene compañía, iniciamos el proceso de onboarding
      if (!data.user.company_id) {
        setUserData({
          id: data.user.id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
        });
        setStep(2);
        navigate('/onboarding/company');
        return;
      }

      toast.success('¡Bienvenido de vuelta!');
      navigate('/dashboard', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Ha ocurrido un error inesperado'
      );
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message,
  };
};
