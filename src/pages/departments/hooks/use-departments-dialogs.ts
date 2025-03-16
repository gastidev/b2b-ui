import { useState } from 'react';
import { Department } from '../services/departments.service';
import { DepartmentFormData } from './use-departments-mutations';

const initialFormData: DepartmentFormData = {
  name: '',
};

export function useDepartmentsDialogs() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] =
    useState(false);
  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);
  const [formData, setFormData] =
    useState<DepartmentFormData>(initialFormData);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setFormData({ name: department.name });
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
    setFormData(initialFormData);
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
    openEditDialog,
    openDeleteDialog,
    resetDialogs,
  };
}
