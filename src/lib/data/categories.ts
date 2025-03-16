import { v4 as uuidv4 } from 'uuid';

export type Category = {
  id: string;
  name: string;
  percentage: number;
};

export const categories: Category[] = [
  { id: "1", name: 'Software', percentage: 25 },
  { id: "2", name: 'Marketing Digital', percentage: 20 },
  { id: "3", name: 'Capacitación', percentage: 15 },
  { id: "4", name: 'Equipamiento', percentage: 25 },
  { id: "5", name: 'Servicios', percentage: 15 },
];