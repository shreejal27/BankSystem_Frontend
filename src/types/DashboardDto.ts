export interface TransactionDto {
  amount: number;
  type: number;
  accountNumber: string;
  timestamp: string;
}

export interface IDashboardResponse {
  name: string;
  email: string;
  totalBalance: number;
  recentTransactions: TransactionDto[];
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface IAdminDashboardResponse{
  users: number;
  accounts: number;
  transactedAmount: number;
  transactionsCount: number;
  latestUsers: UserDto[];
  latestTransactions: TransactionDto[];
} 
