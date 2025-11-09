export interface IGetUserAccountNumber {
    accountNumber: string;
}

export interface IDeposit {
    accountNumber: string;
    amount: number;
}

export interface IWithdraw {
    accountNumber: string;
    amount: number;
}

export interface IDepositResponse {
  message: string;
}

export interface IWithdrawResponse {
  message: string;
}