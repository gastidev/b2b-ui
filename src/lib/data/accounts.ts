import { v4 as uuidv4 } from 'uuid';
import { Account } from './types';

export const accounts: Account[] = [
  {
    id: uuidv4(),
    name: "Caja chica",
    initial_balance: 50000,
    remaining_balance: 35000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    name: "Banco Santander",
    initial_balance: 500000,
    remaining_balance: 425000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    name: "Mercado Pago",
    initial_balance: 100000,
    remaining_balance: 85000,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: uuidv4(),
    name: "Banco Galicia",
    initial_balance: 300000,
    remaining_balance: 275000,
    created_at: new Date(),
    updated_at: new Date()
  }
];