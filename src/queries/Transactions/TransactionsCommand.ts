import { useQuery } from "@tanstack/react-query";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IGetUserAccountNumber } from "../../types/TransactionsDto";
import { GetUserAccountNumberQueryKey } from "./TransactionsQueryKey";

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