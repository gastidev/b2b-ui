export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  department: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Filter {
  field: string;
  value: string;
}

export interface FilterGroup {
  filters: Filter[];
}

export interface TransactionsViewProps {
  transactions: Transaction[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterGroup: FilterGroup;
  setFilterGroup: (group: FilterGroup) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  pageSize: string;
  setPageSize: (size: string) => void;
}
