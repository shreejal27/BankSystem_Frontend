import { useQuery } from "@tanstack/react-query";
import { GetAllUserQueryKey } from "./UserQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IGetAllUserResponse, IGetUserProfileResponse } from "../../types/UserDto";
import { GetUserQueryKey } from "../User/UserQueryKey";

export const useGetAllUsers = () => {
    return useQuery({
    queryKey: [GetAllUserQueryKey],
    queryFn: ()=> getAllUsers(),
});
};

async function getAllUsers(): Promise<IGetAllUserResponse> { 
    const response = await apiClientBe.get<IGetAllUserResponse>("api/User" );
    return response.data;
}

export const useGetUserProfileData = (id:string ) => {
    return useQuery({
    queryKey: [GetUserQueryKey, id],
    queryFn: ()=> getUserProfileData(id),
});
};

async function getUserProfileData(id: string): Promise<IGetUserProfileResponse> { 
    const response = await apiClientBe.get<IGetUserProfileResponse>("api/User/"+ id);
    return response.data;
}