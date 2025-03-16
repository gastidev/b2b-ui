import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Edit,
  Trash,
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  Mail,
  Phone,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import { useDepartments } from '../../hooks/use-departments';
import { useState } from 'react';
import { AssignEmployeeDialog } from '../assign-employee-dialog';
import { EditDepartmentDialog } from '../edit-department-dialog';
import { DeleteDepartmentDialog } from '../delete-department-dialog';
import { RemoveEmployeeDialog } from '../remove-employee-dialog';
import { Department } from '../../services/departments.service';
import { Employee } from '@/lib/data';

export function DepartmentsTable() {
  const { departments, isLoading } = useDepartments();
  const [expandedDepartments, setExpandedDepartments] =
    useState<{ [key: string]: boolean }>({});

  // Diálogo de asignación
  const [showAssignDialog, setShowAssignDialog] =
    useState(false);
  const [
    selectedDepartmentForAssign,
    setSelectedDepartmentForAssign,
  ] = useState<Department | null>(null);

  // Diálogo de edición
  const [showEditDialog, setShowEditDialog] =
    useState(false);
  const [
    selectedDepartmentForEdit,
    setSelectedDepartmentForEdit,
  ] = useState<Department | null>(null);

  // Diálogo de eliminación
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);
  const [
    selectedDepartmentForDelete,
    setSelectedDepartmentForDelete,
  ] = useState<Department | null>(null);

  // Diálogo de remover empleado
  const [showRemoveDialog, setShowRemoveDialog] =
    useState(false);
  const [
    selectedEmployeeForRemove,
    setSelectedEmployeeForRemove,
  ] = useState<Employee | null>(null);

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentId]: !prev[departmentId],
    }));
  };

  const handleOpenAssignDialog = (
    department: Department
  ) => {
    if (!department.id) return;
    setSelectedDepartmentForAssign(department);
    setShowAssignDialog(true);
  };

  if (isLoading) {
    return <div>Cargando departamentos...</div>;
  }

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow className='bg-muted/50'>
              <TableHead className='font-semibold'>
                Nombre
              </TableHead>
              <TableHead className='font-semibold'>
                Empleados
              </TableHead>
              <TableHead className='text-right font-semibold'>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <>
                <TableRow
                  key={department.id}
                  className='hover:bg-muted/50 cursor-pointer transition-colors'
                  onClick={() =>
                    toggleDepartment(department.id!)
                  }
                >
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      {expandedDepartments[
                        department.id!
                      ] ? (
                        <ChevronDown className='h-4 w-4 text-muted-foreground transition-transform' />
                      ) : (
                        <ChevronRight className='h-4 w-4 text-muted-foreground transition-transform' />
                      )}
                      <Building2 className='h-4 w-4 text-muted-foreground' />
                      <span className='font-medium'>
                        {department.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Users className='h-4 w-4 text-muted-foreground' />
                      <span>
                        {department.collaborators?.length ||
                          0}{' '}
                        colaboradores
                      </span>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='hover:bg-muted'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAssignDialog(
                            department
                          );
                        }}
                      >
                        <UserPlus className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='hover:bg-muted'
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDepartmentForEdit(
                            department
                          );
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='hover:bg-destructive/10 hover:text-destructive'
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDepartmentForDelete(
                            department
                          );
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedDepartments[department.id!] &&
                  department.collaborators?.map(
                    (employee) => (
                      <TableRow
                        key={employee.id}
                        className='bg-muted/30 hover:bg-muted/50 transition-colors'
                      >
                        <TableCell>
                          <div className='flex items-center gap-2 pl-8'>
                            <Users className='h-4 w-4 text-muted-foreground' />
                            <span>
                              {
                                employee.user.profile
                                  ?.first_name
                              }{' '}
                              {
                                employee.user.profile
                                  ?.last_name
                              }
                            </span>
                          </div>
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
                        <TableCell className='text-right'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='hover:bg-destructive/10 hover:text-destructive'
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEmployeeForRemove(
                                employee
                              );
                              setShowRemoveDialog(true);
                            }}
                          >
                            <UserMinus className='h-4 w-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <AssignEmployeeDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        departmentId={selectedDepartmentForAssign?.id ?? ''}
        currentEmployees={
          selectedDepartmentForAssign?.collaborators ?? []
        }
      />

      <EditDepartmentDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        department={selectedDepartmentForEdit}
      />

      <DeleteDepartmentDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        department={selectedDepartmentForDelete}
      />

      <RemoveEmployeeDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        employee={selectedEmployeeForRemove}
      />
    </>
  );
}
