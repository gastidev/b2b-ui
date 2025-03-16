import { v4 as uuidv4 } from 'uuid';
import { BudgetItem } from './types';

export const budgets: BudgetItem[] = [
  {
    id: uuidv4(),
    department_id: "1", // Marketing
    category_id: "1", // Software
    initial_amount: 50000,
    remaining_amount: 38000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    department_id: "1", // Marketing
    category_id: "2", // Marketing Digital
    initial_amount: 100000,
    remaining_amount: 65000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    department_id: "2", // Ventas
    category_id: "3", // Capacitación
    initial_amount: 75000,
    remaining_amount: 50000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    department_id: "3", // Desarrollo
    category_id: "1", // Software
    initial_amount: 200000,
    remaining_amount: 155000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    department_id: "4", // Administración
    category_id: "5", // Servicios
    initial_amount: 30000,
    remaining_amount: 15000,
    created_at: new Date(),
    updated_at: new Date()
  }
];