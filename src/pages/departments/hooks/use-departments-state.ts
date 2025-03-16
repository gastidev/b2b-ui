import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/pages/auth/store/auth.store';
import { getDepartments } from '../services/departments.service';

export function useDepartmentsState() {
  const { user } = useAuthStore();
  const companyId = user?.company_id;

  const [searchTerm, setSearchTerm] = useState('');
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
    expandedDepartments,
    toggleDepartment,
  };
}
