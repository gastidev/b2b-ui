export interface Budget {
  id: string;
  department_id: string;
  category_id: string;
  initial_amount: number;
  remaining_amount: number;
  created_at: Date;
  updated_at: Date;
}

export interface BudgetsViewProps {
  budgets: Budget[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showAddDialog: boolean;
  setShowAddDialog: (show: boolean) => void;
}
