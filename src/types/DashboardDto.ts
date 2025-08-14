export interface TransactionDto {
  amount: number;
  type: string;
  timestamp: string;
}

export interface IDashboardResponse {
  name: string;
  email: string;
  totalBalance: number;
  recentTransactions: TransactionDto[];
}
