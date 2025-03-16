import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { inviteEmployee } from '../services/invite-employee';

export function useEmployeeInvitation() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: {
      companyId: string;
      email: string;
      firstName: string;
      lastName: string;
    }) =>
      inviteEmployee(
        data.companyId,
        data.email,
        data.firstName,
        data.lastName
      ),
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Error al invitar colaboradores',
        variant: 'destructive',
      });
    },
  });

  return {
    isLoading: mutation.isPending,
    inviteEmployee: mutation.mutate,
  };
}
