import { useQuery } from "@tanstack/react-query";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IGetUserProfileResponse } from "../../types/UserDto";
import { GetUserQueryKey } from "../User/UserQueryKey";

export const useGetUserProfileData = (id:string) => {
    return useQuery({
    queryKey: [GetUserQueryKey, id],
    queryFn: ()=> getUserProfileData(id),
});
};

async function getUserProfileData(id: string): Promise<IGetUserProfileResponse> { 
    const response = await apiClientBe.get<IGetUserProfileResponse>("api/User/"+ id);
    return response.data;
}