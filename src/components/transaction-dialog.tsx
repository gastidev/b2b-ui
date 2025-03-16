import { useState } from 'react';
import { Transaction } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  departments,
  categories,
  providers,
} from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

interface TransactionFormData {
  description: string;
  date: string;
  type: 'Gasto' | 'Ingreso';
  amount: string; // Changed from number to string to handle input properly
  currency: string;
  category_id: string;
  department_id: string;
  employee_id: string;
  provider_id: string | null;
  is_reimbursable: boolean;
  payment: boolean;
}

const initialFormData: TransactionFormData = {
  description: '',
  date: new Date().toISOString().split('T')[0],
  type: 'Gasto',
  amount: '', // Initialize as empty string
  currency: 'ARS',
  category_id: '',
  department_id: '',
  employee_id: '',
  provider_id: null,
  is_reimbursable: false,
  payment: false,
};

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction;
  onSubmit: (transaction: Transaction) => void;
}

export function TransactionDialog({
  open,
  onOpenChange,
  transaction,
  onSubmit,
}: TransactionDialogProps) {
  const [formData, setFormData] =
    useState<TransactionFormData>(() => {
      if (transaction) {
        return {
          description: transaction.description,
          date: transaction.date
            .toISOString()
            .split('T')[0],
          type: transaction.type,
          amount: transaction.amount.toString(), // Convert number to string for input
          currency: transaction.currency,
          category_id: transaction.category_id,
          department_id: transaction.department_id,
          employee_id: transaction.employee_id,
          provider_id: transaction.provider_id || null,
          is_reimbursable: transaction.is_reimbursable,
          payment: transaction.payment || false,
        };
      }
      return initialFormData;
    });

  // Get employees for the selected department
  const departmentEmployees = [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (
    name: string,
    value: string
  ) => {
    if (name === 'department_id') {
      // Reset employee when department changes
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        employee_id: '',
      }));
    } else if (name === 'provider_id') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === 'none' ? null : value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const selectedCategory = categories.find(
      (c) => c.id === formData.category_id
    );
    const selectedDepartment = departments.find(
      (d) => d.id === formData.department_id
    );
    const selectedEmployee = [].find(
      (e) => e.id === formData.employee_id
    );
    const selectedProvider = providers.find(
      (p) => p.id === formData.provider_id
    );

    const newTransaction: Transaction = {
      id: transaction?.id || uuidv4(),
      company_id: '1', // Hardcoded for demo
      employee_id: formData.employee_id,
      description: formData.description,
      origin: 'web',
      date: new Date(formData.date),
      type: formData.type,
      amount: parseFloat(formData.amount) || 0, // Convert string to number
      currency: formData.currency,
      category_id: formData.category_id,
      category: selectedCategory?.name || '',
      department_id: formData.department_id,
      area: selectedDepartment?.name || '',
      budget: `${selectedDepartment?.name || ''} 2025`, // Simplified for demo
      tag: 'Recurrente', // Simplified for demo
      collaborator: selectedEmployee
        ? `${selectedEmployee.first_name} ${selectedEmployee.last_name}`
        : '',
      provider_id: formData.provider_id || undefined,
      provider: selectedProvider?.name,
      is_reimbursable: formData.is_reimbursable,
      payment: formData.payment,
      created_at: transaction?.created_at || new Date(),
      updated_at: new Date(),
    };

    onSubmit(newTransaction);
    onOpenChange(false);
    setFormData(initialFormData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {transaction
              ? 'Editar transacción'
              : 'Nueva transacción'}
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? 'Modifica los datos de la transacción'
              : 'Ingresa los datos de la nueva transacción'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='type'>Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  handleSelectChange('type', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar tipo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Gasto'>
                    Gasto
                  </SelectItem>
                  <SelectItem value='Ingreso'>
                    Ingreso
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input
                id='date'
                name='date'
                type='date'
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Descripción</Label>
            <Input
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Monto</Label>
              <Input
                id='amount'
                name='amount'
                type='number'
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='currency'>Moneda</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) =>
                  handleSelectChange('currency', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar moneda' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ARS'>ARS</SelectItem>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Categoría</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) =>
                  handleSelectChange('category_id', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar categoría' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Área</Label>
              <Select
                value={formData.department_id}
                onValueChange={(value) =>
                  handleSelectChange('department_id', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar área' />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={department.id}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-2'>
            <Label>Colaborador</Label>
            <Select
              value={formData.employee_id}
              onValueChange={(value) =>
                handleSelectChange('employee_id', value)
              }
              disabled={!formData.department_id}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    formData.department_id
                      ? 'Seleccionar colaborador'
                      : 'Primero selecciona un área'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {[].map((employee) => (
                  <SelectItem
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.first_name}{' '}
                    {employee.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label>Proveedor (opcional)</Label>
            <Select
              value={formData.provider_id || 'none'}
              onValueChange={(value) =>
                handleSelectChange('provider_id', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Seleccionar proveedor' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>
                  Sin proveedor
                </SelectItem>
                {providers.map((provider) => (
                  <SelectItem
                    key={provider.id}
                    value={provider.id}
                  >
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label className='flex items-center gap-2'>
              <Input
                type='checkbox'
                className='w-4 h-4'
                checked={formData.is_reimbursable}
                onChange={(e) => {
                  handleSelectChange(
                    'is_reimbursable',
                    e.target.checked.toString()
                  );
                  if (!e.target.checked) {
                    handleSelectChange('payment', 'false');
                  }
                }}
              />
              Reembolsable
            </Label>
            {formData.is_reimbursable && (
              <Label className='flex items-center gap-2 mt-2 ml-6'>
                <Input
                  type='checkbox'
                  className='w-4 h-4'
                  checked={formData.payment}
                  onChange={(e) =>
                    handleSelectChange(
                      'payment',
                      e.target.checked.toString()
                    )
                  }
                />
                Pagado
              </Label>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.employee_id}
          >
            {transaction ? 'Guardar cambios' : 'Crear'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
