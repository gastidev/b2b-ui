import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingLayout } from './layout';
import {
  Plus,
  X,
  Check,
  XCircle,
  Loader2,
} from 'lucide-react';
import { useEmployeeInvitation } from '../auth/hooks';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { useOnboardingStore } from './store/onboarding.store';

export function InvitePage() {
  const navigate = useNavigate();
  const { inviteEmployee, isLoading: globalLoading } =
    useEmployeeInvitation();
  const [emails, setEmails] = useState<
    Array<{
      first_name: string;
      last_name: string;
      email: string;
      status: 'pending' | 'success' | 'error' | 'loading';
      error?: string;
    }>
  >([
    {
      first_name: '',
      last_name: '',
      email: '',
      status: 'pending',
    },
  ]);
  const { companyData } = useOnboardingStore();
  const companyId = companyData?.id;

  const handleAddEmail = () => {
    setEmails((prev) => [
      ...prev,
      {
        first_name: '',
        last_name: '',
        email: '',
        status: 'pending',
      },
    ]);
  };

  const handleRemoveEmail = (index: number) => {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: 'first_name' | 'last_name' | 'email',
    value: string
  ) => {
    setEmails((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value, status: 'pending' }
          : item
      )
    );
  };

  const handleEmailSubmit = async (index: number) => {
    const emailData = emails[index];
    if (
      !emailData.email.trim() ||
      !emailData.first_name.trim() ||
      !emailData.last_name.trim() ||
      emailData.status === 'success' ||
      !companyId ||
      emailData.status === 'loading'
    )
      return;

    setEmails((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: 'loading' } : item
      )
    );

    try {
      await inviteEmployee({
        companyId,
        email: emailData.email,
        firstName: emailData.first_name,
        lastName: emailData.last_name,
      });
      setEmails((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, status: 'success' }
            : item
        )
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Error al enviar la invitación';
      setEmails((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                status: 'error',
                error: errorMessage,
              }
            : item
        )
      );
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEmailSubmit(index);
    }
  };

  const handleRevokeInvitation = (index: number) => {
    // Aquí implementarías la lógica para revocar la invitación
    setEmails((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: 'pending' } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty emails and already successful invitations
    const pendingEmails = emails.filter(
      (email) =>
        email.email.trim() &&
        email.first_name.trim() &&
        email.last_name.trim() &&
        email.status !== 'success'
    );

    if (pendingEmails.length > 0) {
      // Enviar las invitaciones pendientes una por una
      await Promise.all(
        pendingEmails.map((emailData) =>
          handleEmailSubmit(emails.indexOf(emailData))
        )
      );
    }

    // Solo redirigir después de procesar todas las invitaciones
    const userStr = sessionStorage.getItem(
      'onboardingUser'
    );
    if (userStr) {
      sessionStorage.setItem('currentUser', userStr);
      sessionStorage.removeItem('onboardingUser');
    }
    navigate('/dashboard');
  };

  const handleSkip = () => {
    // Store user data in session storage before navigating
    const userStr = sessionStorage.getItem(
      'onboardingUser'
    );
    if (userStr) {
      sessionStorage.setItem('currentUser', userStr);
      sessionStorage.removeItem('onboardingUser');
    }
    navigate('/dashboard');
  };

  return (
    <OnboardingLayout step={3} totalSteps={3}>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold'>
            Invita a tu equipo
          </h1>
          <p className='text-muted-foreground'>
            Opcional: Invita a los miembros de tu equipo
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-4'>
            {emails.map((emailData, index) => (
              <div key={index} className='space-y-2'>
                {index === 0 && (
                  <div className='grid grid-cols-3 gap-2'>
                    <Label>Nombre</Label>
                    <Label>Apellido</Label>
                    <Label>Email</Label>
                  </div>
                )}
                <div className='flex gap-2'>
                  <div className='grid grid-cols-3 gap-2 flex-1'>
                    <Input
                      type='text'
                      value={emailData.first_name}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'first_name',
                          e.target.value
                        )
                      }
                      placeholder='Nombre'
                      disabled={
                        emailData.status === 'loading' ||
                        emailData.status === 'success'
                      }
                    />
                    <Input
                      type='text'
                      value={emailData.last_name}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'last_name',
                          e.target.value
                        )
                      }
                      placeholder='Apellido'
                      disabled={
                        emailData.status === 'loading' ||
                        emailData.status === 'success'
                      }
                    />
                    <Input
                      type='email'
                      value={emailData.email}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'email',
                          e.target.value
                        )
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(e, index)
                      }
                      placeholder='colaborador@empresa.com'
                      disabled={
                        emailData.status === 'loading' ||
                        emailData.status === 'success'
                      }
                    />
                  </div>

                  {emailData.status === 'pending' &&
                    emailData.email && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                          handleEmailSubmit(index)
                        }
                        disabled={globalLoading}
                      >
                        <Check className='h-4 w-4' />
                      </Button>
                    )}

                  {emailData.status === 'loading' && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      disabled
                    >
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </Button>
                  )}

                  {emailData.status === 'success' && (
                    <>
                      <Check className='h-4 w-4 text-green-500' />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <XCircle
                              className='h-4 w-4 text-red-500 cursor-pointer'
                              onClick={() =>
                                handleRevokeInvitation(
                                  index
                                )
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            Revocar invitación
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  )}

                  {emailData.status === 'error' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() =>
                              handleEmailSubmit(index)
                            }
                            className='text-red-500'
                          >
                            <XCircle className='h-4 w-4' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {emailData.error ||
                            'Error al enviar la invitación'}
                          <br />
                          Click para reintentar
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  {index > 0 &&
                    emailData.status !== 'loading' && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                          handleRemoveEmail(index)
                        }
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>

          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleAddEmail}
            disabled={globalLoading}
          >
            <Plus className='h-4 w-4 mr-2' />
            Agregar otro email
          </Button>

          <div className='flex gap-4'>
            <Button
              type='button'
              variant='ghost'
              className='flex-1'
              onClick={handleSkip}
              disabled={globalLoading}
            >
              Omitir
            </Button>
            <Button
              type='submit'
              className='flex-1'
              disabled={globalLoading}
            >
              Finalizar y continuar
            </Button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
}
