import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z
    .string()
    .min(
      10,
      'La descripción debe tener al menos 10 caracteres'
    ),
});

interface CreateDepartmentDialogProps {
  companyId: string;
}

export function CreateDepartmentDialog({
  companyId,
}: CreateDepartmentDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    // TODO: Implementar la creación del departamento
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Crear Departamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Crear Nuevo Departamento
          </DialogTitle>
          <DialogDescription>
            Ingresa la información del nuevo departamento
            para tu empresa.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del Departamento
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='ej. Recursos Humanos'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe las funciones principales del departamento'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Crear Departamento
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
