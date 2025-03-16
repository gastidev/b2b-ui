import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import {
  acceptInvitation,
  rejectInvitation,
} from '../services/invitation.service';
import { invitationSchema } from '../schemas/auth.schemas';
import { useAuthStore } from '../store/auth.store';
import { getInvitation } from '../services/get-invitation.service';
import { Invitation } from '../types/invitation';
import { useEffect } from 'react';

export interface InvitationFormData {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function useInvitation(token: string) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
  });

  const invitation = useQuery<Invitation>({
    queryKey: ['invitation', token],
    queryFn: () => getInvitation(token),
  });

  useEffect(() => {
    if (invitation.data) {
      form.reset({
        ...form.getValues(),
        email: invitation.data.email || '',
        first_name: invitation.data.first_name || '',
        last_name: invitation.data.last_name || '',
      });
    }
  }, [invitation.data, form]);

  const acceptMutation = useMutation({
    mutationFn: (
      data: Omit<InvitationFormData, 'confirmPassword'>
    ) =>
      acceptInvitation({
        token,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        password: data.password,
      }),
    onSuccess: (data) => {
      setAuth({
        token: data.token,
        user: {
          ...data.user,
        },
      });
      toast({
        title: '¡Bienvenido!',
        description:
          'Tu cuenta ha sido creada exitosamente.',
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Error al aceptar la invitación',
        variant: 'destructive',
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectInvitation(token),
    onSuccess: () => {
      navigate('/invitation/rejected');
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

  return {
    form,
    isAcceptLoading: acceptMutation.isPending,
    isRejectLoading: rejectMutation.isPending,
    onAccept: form.handleSubmit((data) =>
      acceptMutation.mutate(data)
    ),
    onReject: () => rejectMutation.mutate(),
    invitation: invitation.data,
  };
}
