export interface IGetUserAccountNumber {
    accountNumber: string;
}

export interface IDeposit {
    accountNumber: string;
    amount: number;
}

export interface IDepositResponse {
  message: string;
}