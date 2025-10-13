import { useQuery } from "@tanstack/react-query";
import { GetAllUserQueryKey } from "./UserQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IGetAllUserResponse } from "../../types/UserDto";

export const useGetUserProfileData = () => {
    return useQuery({
    queryKey: [GetAllUserQueryKey],
    queryFn: ()=> getUserProfileData(),
});
};

async function getUserProfileData(): Promise<IGetAllUserResponse> { 
    const response = await apiClientBe.get<IGetAllUserResponse>("api/User" );
    return response.data;
}