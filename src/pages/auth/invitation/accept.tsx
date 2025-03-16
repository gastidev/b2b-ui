import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  UserPlus,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useInvitation } from '../hooks/use-invitation';
import { Countdown } from '@/components/ui/countdown';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export function AcceptInvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    form,
    isAcceptLoading,
    isRejectLoading,
    onAccept,
    onReject,
    invitation,
  } = useInvitation(token || '');

  if (!token) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center'>
              <UserPlus className='h-6 w-6 text-destructive' />
            </div>
            <h1 className='text-2xl font-bold'>
              Invitación inválida
            </h1>
            <p className='text-muted-foreground'>
              El enlace de invitación es inválido o ha
              expirado.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
              <Loader2 className='h-6 w-6 text-primary animate-spin' />
            </div>
            <h1 className='text-2xl font-bold'>
              Cargando invitación
            </h1>
            <p className='text-muted-foreground'>
              Por favor, espera mientras cargamos los datos
              de tu invitación.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (invitation.status === 'ACCEPTED') {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
              <CheckCircle2 className='h-6 w-6 text-primary' />
            </div>
            <h1 className='text-2xl font-bold'>
              Invitación ya aceptada
            </h1>
            <p className='text-muted-foreground'>
              Esta invitación ya ha sido aceptada
              previamente. Si necesitas acceder a tu cuenta,
              por favor inicia sesión.
            </p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() =>
                (window.location.href = '/auth/login')
              }
            >
              Ir a iniciar sesión
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (invitation.status === 'REJECTED') {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center p-4'>
        <Card className='w-full max-w-md p-8'>
          <div className='flex flex-col items-center text-center space-y-4'>
            <div className='w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center'>
              <XCircle className='h-6 w-6 text-destructive' />
            </div>
            <h1 className='text-2xl font-bold'>
              Invitación rechazada
            </h1>
            <p className='text-muted-foreground'>
              Esta invitación ha sido rechazada previamente.
              Si crees que esto fue un error, por favor
              contacta al administrador.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <Card className='w-full max-w-md p-8'>
        <div className='flex flex-col items-center text-center space-y-4 mb-8'>
          <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
            <UserPlus className='h-6 w-6 text-primary' />
          </div>
          <h1 className='text-2xl font-bold'>
            Completa tu registro
          </h1>
          <p className='text-muted-foreground'>
            Has sido invitado a unirte como colaborador. Por
            favor, completa tus datos para continuar.
          </p>
          <div className='w-full'>
            <div className='text-sm text-muted-foreground mb-2'>
              La invitación expira en:
            </div>
            <Countdown
              targetDate={new Date(invitation.expires_at)}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={onAccept} className='space-y-4'>
            <FormField
              control={form.control}
              disabled={true}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Juan'
                      {...field}
                      value={
                        field.value || invitation.email
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='first_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Juan'
                      {...field}
                      value={
                        field.value || invitation.first_name
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='last_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Pérez'
                      {...field}
                      value={
                        field.value || invitation.last_name
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirmar contraseña
                  </FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={'ar'}
                      value={field.value}
                      onChange={(phone) =>
                        field.onChange(phone)
                      }
                      inputClass='!w-full !h-10 !rounded-r-md !border !border-input !bg-transparent !pl-12 !pr-3 !py-2 !text-sm !ring-offset-background !text-foreground'
                      containerClass='!w-full'
                      buttonClass='!h-10 !border !border-input !bg-transparent !rounded-l-md !border-r-0 !px-2'
                      dropdownClass='!bg-popover !border !border-input !text-foreground !rounded-md !mt-1 !shadow-md'
                      searchClass='!bg-transparent !border !border-input !text-foreground !rounded-md !px-3 !py-2 !text-sm'
                      enableSearch={true}
                      searchPlaceholder='Buscar país...'
                      searchNotFound='País no encontrado'
                      preferredCountries={[
                        'ar',
                        'mx',
                        'es',
                        'co',
                        'pe',
                        'cl',
                      ]}
                      localization={{
                        searchPlaceholder: 'Buscar país...',
                        search: 'Buscar',
                        areaCodes: 'Códigos de área',
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-2 pt-4'>
              <Button
                type='submit'
                disabled={
                  isAcceptLoading || isRejectLoading
                }
              >
                {isAcceptLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Aceptando invitación...
                  </>
                ) : (
                  'Aceptar invitación'
                )}
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={onReject}
                disabled={
                  isAcceptLoading || isRejectLoading
                }
              >
                {isRejectLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Rechazando invitación...
                  </>
                ) : (
                  'Rechazar invitación'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
