import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuthStore } from '@/pages/auth/store/auth.store';
import { toast } from 'sonner';
import {
  createDepartment,
  updateDepartment as updateDepartmentApi,
  deleteDepartment as deleteDepartmentApi,
  updateEmployeeDepartment as updateEmployeeDepartmentApi,
} from '../services/departments.service';
import { Employee } from '@/lib/data';

export interface DepartmentFormData {
  name: string;
  collaborators: Employee[];
}

export interface UpdateDepartmentData {
  id: string;
  department: {
    name: string;
  };
}

export interface UpdateEmployeeDepartmentData {
  employeeId: string;
  departmentId: string | null;
}

export function useDepartmentsMutations() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  const createMutation = useMutation({
    mutationFn: (data: DepartmentFormData) =>
      createDepartment(companyId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
      toast.success('El área se ha creado correctamente');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'No se pudo crear el área'
      );
    },
  });

  const updateEmployeeDepartment = useMutation({
    mutationFn: (data: UpdateEmployeeDepartmentData) =>
      updateEmployeeDepartmentApi(
        companyId!,
        data.employeeId,
        data.departmentId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
    },
  });

  const updateDepartment = useMutation({
    mutationFn: (data: UpdateDepartmentData) =>
      updateDepartmentApi(
        companyId!,
        data.id,
        data.department
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: (id: string) =>
      deleteDepartmentApi(companyId!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
    },
  });

  return {
    createDepartment: createMutation.mutate,
    updateDepartment: updateDepartment.mutateAsync,
    deleteDepartment: deleteDepartment.mutateAsync,
    updateEmployeeDepartment:
      updateEmployeeDepartment.mutateAsync,
    isLoadingAssign: updateEmployeeDepartment.isPending,
    isLoadingEdit: updateDepartment.isPending,
    isLoadingDelete: deleteDepartment.isPending,
  };
}
