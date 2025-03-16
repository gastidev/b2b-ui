import { z } from 'zod';

export const managerSchema = z
  .object({
    first_name: z.string().min(1, 'El nombre es requerido'),
    last_name: z
      .string()
      .min(1, 'El apellido es requerido'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(
        8,
        'La contraseña debe tener al menos 8 caracteres'
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    }
  );

export const invitationSchema = z
  .object({
    email: z
      .string()
      .refine((email) => email.includes('@'), {
        message: 'El email debe ser válido',
      }),
    first_name: z.string().min(1, 'El nombre es requerido'),
    last_name: z
      .string()
      .min(1, 'El apellido es requerido'),
    phone: z.string().min(1, 'El teléfono es requerido'),
    password: z
      .string()
      .min(
        8,
        'La contraseña debe tener al menos 8 caracteres'
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    }
  );

export const companySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  identifier: z.string().min(1, 'El CUIT es requerido'),
});

export type ManagerFormData = z.infer<typeof managerSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type InvitationFormData = z.infer<
  typeof invitationSchema
>;
