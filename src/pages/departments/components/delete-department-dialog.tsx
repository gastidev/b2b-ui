import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Department } from '../services/departments.service';
import { Loader2 } from 'lucide-react';
import { useDepartmentsMutations } from '../hooks/use-departments-mutations';

interface DeleteDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
}

export function DeleteDepartmentDialog({
  open,
  onOpenChange,
  department,
}: DeleteDepartmentDialogProps) {
  const { deleteDepartment, isLoadingDelete } =
    useDepartmentsMutations();

  const handleDelete = async () => {
    if (department?.id) {
      await deleteDepartment(department.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar departamento</DialogTitle>
          <DialogDescription>
            ¿Estás seguro que deseas eliminar el
            departamento {department?.name}? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isLoadingDelete}
          >
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
