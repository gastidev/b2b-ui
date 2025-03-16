// Common types used across the application
export type Transaction = {
  id: string;
  company_id: string;
  employee_id: string;
  date: Date;
  amount: number;
  currency: string;
  category_id: string;
  subcategory_id?: string;
  is_reimbursable: boolean;
  payment: boolean;
  department_id: string;
  account_id?: string;
  metadata?: Record<string, string>;
  created_at: Date;
  updated_at: Date;
  // These are for display purposes only
  description: string;
  origin: 'whatsapp' | 'web';
  type: 'Gasto' | 'Ingreso';
  category: string;
  area: string;
  budget: string;
  tag: string;
  collaborator: string;
  provider_id?: string;
  provider?: string;
};

export type Department = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type BudgetItem = {
  id: string;
  department_id: string;
  category_id: string;
  initial_amount: number;
  remaining_amount: number;
  created_at: Date;
  updated_at: Date;
};

export type Account = {
  id: string;
  name: string;
  initial_balance: number;
  remaining_balance: number;
  created_at: Date;
  updated_at: Date;
};
