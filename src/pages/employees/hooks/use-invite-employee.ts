import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { inviteEmployee } from '../services/employees.service';
import { EmployeeInvite } from '../domain/types';

export function useInviteEmployee(companyId?: string) {
  const [invites, setInvites] = useState<EmployeeInvite[]>([
    {
      first_name: '',
      last_name: '',
      email: '',
      department_id: '',
      role: 'COLLABORATOR',
      status: 'pending',
    },
  ]);

  const queryClient = useQueryClient();

  const handleAddInvite = () => {
    setInvites((prev) => [
      ...prev,
      {
        first_name: '',
        last_name: '',
        email: '',
        department_id: '',
        role: 'COLLABORATOR',
        status: 'pending',
      },
    ]);
  };

  const handleRemoveInvite = (index: number) => {
    setInvites((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleInviteInputChange = (
    index: number,
    field: keyof Omit<EmployeeInvite, 'status' | 'error'>,
    value: string
  ) => {
    setInvites((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value, status: 'pending' }
          : item
      )
    );
  };

  const sendInvitation = async (
    invite: EmployeeInvite,
    index: number
  ) => {
    if (
      !invite.email.trim() ||
      !invite.first_name.trim() ||
      !invite.last_name.trim() ||
      invite.status === 'success' ||
      !companyId ||
      invite.status === 'loading'
    )
      return;

    setInvites((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: 'loading' } : item
      )
    );

    try {
      await inviteEmployee({
        companyId,
        email: invite.email.trim(),
        firstName: invite.first_name.trim(),
        lastName: invite.last_name.trim(),
        departmentId:
          invite.department_id === 'none'
            ? undefined
            : invite.department_id,
        role: invite.role || 'COLLABORATOR',
      });

      setInvites((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, status: 'success' }
            : item
        )
      );

      queryClient.invalidateQueries({
        queryKey: ['employees'],
      });
      toast.success('Colaborador invitado exitosamente');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error al invitar colaborador';
      setInvites((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                status: 'error',
                error: errorMessage,
              }
            : item
        )
      );
    }
  };

  const sendAllInvitations = async () => {
    const pendingInvites = invites.filter(
      (invite) =>
        invite.email.trim() &&
        invite.first_name.trim() &&
        invite.last_name.trim() &&
        invite.status !== 'success'
    );

    if (pendingInvites.length > 0) {
      await Promise.all(
        pendingInvites.map((invite) =>
          sendInvitation(invite, invites.indexOf(invite))
        )
      );
    }
  };

  const resetInvites = () => {
    setInvites([
      {
        first_name: '',
        last_name: '',
        email: '',
        department_id: '',
        role: 'COLLABORATOR',
        status: 'pending',
      },
    ]);
  };

  return {
    invites,
    handleAddInvite,
    handleRemoveInvite,
    handleInviteInputChange,
    sendInvitation,
    sendAllInvitations,
    resetInvites,
  };
}
