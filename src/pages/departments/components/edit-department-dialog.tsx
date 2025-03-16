import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Department } from '../services/departments.service';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useDepartmentsMutations } from '../hooks/use-departments-mutations';

interface EditDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
}

export function EditDepartmentDialog({
  open,
  onOpenChange,
  department,
}: EditDepartmentDialogProps) {
  const [name, setName] = useState('');
  const { updateDepartment, isLoadingEdit } =
    useDepartmentsMutations();

  useEffect(() => {
    if (department) {
      setName(department.name);
    }
  }, [department]);

  const handleSubmit = async () => {
    if (department?.id && name.trim()) {
      await updateDepartment({
        id: department.id,
        department: { name: name.trim() },
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar departamento</DialogTitle>
          <DialogDescription>
            Modifica el nombre del departamento
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nombre del departamento'
              disabled={isLoadingEdit}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isLoadingEdit}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoadingEdit}
          >
            {isLoadingEdit ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
