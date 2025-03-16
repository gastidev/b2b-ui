import { User } from './auth';

// Re-export everything from the data folder
export * from './data/index';

export interface Employee {
  id: string;
  company_id: string;
  user_id: string;
  status: string;
  role: string;
  department_id: string;
  alias?: string;
  cbu?: string;

  user: User
}
