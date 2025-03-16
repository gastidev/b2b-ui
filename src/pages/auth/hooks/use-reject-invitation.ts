import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { rejectInvitation } from '../services/invitation.service';

export function useRejectInvitation(token: string | null) {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => rejectInvitation(token || ''),
    onSuccess: () => {
      toast({
        title: 'Invitación rechazada',
        description:
          'Has rechazado la invitación exitosamente.',
      });
      navigate('/auth/login');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Error al rechazar la invitación',
        variant: 'destructive',
      });
    },
  });
}
