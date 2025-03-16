import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Plus,
  X,
  Check,
  XCircle,
  Loader2,
  Users,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDepartmentsState } from '@/pages/departments/hooks/use-departments-state';
import { useDialog } from '@/hooks/use-dialog';
import { useInviteEmployee } from '../hooks/use-invite-employee';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useMemo, useState, useEffect } from 'react';
import { EmployeeInvite } from '../domain/types';

interface InviteEmployeeDialogProps {
  companyId: string;
}

export function InviteEmployeeDialog({
  companyId,
}: InviteEmployeeDialogProps) {
  const { close, isOpen, open } = useDialog();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const {
    invites,
    handleAddInvite,
    handleRemoveInvite,
    handleInviteInputChange,
    sendInvitation,
    sendAllInvitations,
    resetInvites,
  } = useInviteEmployee(companyId);

  const { departments, isLoading: isLoadingDepartments } =
    useDepartmentsState();

  useEffect(() => {
    if (invites.length === 1) {
      setOpenItems(['item-0']);
    }
  }, [invites.length]);

  const handleKeyPress = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendInvitation(invites[index], index);
    }
  };

  // Memoize calculations to improve performance
  const {
    successCount,
    pendingCount,
    progress,
    defaultOpenItems,
  } = useMemo(() => {
    const successCount = invites.filter(
      (invite) => invite.status === 'success'
    ).length;
    const pendingCount = invites.filter(
      (invite) => invite.status === 'pending'
    ).length;
    const progress = (successCount / invites.length) * 100;
    const defaultOpenItems = invites
      .map((invite, index) =>
        invite.status === 'pending' ? `item-${index}` : null
      )
      .filter(Boolean) as string[];

    return {
      successCount,
      pendingCount,
      progress,
      defaultOpenItems,
    };
  }, [invites]);

  const handleClose = () => {
    resetInvites();
    close();
  };

  const handleSendInvitation = async (
    invite: EmployeeInvite,
    index: number
  ) => {
    await sendInvitation(invite, index);
    setOpenItems((prev) =>
      prev.filter((item) => item !== `item-${index}`)
    );
  };

  const handleAddInviteAndOpen = () => {
    const newIndex = invites.length;
    handleAddInvite();
    setOpenItems((prev) => [...prev, `item-${newIndex}`]);
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={open}
          className='flex-1 sm:flex-none'
        >
          <Users className='mr-2 h-4 w-4' />
          Invitar colaboradores
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>Invitar colaboradores</DialogTitle>
          <DialogDescription>
            Invita a colaboradores a tu empresa. Puedes
            agregar múltiples colaboradores a la vez.
          </DialogDescription>
        </DialogHeader>

        {invites.length > 0 && (
          <div className='mb-4'>
            <div className='flex justify-between text-sm mb-2'>
              <span>Progreso de invitaciones</span>
              <span>
                {successCount} de {invites.length} enviadas
              </span>
            </div>
            <Progress value={progress} className='h-2' />
          </div>
        )}

        <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'>
          <Accordion
            type='multiple'
            className='space-y-4'
            defaultValue={defaultOpenItems}
            value={openItems}
            onValueChange={setOpenItems}
          >
            {invites.map((invite, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='border rounded-lg overflow-hidden'
              >
                <div className='flex items-center justify-between p-4 w-full'>
                  <div className='flex items-center gap-4 flex-1'>
                    <div className='flex-1'>
                      <AccordionTrigger className='hover:no-underline [&[data-state=open]>svg]:rotate-180'>
                        <div className='flex items-center gap-4'>
                          <div className='flex flex-col items-start'>
                            <div className='font-medium'>
                              {invite.first_name ||
                              invite.last_name
                                ? `${
                                    invite.first_name || ''
                                  } ${
                                    invite.last_name || ''
                                  }`
                                : 'Nuevo colaborador'}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {invite.email || 'Sin email'}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                    </div>

                    <div className='flex items-center gap-2'>
                      <div className='h-8 flex items-center'>
                        {invite.status === 'success' && (
                          <div className='flex items-center gap-2 text-sm text-green-500'>
                            <Check className='h-4 w-4' />
                            <span>Enviada</span>
                          </div>
                        )}

                        {invite.status === 'loading' && (
                          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Loader2 className='h-4 w-4 animate-spin' />
                            <span>Enviando...</span>
                          </div>
                        )}

                        {invite.status === 'error' && (
                          <div className='flex items-center gap-2 text-sm text-red-500'>
                            <XCircle className='h-4 w-4' />
                            <span>Error</span>
                          </div>
                        )}

                        {invite.status === 'pending' && (
                          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <span>Pendiente</span>
                          </div>
                        )}
                      </div>

                      {index > 0 &&
                        invite.status !== 'loading' && (
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveInvite(index);
                            }}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        )}
                    </div>
                  </div>
                </div>

                <AccordionContent>
                  <div className='px-4 pb-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <Label>Nombre</Label>
                          <Input
                            value={invite.first_name}
                            onChange={(e) =>
                              handleInviteInputChange(
                                index,
                                'first_name',
                                e.target.value
                              )
                            }
                            placeholder='Nombre'
                            disabled={
                              invite.status === 'loading' ||
                              invite.status === 'success'
                            }
                          />
                        </div>

                        <div className='space-y-2'>
                          <Label>Apellido</Label>
                          <Input
                            value={invite.last_name}
                            onChange={(e) =>
                              handleInviteInputChange(
                                index,
                                'last_name',
                                e.target.value
                              )
                            }
                            placeholder='Apellido'
                            disabled={
                              invite.status === 'loading' ||
                              invite.status === 'success'
                            }
                          />
                        </div>

                        <div className='space-y-2'>
                          <Label>Email</Label>
                          <Input
                            type='email'
                            value={invite.email}
                            onChange={(e) =>
                              handleInviteInputChange(
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
                              invite.status === 'loading' ||
                              invite.status === 'success'
                            }
                          />
                        </div>
                      </div>

                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <Label>Departamento</Label>
                          <Select
                            value={invite.department_id}
                            onValueChange={(value) =>
                              handleInviteInputChange(
                                index,
                                'department_id',
                                value
                              )
                            }
                            disabled={
                              invite.status === 'loading' ||
                              invite.status === 'success' ||
                              isLoadingDepartments
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Seleccionar departamento' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='none'>
                                Sin departamento
                              </SelectItem>
                              {departments.map((dept) => (
                                <SelectItem
                                  key={dept.id}
                                  value={dept.id || ''}
                                >
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='space-y-2'>
                          <Label>Rol</Label>
                          <Select
                            value={
                              invite.role || 'COLLABORATOR'
                            }
                            onValueChange={(value) =>
                              handleInviteInputChange(
                                index,
                                'role',
                                value
                              )
                            }
                            disabled={
                              invite.status === 'loading' ||
                              invite.status === 'success'
                            }
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Seleccionar rol' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='COLLABORATOR'>
                                Colaborador
                              </SelectItem>
                              <SelectItem value='MANAGER'>
                                Manager
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center justify-center border-t mt-4 pt-4'>
                      {invite.status === 'loading' && (
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <Loader2 className='h-4 w-4 animate-spin' />
                          <span>
                            Enviando invitación...
                          </span>
                        </div>
                      )}

                      {invite.status === 'error' && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='flex items-center gap-2 text-sm text-red-500'>
                              <XCircle className='h-4 w-4' />
                              <span>
                                Error al enviar - Click para
                                reintentar
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {invite.error ||
                                'Error al agregar colaborador'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {invite.status === 'pending' &&
                        invite.email && (
                          <Button
                            type='button'
                            onClick={() =>
                              handleSendInvitation(
                                invites[index],
                                index
                              )
                            }
                            size='default'
                            className='gap-2'
                          >
                            <Check className='h-4 w-4' />
                            Enviar invitación
                          </Button>
                        )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={handleAddInviteAndOpen}
          >
            <Plus className='mr-2 h-4 w-4' />
            Agregar otro colaborador
          </Button>
        </div>

        <DialogFooter className='mt-6'>
          <div className='flex flex-col items-center gap-2 w-full'>
            <Button
              type='button'
              onClick={() => {
                if (pendingCount > 0) {
                  sendAllInvitations();
                }
                handleClose();
              }}
              className='w-full sm:w-auto'
              size='lg'
            >
              {pendingCount > 0 ? (
                <>
                  Enviar {pendingCount} invitación
                  {pendingCount !== 1 && 'es'} pendiente
                  {pendingCount !== 1 && 's'}
                </>
              ) : (
                'Cerrar'
              )}
            </Button>
            <span className='text-sm text-muted-foreground'>
              {pendingCount > 0
                ? 'Se enviará un correo a cada colaborador con las instrucciones'
                : 'Todas las invitaciones han sido enviadas'}
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
