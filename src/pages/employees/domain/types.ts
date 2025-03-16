export interface EmployeeFormData {
  first_name: string;
  last_name: string;
  email: string;
  department_id?: string;
  role?: 'MANAGER' | 'COLLABORATOR';
}

export interface EmployeeInvite {
  first_name: string;
  last_name: string;
  email: string;
  department_id?: string;
  role?: 'MANAGER' | 'COLLABORATOR';
  status: 'pending' | 'success' | 'error' | 'loading';
  error?: string;
}

export interface InviteEmployeeParams {
  companyId: string;
  email: string;
  firstName: string;
  lastName: string;
  departmentId?: string;
  role?: 'MANAGER' | 'COLLABORATOR';
}

export interface Invitation {
  id: string;
  email: string;
  company_id: string;
  token: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  role: 'COLLABORATOR' | 'MANAGER';
  metadata: {
    first_name: string;
    last_name: string;
  };
  invited_by: string;
  created_at: string;
  expires_at: string;
  department_id?: string;
}
