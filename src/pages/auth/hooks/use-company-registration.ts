import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import {
  CompanyFormData,
  companySchema,
} from '../schemas/auth.schemas';
import { useOnboardingStore } from '@/pages/onboarding/store/onboarding.store';
import { registerCompany } from '../services/register-company';

export function useCompanyRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCompanyData, setStep } = useOnboardingStore();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      identifier: '',
    },
  });

  const mutation = useMutation({
    mutationFn: registerCompany,
    onSuccess: (data) => {
      setCompanyData(data);
      setStep(3);
      navigate('/onboarding/invite');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Error al registrar empresa',
        variant: 'destructive',
      });
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    onSubmit: form.handleSubmit((data) =>
      mutation.mutate({
        name: data.name,
        identifier: data.identifier,
      })
    ),
  };
}
