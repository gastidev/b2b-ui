import { Transaction } from './data';
import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';

export type FilterOperator = 'AND' | 'OR';
export type FilterType = 'string' | 'number' | 'date' | 'select';
export type FilterCondition = 'equals' | 'contains' | 'greater' | 'less' | 'between';

export interface Filter {
  id: string;
  field: keyof Transaction;
  type: FilterType;
  condition: FilterCondition;
  value: any;
  value2?: any; // For 'between' condition
}

export interface FilterGroup {
  operator: FilterOperator;
  filters: Filter[];
}

// Get unique values for select fields
export function getUniqueValues(transactions: Transaction[], field: keyof Transaction): string[] {
  return Array.from(new Set(transactions.map(t => t[field] as string))).sort();
}

// Define column metadata
export const columnMeta: Record<string, { type: FilterType; label: string }> = {
  description: { type: 'string', label: 'Descripción' },
  date: { type: 'date', label: 'Fecha' },
  type: { type: 'select', label: 'Tipo' },
  category: { type: 'select', label: 'Categoría' },
  area: { type: 'select', label: 'Área' },
  budget: { type: 'select', label: 'Presupuesto' },
  tag: { type: 'select', label: 'Tag' },
  amount: { type: 'number', label: 'Monto' },
  collaborator: { type: 'select', label: 'Colaborador' },
};

// Filter conditions by type
export const conditionsByType: Record<FilterType, { value: FilterCondition; label: string }[]> = {
  string: [
    { value: 'equals', label: 'Igual a' },
    { value: 'contains', label: 'Contiene' },
  ],
  number: [
    { value: 'equals', label: 'Igual a' },
    { value: 'greater', label: 'Mayor que' },
    { value: 'less', label: 'Menor que' },
    { value: 'between', label: 'Entre' },
  ],
  date: [
    { value: 'equals', label: 'Igual a' },
    { value: 'greater', label: 'Después de' },
    { value: 'less', label: 'Antes de' },
    { value: 'between', label: 'Entre' },
  ],
  select: [
    { value: 'equals', label: 'Igual a' },
  ],
};

// Apply filters to transactions
export function applyFilters(transactions: Transaction[], filterGroup: FilterGroup): Transaction[] {
  return transactions.filter(transaction => {
    const results = filterGroup.filters.map(filter => {
      const value = transaction[filter.field];
      
      switch (filter.type) {
        case 'string':
          if (filter.condition === 'equals') {
            return value === filter.value;
          }
          return (value as string).toLowerCase().includes(filter.value.toLowerCase());
        
        case 'number':
          const numValue = value as number;
          if (filter.condition === 'equals') return numValue === filter.value;
          if (filter.condition === 'greater') return numValue > filter.value;
          if (filter.condition === 'less') return numValue < filter.value;
          if (filter.condition === 'between') return numValue >= filter.value && numValue <= filter.value2;
          return false;
        
        case 'date':
          const dateValue = value as Date;
          const filterDate = new Date(filter.value);
          if (filter.condition === 'equals') {
            return dateValue >= startOfDay(filterDate) && dateValue <= endOfDay(filterDate);
          }
          if (filter.condition === 'greater') return dateValue > filterDate;
          if (filter.condition === 'less') return dateValue < filterDate;
          if (filter.condition === 'between') {
            return isWithinInterval(dateValue, {
              start: new Date(filter.value),
              end: new Date(filter.value2),
            });
          }
          return false;
        
        case 'select':
          return value === filter.value;
        
        default:
          return true;
      }
    });

    return filterGroup.operator === 'AND' 
      ? results.every(Boolean) 
      : results.some(Boolean);
  });
}

// Local Storage
const FILTERS_STORAGE_KEY = 'transaction-filters';

export function saveFilters(filterGroup: FilterGroup) {
  localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filterGroup));
}

export function loadFilters(): FilterGroup | null {
  const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
  if (!stored) return null;
  
  const parsed = JSON.parse(stored);
  // Convert date strings back to Date objects
  parsed.filters = parsed.filters.map((filter: Filter) => {
    if (filter.type === 'date') {
      filter.value = filter.value ? new Date(filter.value) : null;
      filter.value2 = filter.value2 ? new Date(filter.value2) : null;
    }
    return filter;
  });
  
  return parsed;
}