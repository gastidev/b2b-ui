import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Search,
  Trash,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useFetchEmployees } from '../../hooks/use-fetch-employees';
import { useSearch } from '@/hooks/use-search';
import { Employee } from '@/lib/data';

interface EmployeesTableProps {
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeesTable({
  onEdit,
  onDelete,
}: EmployeesTableProps) {
  const { isLoading, employees } = useFetchEmployees();

  const { term, handleSearch, data } = useSearch<Employee>(
    employees,
    [
      'role',
      'user.email',
      'user.profile.first_name',
      'user.profile.last_name',
    ]
  );

  if (employees.length === 0) {
    return (
      <div className='text-center p-8'>
        <p className='text-muted-foreground'>
          No hay colaboradores para mostrar
        </p>
      </div>
    );
  }

  return (
    <Card className='p-4 sm:p-8'>
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Buscar colaborador...'
              className='pl-10'
              value={term}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className='flex items-center justify-center p-8'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className='w-[80px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className='font-medium'>
                    {employee.user.profile?.first_name}{' '}
                    {employee.user.profile?.last_name}
                  </TableCell>
                  <TableCell>
                    {employee.user.email}
                  </TableCell>
                  <TableCell>
                    {employee.department_id ||
                      'Sin departamento'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.role === 'MANAGER'
                          ? 'default'
                          : 'outline'
                      }
                    >
                      {employee.role === 'MANAGER'
                        ? 'Gerente'
                        : 'Colaborador'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0'
                        >
                          <span className='sr-only'>
                            Abrir menú
                          </span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          onClick={() => onEdit(employee)}
                        >
                          <Pencil className='mr-2 h-4 w-4' />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(employee)}
                          className='text-destructive focus:text-destructive'
                        >
                          <Trash className='mr-2 h-4 w-4' />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}
