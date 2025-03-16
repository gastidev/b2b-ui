import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingLayout } from './layout';
import { registerUser } from '@/lib/data/mock-auth';

export function EmployeeDetailsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    alias: '',
    cbu: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get company ID from URL params or session storage
    const companyId =
      sessionStorage.getItem('invitedCompanyId') || '1'; // Hardcoded for demo

    // Register the employee
    const user = registerUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email:
        sessionStorage.getItem('invitedEmail') ||
        'employee@demo.com', // Hardcoded for demo
      role: 'employee',
      companyId,
    });

    // Store user data in session storage
    sessionStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );

    // Navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <OnboardingLayout step={1} totalSteps={1}>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>
            Completa tus datos
          </h1>
          <p className='text-muted-foreground'>
            Ingresa tu información personal y de cobro
          </p>
        </div>

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
            Finalizar
          </Button>
        </form>
      </div>
    </OnboardingLayout>
  );
}
