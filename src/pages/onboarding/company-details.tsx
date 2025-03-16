import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingLayout } from './layout';
import { useCompanyRegistration } from '../auth/hooks';

export function CompanyDetailsPage() {
  const navigate = useNavigate();
  const { form, isLoading, onSubmit } =
    useCompanyRegistration();

  const { register } = form;

  return (
    <OnboardingLayout step={2} totalSteps={3}>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>
            Datos de la empresa
          </h1>
          <p className='text-muted-foreground'>
            Ingresa la información de tu empresa
          </p>
        </div>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>
              Nombre de la empresa
            </Label>
            <Input id='name' {...register('name')} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='identifier'>
              Identificador fiscal
            </Label>
            <Input
              id='identifier'
              {...register('identifier')}
            />
          </div>

          <div className='flex gap-4'>
            <Button
              type='button'
              variant='outline'
              className='flex-1'
              onClick={() => navigate('/onboarding/user')}
              disabled={isLoading}
            >
              Atrás
            </Button>
            <Button
              type='submit'
              className='flex-1'
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Continuar'}
            </Button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}
