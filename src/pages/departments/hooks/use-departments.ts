import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuthStore } from '@/pages/auth/store/auth.store';
import { toast } from 'sonner';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  Department,
} from '../services/departments.service';

export interface DepartmentFormData {
  name: string;
}

const initialFormData: DepartmentFormData = {
  name: '',
};

export function useDepartments() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);
  const [formData, setFormData] =
    useState<DepartmentFormData>(initialFormData);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [expandedDepartments, setExpandedDepartments] =
    useState<{ [key: string]: boolean }>({});

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ['departments', companyId],
    queryFn: () =>
      companyId
        ? getDepartments(companyId)
        : Promise.resolve([]),
    enabled: !!companyId,
  });

  const createMutation = useMutation({
    mutationFn: (data: DepartmentFormData) =>
      createDepartment(companyId!, {
        ...data,
        collaborators: [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
      setShowAddDialog(false);
      setFormData(initialFormData);
      toast.success('El área se ha creado correctamente');
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'No se pudo crear el área'
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: {
      id: string;
      department: DepartmentFormData;
    }) =>
      updateDepartment(
        companyId!,
        data.id,
        data.department
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
      setShowEditDialog(false);
      setSelectedDepartment(null);
      setFormData(initialFormData);
      toast.success(
        'El área se ha actualizado correctamente'
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'No se pudo actualizar el área'
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (departmentId: string) =>
      deleteDepartment(companyId!, departmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      });
      setShowDeleteDialog(false);
      setSelectedDepartment(null);
      toast.success(
        'El área se ha eliminado correctamente'
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'No se pudo eliminar el área'
      );
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    createMutation.mutate(formData);
  };

  const handleEdit = () => {
    if (!selectedDepartment?.id) return;
    updateMutation.mutate({
      id: selectedDepartment.id,
      department: formData,
    });
  };

  const handleDelete = () => {
    if (!selectedDepartment?.id) return;
    deleteMutation.mutate(selectedDepartment.id);
  };

  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (department: Department) => {
    setSelectedDepartment(department);
    setShowDeleteDialog(true);
  };

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentId]: !prev[departmentId],
    }));
  };

  const filteredDepartments = departments.filter(
    (department) => {
      if (!searchTerm) return true;
      return department.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
  );

  return {
    departments: filteredDepartments,
    isLoading,
    searchTerm,
    setSearchTerm,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    formData,
    selectedDepartment,
    expandedDepartments,
    handleInputChange,
    handleAdd,
    handleEdit,
    handleDelete,
    openEditDialog,
    openDeleteDialog,
    toggleDepartment,
  };
}
