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
import { EmployeeFormData } from '../hooks/use-employees';

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  formData: EmployeeFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onDepartmentChange: (value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export function EditEmployeeDialog({
  open,
  onOpenChange,
  title,
  description,
  formData,
  onInputChange,
  onDepartmentChange,
  onSubmit,
  submitLabel,
}: EditEmployeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Nombre completo</Label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={onInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={onInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Teléfono</Label>
            <Input
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='alias'>Alias de pago</Label>
            <Input
              id='alias'
              name='alias'
              value={formData.alias}
              onChange={onInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='cbu'>CBU</Label>
            <Input
              id='cbu'
              name='cbu'
              value={formData.cbu}
              onChange={onInputChange}
            />
          </div>
          <div className='space-y-2'>
            <Label>Departamento (opcional)</Label>
            <Select
              value={formData.department_id}
              onValueChange={onDepartmentChange}
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
          <Button onClick={onSubmit}>{submitLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
