import { useState, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { departments } from '@/lib/data';
import { updateEmployee } from '../../services/employees.service';

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

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  companyId?: string;
}

// Hook interno del componente
function useEditEmployee(companyId?: string) {
  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    department_id: string | undefined;
    role: string;
  }>({
    first_name: '',
    last_name: '',
    email: '',
    department_id: '',
    role: 'COLLABORATOR',
  });

  const queryClient = useQueryClient();

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDepartmentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      department_id: value === 'none' ? undefined : value,
    }));
  };

  const prepareEmployeeForEdit = (employee: Employee) => {
    setFormData({
      first_name: employee.user.profile?.first_name || '',
      last_name: employee.user.profile?.last_name || '',
      email: employee.user.email,
      department_id: employee.department_id,
      role: employee.role || 'COLLABORATOR',
    });
  };

  const saveEmployeeChanges = async (
    employeeId: string
  ) => {
    if (!companyId) return false;

    try {
      await updateEmployee(companyId, employeeId, {
        department_id: formData.department_id,
        role: formData.role,
      });

      queryClient.invalidateQueries({
        queryKey: ['employees', companyId],
      });

      toast.success('Colaborador actualizado exitosamente');
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error al actualizar colaborador';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    formData,
    handleInputChange,
    handleDepartmentChange,
    prepareEmployeeForEdit,
    saveEmployeeChanges,
  };
}

export function EditEmployeeDialog({
  open,
  onOpenChange,
  employee,
  companyId,
}: EditEmployeeDialogProps) {
  const {
    formData,
    handleInputChange,
    handleDepartmentChange,
    prepareEmployeeForEdit,
    saveEmployeeChanges,
  } = useEditEmployee(companyId);

  // Preparar datos cuando el empleado cambia
  useEffect(() => {
    if (employee) {
      prepareEmployeeForEdit(employee);
    }
  }, [employee]);

  const handleSubmit = async () => {
    if (!employee) return;
    const success = await saveEmployeeChanges(employee.id);
    if (success) {
      onOpenChange(false);
    }
  };

  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar colaborador</DialogTitle>
          <DialogDescription>
            Modifica los datos del colaborador
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='first_name'>Nombre</Label>
            <Input
              id='first_name'
              name='first_name'
              value={formData.first_name}
              onChange={(e) =>
                handleInputChange(
                  'first_name',
                  e.target.value
                )
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='last_name'>Apellido</Label>
            <Input
              id='last_name'
              name='last_name'
              value={formData.last_name}
              onChange={(e) =>
                handleInputChange(
                  'last_name',
                  e.target.value
                )
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              disabled
            />
          </div>
          <div className='space-y-2'>
            <Label>Departamento (opcional)</Label>
            <Select
              value={formData.department_id}
              onValueChange={handleDepartmentChange}
            >
              <SelectTrigger>
                <SelectValue placeholder='Seleccionar departamento' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>
                  Sin departamento
                </SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
