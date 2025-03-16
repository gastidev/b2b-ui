import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { managerSchema } from '../schemas/auth.schemas';
import { useAuthStore } from '../store/auth.store';
import { useOnboardingStore } from '@/pages/onboarding/store/onboarding.store';
import { ManagerFormData } from '../schemas/auth.schemas';
import { registerManager } from '../manager/services/register';

export function useManagerRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { setUserData, setStep } = useOnboardingStore();

  const form = useForm<ManagerFormData>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (
      data: Omit<ManagerFormData, 'confirmPassword'>
    ) =>
      registerManager({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      }),
    onSuccess: (data) => {
      // Guardamos la sesión primero
      setAuth({
        token: data.token,
        user: {
          email: data.user.email,
          id: data.user.id,
          role: data.user.role,
          company_id: data.user.company_id,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
        },
      });

      // Iniciamos el proceso de onboarding
      setUserData({
        id: data.user.id,
        first_name: form.getValues('first_name'),
        last_name: form.getValues('last_name'),
        email: form.getValues('email'),
      });
      setStep(2);
      navigate('/onboarding/company');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Error al registrar usuario',
        variant: 'destructive',
      });
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit((data) =>
      mutation.mutate(data)
    ),
  };
}
