import { useQuery } from "@tanstack/react-query";
import { DashboardQueryKey } from "./DashboardQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IDashboardResponse } from "../../types/DashboardDto";

export const useDashboardData = () => {
    return useQuery({
    queryKey: [DashboardQueryKey],
    queryFn: getDashboardData,
});
};

async function getDashboardData(): Promise<IDashboardResponse> {
    const response = await apiClientBe.get<IDashboardResponse>("api/Dashboard");
    return response.data;
}