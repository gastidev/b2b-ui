export interface Account {
  id: string;
  name: string;
  initial_balance: number;
  remaining_balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface AccountsViewProps {
  accounts: Account[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showAddDialog: boolean;
  setShowAddDialog: (show: boolean) => void;
}
