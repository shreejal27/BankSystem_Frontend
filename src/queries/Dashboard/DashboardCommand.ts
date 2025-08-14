import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardQueryKey } from "./DashboardQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IDashboardResponse } from "../../types/DashboardDto";

export const useDashboardData = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => getDashboardData(),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [DashboardQueryKey] });
        },
        onError(error) {
           return error;
    }
});
};

async function getDashboardData(): Promise<IDashboardResponse> {
    const response = await apiClientBe.get<IDashboardResponse>("api/Dashboard");
    return response.data;
}