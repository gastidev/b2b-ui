import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Employee } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { useDepartmentsMutations } from '../hooks/use-departments-mutations';

interface RemoveEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
}

export function RemoveEmployeeDialog({
  open,
  onOpenChange,
  employee,
}: RemoveEmployeeDialogProps) {
  const { updateEmployeeDepartment, isLoadingAssign } =
    useDepartmentsMutations();

  const handleRemove = async () => {
    if (employee?.id) {
      await updateEmployeeDepartment({
        employeeId: employee.id,
        departmentId: null,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover colaborador</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas remover a{' '}
            {employee?.user.profile?.first_name}{' '}
            {employee?.user.profile?.last_name} de este
            departamento?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isLoadingAssign}
          >
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleRemove}
            disabled={isLoadingAssign}
          >
            {isLoadingAssign ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Removiendo...
              </>
            ) : (
              'Remover'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
