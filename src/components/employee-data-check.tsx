import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmployeeDataCheckProps {
  onComplete: () => void;
}

export function EmployeeDataCheck({
  onComplete,
}: EmployeeDataCheckProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    alias: '',
    cbu: '',
  });

  useEffect(() => {
    // Check if user data exists in session storage
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) return;

    const user = JSON.parse(userStr);

    // Check if required fields are missing
    if (!user.phone || !user.alias || !user.cbu) {
      setOpen(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update user data in session storage
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) return;

    const user = JSON.parse(userStr);
    const updatedUser = {
      ...user,
      ...formData,
    };
    sessionStorage.setItem(
      'currentUser',
      JSON.stringify(updatedUser)
    );

    setOpen(false);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Completa tus datos</DialogTitle>
          <DialogDescription>
            Necesitamos algunos datos adicionales para
            continuar
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>Nombre</Label>
              <Input
                id='firstName'
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>Apellido</Label>
              <Input
                id='lastName'
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Teléfono</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='+54 9 11 1234-5678'
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='alias'>Alias de pago</Label>
            <Input
              id='alias'
              placeholder='alias.de.pago'
              value={formData.alias}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  alias: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='cbu'>CBU</Label>
            <Input
              id='cbu'
              placeholder='0000000000000000000000'
              value={formData.cbu}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cbu: e.target.value,
                }))
              }
              required
            />
          </div>

          <Button type='submit' className='w-full'>
            Guardar y continuar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
