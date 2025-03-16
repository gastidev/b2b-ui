import {
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { Department } from '../services/departments.service';
import { useDepartmentsState } from '../hooks/use-departments-state';

interface DepartmentsContextType {
  departments: Department[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  expandedDepartments: { [key: string]: boolean };
  toggleDepartment: (departmentId: string) => void;
}

const DepartmentsContext = createContext<
  DepartmentsContextType | undefined
>(undefined);

export function DepartmentsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useDepartmentsState();
  return (
    <DepartmentsContext.Provider value={value}>
      {children}
    </DepartmentsContext.Provider>
  );
}

export function useDepartmentsContext() {
  const context = useContext(DepartmentsContext);
  if (!context) {
    throw new Error(
      'useDepartmentsContext debe usarse dentro de un DepartmentsProvider'
    );
  }
  return context;
}
