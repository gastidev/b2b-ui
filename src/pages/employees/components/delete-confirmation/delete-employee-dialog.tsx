import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { deleteEmployee } from '../../services/employees.service';

interface Profile {
  first_name: string;
  last_name: string;
}

interface User {
  id: string;
  email: string;
  profile?: Profile;
}

interface Employee {
  id: string;
  user: User;
  department_id?: string;
  role?: string;
}

interface DeleteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  companyId?: string;
}

export function DeleteEmployeeDialog({
  open,
  onOpenChange,
  employee,
  companyId,
}: DeleteEmployeeDialogProps) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!employee || !companyId) return;
    try {
      await deleteEmployee(companyId, employee.id);
      queryClient.invalidateQueries({
        queryKey: ['employees', companyId],
      });
      onOpenChange(false);
      toast.success('Colaborador eliminado exitosamente');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error al eliminar colaborador';
      toast.error(errorMessage);
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar colaborador</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas eliminar a{' '}
            {employee.user.profile?.first_name}{' '}
            {employee.user.profile?.last_name}? Esta acción
            no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
