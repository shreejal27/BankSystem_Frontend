import { useQuery } from "@tanstack/react-query";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IAdminDashboardResponse } from "../../types/DashboardDto";
import { AdminDashboardQueryKey } from "./DashboardQueryKey";

export const useAdminDashboardData = () => {
    return useQuery({
    queryKey: [AdminDashboardQueryKey],
    queryFn: getAdminDashboardData,
});
};

async function getAdminDashboardData(): Promise<IAdminDashboardResponse> {
    const response = await apiClientBe.get<IAdminDashboardResponse>("/dashboard");
    return response.data;
}