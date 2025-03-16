import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingLayout } from './layout';
import { useManagerRegistration } from '../auth/hooks';

export function UserDetailsPage() {
  const { form, isLoading, onSubmit } =
    useManagerRegistration();
  const { register } = form;

  return (
    <OnboardingLayout step={1} totalSteps={3}>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>
            Crea tu cuenta
          </h1>
          <p className='text-muted-foreground'>
            Ingresa tus datos para comenzar
          </p>
        </div>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='first_name'>Nombre</Label>
              <Input
                id='first_name'
                {...register('first_name')}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='last_name'>Apellido</Label>
              <Input
                id='last_name'
                {...register('last_name')}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              {...register('email')}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Contraseña</Label>
            <Input
              id='password'
              type='password'
              {...register('password')}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>
              Confirmar contraseña
            </Label>
            <Input
              id='confirmPassword'
              type='password'
              {...register('confirmPassword')}
            />
          </div>

          <Button
            type='submit'
            className='w-full'
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Continuar'}
          </Button>
        </form>
      </div>
    </OnboardingLayout>
  );
}
