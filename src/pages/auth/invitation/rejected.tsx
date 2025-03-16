import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  UserX,
  Loader2,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useRejectedInvitation } from '../hooks/use-rejected-invitation';
import { useRejectInvitation } from '../hooks/use-reject-invitation';

export function RejectedInvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { isLoading, error, data } =
    useRejectedInvitation(token);
  const rejectMutation = useRejectInvitation(token);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8 shadow-lg border-muted/30'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center'>
              <Loader2 className='h-8 w-8 text-primary animate-spin' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Cargando información
            </h1>
            <p className='text-muted-foreground text-base'>
              Por favor, espera mientras cargamos los datos
              de la invitación.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8 shadow-lg border-muted/30'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center'>
              <UserX className='h-8 w-8 text-destructive' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Invitación inválida
            </h1>
            <p className='text-muted-foreground text-base'>
              El enlace de invitación es inválido o ha
              expirado.
            </p>
            <Button
              variant='default'
              size='lg'
              className='mt-4 w-full'
              onClick={() =>
                (window.location.href = '/auth/login')
              }
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Ir a iniciar sesión
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (rejectMutation.isSuccess) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8 shadow-lg border-muted/30'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center'>
              <UserX className='h-8 w-8 text-destructive' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Invitación rechazada
            </h1>
            <p className='text-muted-foreground text-base'>
              Has rechazado exitosamente la invitación para
              unirte a{' '}
              <span className='font-medium'>
                {data?.company_name}
              </span>
              .
            </p>
            <Button
              variant='default'
              size='lg'
              className='mt-4 w-full'
              onClick={() =>
                (window.location.href = '/auth/login')
              }
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Ir a iniciar sesión
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <Card className='w-full max-w-md p-8 shadow-lg border-muted/30'>
        <div className='flex flex-col items-center text-center space-y-6'>
          <div className='w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center'>
            <AlertTriangle className='h-8 w-8 text-amber-500' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>
              ¿Rechazar invitación?
            </h1>
            <p className='text-muted-foreground text-base'>
              Estás a punto de rechazar la invitación para
              unirte a{' '}
              <span className='font-medium text-foreground'>
                {data?.company_name}
              </span>
              .
            </p>
          </div>
          <div className='flex flex-col gap-4 w-full mt-4'>
            <Button
              variant='destructive'
              size='lg'
              className='w-full'
              onClick={() => rejectMutation.mutate()}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Procesando...
                </>
              ) : (
                'Confirmar rechazo'
              )}
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='w-full'
              asChild
            >
              <Link
                to={`/invitation/accept?token=${token}`}
              >
                <CheckCircle className='mr-2 h-5 w-5' />
                Aceptar invitación en su lugar
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='mt-2'
              onClick={() =>
                (window.location.href = '/auth/login')
              }
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Volver a inicio de sesión
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
