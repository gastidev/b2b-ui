import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDepartmentsState } from '@/pages/departments/hooks/use-departments-state';
import { useInviteEmployee } from '../../hooks/use-invite-employee';

interface EmployeeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  companyId?: string;
}

export function EmployeeFormDialog({
  open,
  onOpenChange,
  title,
  description,
  companyId,
}: EmployeeFormDialogProps) {
  const {
    invites,
    handleAddInvite,
    handleRemoveInvite,
    handleInviteInputChange,
    sendInvitation,
    sendAllInvitations,
    resetInvites,
  } = useInviteEmployee(companyId);

  const { departments } = useDepartmentsState();

  const handleClose = () => {
    onOpenChange(false);
    resetInvites();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {invites.map((invite, index) => (
            <div
              key={index}
              className='space-y-4 rounded-lg border p-4 relative'
            >
              {invites.length > 1 && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-2 top-2 h-6 w-6'
                  onClick={() => handleRemoveInvite(index)}
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Eliminar</span>
                </Button>
              )}

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor={`first-name-${index}`}>
                    Nombre
                  </Label>
                  <Input
                    id={`first-name-${index}`}
                    value={invite.first_name}
                    onChange={(e) =>
                      handleInviteInputChange(
                        index,
                        'first_name',
                        e.target.value
                      )
                    }
                    disabled={invite.status === 'success'}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor={`last-name-${index}`}>
                    Apellido
                  </Label>
                  <Input
                    id={`last-name-${index}`}
                    value={invite.last_name}
                    onChange={(e) =>
                      handleInviteInputChange(
                        index,
                        'last_name',
                        e.target.value
                      )
                    }
                    disabled={invite.status === 'success'}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor={`email-${index}`}>
                  Correo electrónico
                </Label>
                <Input
                  id={`email-${index}`}
                  type='email'
                  value={invite.email}
                  onChange={(e) =>
                    handleInviteInputChange(
                      index,
                      'email',
                      e.target.value
                    )
                  }
                  disabled={invite.status === 'success'}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor={`department-${index}`}>
                    Departamento
                  </Label>
                  <Select
                    value={invite.department_id || 'none'}
                    onValueChange={(value) =>
                      handleInviteInputChange(
                        index,
                        'department_id',
                        value
                      )
                    }
                    disabled={invite.status === 'success'}
                  >
                    <SelectTrigger
                      id={`department-${index}`}
                    >
                      <SelectValue placeholder='Seleccionar departamento' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='none'>
                        Sin departamento
                      </SelectItem>
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
                <div className='space-y-2'>
                  <Label htmlFor={`role-${index}`}>
                    Rol
                  </Label>
                  <Select
                    value={invite.role || 'COLLABORATOR'}
                    onValueChange={(value) =>
                      handleInviteInputChange(
                        index,
                        'role',
                        value as 'MANAGER' | 'COLLABORATOR'
                      )
                    }
                    disabled={invite.status === 'success'}
                  >
                    <SelectTrigger id={`role-${index}`}>
                      <SelectValue placeholder='Seleccionar rol' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='COLLABORATOR'>
                        Colaborador
                      </SelectItem>
                      <SelectItem value='MANAGER'>
                        Gerente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {invite.status === 'error' && (
                <div className='text-sm text-destructive flex items-center'>
                  <XCircle className='h-4 w-4 mr-1' />
                  {invite.error}
                </div>
              )}

              <div className='flex justify-end'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={
                          invite.status === 'success'
                            ? 'outline'
                            : 'default'
                        }
                        size='sm'
                        onClick={() =>
                          sendInvitation(invite, index)
                        }
                        disabled={
                          !invite.email.trim() ||
                          !invite.first_name.trim() ||
                          !invite.last_name.trim() ||
                          invite.status === 'success' ||
                          invite.status === 'loading'
                        }
                      >
                        {invite.status === 'loading' ? (
                          <Loader2 className='h-4 w-4 animate-spin mr-2' />
                        ) : invite.status === 'success' ? (
                          <Check className='h-4 w-4 mr-2' />
                        ) : (
                          <Plus className='h-4 w-4 mr-2' />
                        )}
                        {invite.status === 'success'
                          ? 'Invitado'
                          : 'Invitar'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {invite.status === 'success'
                        ? 'Colaborador invitado exitosamente'
                        : 'Enviar invitación a este colaborador'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}

          <Button
            variant='outline'
            className='w-full'
            onClick={handleAddInvite}
          >
            <Plus className='h-4 w-4 mr-2' />
            Agregar otro colaborador
          </Button>
        </div>

        <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2'>
          <Button variant='outline' onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={async () => {
              await sendAllInvitations();
              if (
                invites.every(
                  (invite) => invite.status === 'success'
                )
              ) {
                handleClose();
              }
            }}
          >
            Invitar a todos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
