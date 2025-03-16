import { useAccounts } from './hooks/useAccounts';
import { AccountsView } from './components/AccountsView';

export function AccountsPage() {
  const {
    accounts,
    searchTerm,
    setSearchTerm,
    showAddDialog,
    setShowAddDialog,
  } = useAccounts();

  return (
    <AccountsView
      accounts={accounts}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showAddDialog={showAddDialog}
      setShowAddDialog={setShowAddDialog}
    />
  );
}
