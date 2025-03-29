import { useState } from 'react';
import { Department, Employee } from '@/lib/data';

interface DepartmentFormData {
  name: string;
  collaborators: Employee[];
}

export function useDepartmentsDialogs() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [formData, setFormData] =
    useState<DepartmentFormData>({
      name: '',
      collaborators: [],
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      collaborators: [],
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (department: Department) => {
    setSelectedDepartment(department);
    setShowDeleteDialog(true);
  };

  const resetDialogs = () => {
    setShowAddDialog(false);
    setShowEditDialog(false);
    setShowDeleteDialog(false);
    setSelectedDepartment(null);
    setFormData({
      name: '',
      collaborators: [],
    });
  };

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    showDeleteDialog,
    setShowDeleteDialog,
    formData,
    selectedDepartment,
    handleInputChange,
    handleEditDepartment,
    openDeleteDialog,
    resetDialogs,
  };
}
