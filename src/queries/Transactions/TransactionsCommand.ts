import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IDeposit, IDepositResponse, IGetUserAccountNumber } from "../../types/TransactionsDto";
import { DepositQueryKey, GetUserAccountNumberQueryKey } from "./TransactionsQueryKey";

export const useGetUserAccountNumber = (id:string ) => {
    return useQuery({
    queryKey: [GetUserAccountNumberQueryKey, id],
    queryFn: ()=> getUserAccountNumber(id),
});
};

async function getUserAccountNumber(id: string): Promise<IGetUserAccountNumber> { 
    const response = await apiClientBe.get<IGetUserAccountNumber>("api/Accounts/getAccountNumberById?id="+ id);
    return response.data;
}


export const useDeposit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IDeposit) => deposit(data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [DepositQueryKey] });
        },
        onError(error) {
           return error;
    }
});
};

async function deposit(data: IDeposit): Promise<IDepositResponse> {
    const response = await apiClientBe.post<IDepositResponse>("api/Transaction/deposit", data);
    return response.data;
}