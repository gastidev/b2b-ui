import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './types';

export const transactions: Transaction[] = [
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "1",
    description: 'Licencias software desarrollo',
    origin: 'web',
    date: new Date('2025-01-31'),
    type: 'Gasto',
    amount: 150000,
    currency: 'ARS',
    category_id: "1",
    category: 'Software',
    department_id: "3",
    area: 'Desarrollo',
    budget: 'Desarrollo 2025',
    tag: 'Recurrente',
    collaborator: 'Juan Pérez',
    provider_id: "1", // TechSupply Corp
    provider: "TechSupply Corp",
    is_reimbursable: false,
    payment: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "2",
    description: 'Servicios cloud AWS',
    origin: 'web',
    date: new Date('2025-01-30'),
    type: 'Gasto',
    amount: 85000,
    currency: 'ARS',
    category_id: "1",
    category: 'Software',
    department_id: "3",
    area: 'Desarrollo',
    budget: 'Desarrollo 2025',
    tag: 'Recurrente',
    collaborator: 'Juan Pérez',
    provider_id: "1", // TechSupply Corp
    provider: "TechSupply Corp",
    is_reimbursable: false,
    payment: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "3",
    description: 'Campaña publicidad Facebook',
    origin: 'web',
    date: new Date('2025-01-29'),
    type: 'Gasto',
    amount: 35000,
    currency: 'ARS',
    category_id: "3",
    category: 'Marketing Digital',
    department_id: "1",
    area: 'Marketing',
    budget: 'Marketing Q1',
    tag: 'Proyecto',
    collaborator: 'Ana Silva',
    provider_id: "2", // Global Services SA
    provider: "Global Services SA",
    is_reimbursable: false,
    payment: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "4",
    description: 'Capacitación equipo ventas',
    origin: 'web',
    date: new Date('2025-01-28'),
    type: 'Gasto',
    amount: 75000,
    currency: 'ARS',
    category_id: "4",
    category: 'Capacitación',
    department_id: "2",
    area: 'Ventas',
    budget: 'Ventas Q1',
    tag: 'Capacitación',
    collaborator: 'Carlos Ruiz',
    provider_id: "2", // Global Services SA
    provider: "Global Services SA",
    is_reimbursable: true,
    payment: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "2",
    description: 'Licencias Microsoft 365',
    origin: 'web',
    date: new Date('2025-01-27'),
    type: 'Gasto',
    amount: 120000,
    currency: 'ARS',
    category_id: "1",
    category: 'Software',
    department_id: "3",
    area: 'Desarrollo',
    budget: 'Desarrollo 2025',
    tag: 'Prioritario',
    collaborator: 'Juan Pérez',
    provider_id: "1", // TechSupply Corp
    provider: "TechSupply Corp",
    is_reimbursable: false,
    payment: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "5",
    description: 'Consultoría técnica',
    origin: 'web',
    date: new Date('2025-01-26'),
    type: 'Gasto',
    amount: 95000,
    currency: 'ARS',
    category_id: "6",
    category: 'Servicios',
    department_id: "3",
    area: 'Desarrollo',
    budget: 'Desarrollo 2025',
    tag: 'Proyecto',
    collaborator: 'María González',
    provider_id: "3", // Digital Solutions LLC
    provider: "Digital Solutions LLC",
    is_reimbursable: false,
    payment: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "1",
    description: 'Servicios de marketing digital',
    origin: 'web',
    date: new Date('2025-01-25'),
    type: 'Gasto',
    amount: 45000,
    currency: 'ARS',
    category_id: "3",
    category: 'Marketing Digital',
    department_id: "1",
    area: 'Marketing',
    budget: 'Marketing Q1',
    tag: 'Recurrente',
    collaborator: 'Ana Silva',
    provider_id: "2", // Global Services SA
    provider: "Global Services SA",
    is_reimbursable: false,
    payment: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "2",
    description: 'Desarrollo de APIs',
    origin: 'web',
    date: new Date('2025-01-24'),
    type: 'Gasto',
    amount: 180000,
    currency: 'ARS',
    category_id: "1",
    category: 'Software',
    department_id: "3",
    area: 'Desarrollo',
    budget: 'Desarrollo 2025',
    tag: 'Proyecto',
    collaborator: 'Juan Pérez',
    provider_id: "3", // Digital Solutions LLC
    provider: "Digital Solutions LLC",
    is_reimbursable: false,
    payment: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "3",
    description: 'Mantenimiento servidores',
    origin: 'web',
    date: new Date('2025-01-23'),
    type: 'Gasto',
    amount: 65000,
    currency: 'ARS',
    category_id: "1",
    category: 'Software',
    department_id: "3",
    area: 'Desarrollo',
    budget: 'Desarrollo 2025',
    tag: 'Recurrente',
    collaborator: 'Juan Pérez',
    provider_id: "1", // TechSupply Corp
    provider: "TechSupply Corp",
    is_reimbursable: false,
    payment: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    company_id: "1",
    employee_id: "4",
    description: 'Optimización SEO',
    origin: 'web',
    date: new Date('2025-01-22'),
    type: 'Gasto',
    amount: 55000,
    currency: 'ARS',
    category_id: "3",
    category: 'Marketing Digital',
    department_id: "1",
    area: 'Marketing',
    budget: 'Marketing Q1',
    tag: 'Proyecto',
    collaborator: 'Ana Silva',
    provider_id: "2", // Global Services SA
    provider: "Global Services SA",
    is_reimbursable: false,
    payment: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];