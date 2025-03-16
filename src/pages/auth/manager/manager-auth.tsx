import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building2,
  LogIn,
  UserPlus,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function ManagerAuthPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleStartOnboarding = () => {
    navigate('/onboarding/user');
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <Card className='w-full max-w-md p-8'>
        <div className='flex flex-col items-center text-center space-y-4 mb-8'>
          <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
            <Building2 className='h-6 w-6 text-primary' />
          </div>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              {showLogin
                ? 'Bienvenido de vuelta'
                : 'Bienvenido a Gasti'}
            </h1>
            <p className='text-base text-muted-foreground mt-2'>
              {showLogin
                ? 'Ingresa tus credenciales para continuar'
                : 'Gestiona tu restaurante de manera eficiente'}
            </p>
          </div>
        </div>

        {showLogin ? (
          <form
            onSubmit={handleLogin}
            className='space-y-6'
          >
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>
                  Correo electrónico
                </Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='tu@email.com'
                  required
                  className='w-full'
                  disabled={isLoading}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Contraseña</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder='••••••••'
                  required
                  className='w-full'
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className='text-sm text-destructive bg-destructive/10 p-3 rounded-md'>
                  {error}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-3'>
              <Button
                type='submit'
                className='w-full'
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent' />
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className='h-4 w-4 mr-2' />
                    Iniciar sesión
                  </>
                )}
              </Button>
              <Button
                type='button'
                variant='ghost'
                onClick={() => setShowLogin(false)}
                className='w-full'
                disabled={isLoading}
              >
                <ArrowLeft className='h-4 w-4 mr-2' />
                Volver
              </Button>
            </div>
          </form>
        ) : (
          <div className='flex flex-col gap-4'>
            <Button
              onClick={handleStartOnboarding}
              className='w-full'
              size='lg'
            >
              <UserPlus className='h-4 w-4 mr-2' />
              Crear una cuenta
            </Button>
            <Button
              variant='outline'
              onClick={() => setShowLogin(true)}
              className='w-full'
              size='lg'
            >
              <LogIn className='h-4 w-4 mr-2' />
              Iniciar sesión
            </Button>
            <Button
              variant='ghost'
              onClick={() => navigate('/')}
              className='w-full mt-2'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Volver al inicio
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
