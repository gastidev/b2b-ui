import { useState } from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Mail, Phone, Loader2 } from 'lucide-react';
import { Employee } from '@/lib/data';
import { useAvailableEmployees } from '../hooks/use-available-employees';
import { useDepartmentsMutations } from '../hooks/use-departments-mutations';

interface AssignEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
  currentEmployees: Employee[];
}

export function AssignEmployeeDialog({
  open,
  onOpenChange,
  departmentId,
  currentEmployees,
}: AssignEmployeeDialogProps) {
  const { employees } = useAvailableEmployees();
  const { updateEmployeeDepartment } =
    useDepartmentsMutations();
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingEmployeeId, setLoadingEmployeeId] =
    useState<string | null>(null);

  const availableEmployees = employees.filter(
    (employee: Employee) =>
      !currentEmployees.some(
        (curr) => curr.id === employee.id
      ) &&
      (employee.user.profile?.first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        employee.user.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const handleAssign = async (employeeId: string) => {
    if (!departmentId || !employeeId) {
      console.error(
        'ID de departamento o empleado no válido'
      );
      return;
    }

    try {
      setLoadingEmployeeId(employeeId);
      await updateEmployeeDepartment({
        employeeId,
        departmentId,
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error al asignar empleado:', error);
    } finally {
      setLoadingEmployeeId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Asignar colaborador</DialogTitle>
          <DialogDescription>
            Selecciona el colaborador que deseas asignar a
            esta área
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Buscar colaborador...'
              className='pl-10'
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              disabled={!!loadingEmployeeId}
            />
          </div>

          <div
            className='rounded-md border overflow-auto'
            style={{ maxHeight: '400px' }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className='w-[100px]'>
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className='text-center text-muted-foreground py-8'
                    >
                      No se encontraron colaboradores
                      disponibles
                    </TableCell>
                  </TableRow>
                ) : (
                  availableEmployees.map(
                    (employee: Employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <span className='font-medium'>
                            {
                              employee.user.profile
                                ?.first_name
                            }{' '}
                            {
                              employee.user.profile
                                ?.last_name
                            }
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-1'>
                              <Mail className='h-4 w-4 text-muted-foreground' />
                              {employee.user.email}
                            </div>
                            {employee.user.phone && (
                              <div className='flex items-center gap-1'>
                                <Phone className='h-4 w-4 text-muted-foreground' />
                                {employee.user.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size='sm'
                            onClick={() =>
                              handleAssign(employee.id)
                            }
                            disabled={
                              loadingEmployeeId ===
                              employee.id
                            }
                          >
                            {loadingEmployeeId ===
                            employee.id ? (
                              <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Asignando...
                              </>
                            ) : (
                              'Asignar'
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={!!loadingEmployeeId}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
