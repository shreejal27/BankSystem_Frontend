import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllUserQueryKey, ToggleUserStatus } from "./UserQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IGetAllUserResponse, IGetUserProfileAdminResponse } from "../../types/UserDto";
import { GetUserQueryKey, UpdateUserKey } from "../User/UserQueryKey";

export const useGetAllUsers = (flag : string) => {
    return useQuery({
    queryKey: [GetAllUserQueryKey],
    queryFn: ()=> getAllUsers(flag),
});
};

async function getAllUsers(flag: string): Promise<IGetAllUserResponse> { 
    const response = await apiClientBe.get<IGetAllUserResponse>("api/User?flag="+flag);
    return response.data;
}

export const useGetUserProfileData = (id:string ) => {
    return useQuery({
    queryKey: [GetUserQueryKey, id],
    queryFn: ()=> getUserProfileData(id),
});
};

async function getUserProfileData(id: string): Promise<IGetUserProfileAdminResponse> { 
    const response = await apiClientBe.get<IGetUserProfileAdminResponse>("api/User/"+ id);
    return response.data;
}

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; email: string; role: number }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UpdateUserKey] });
    },

    onError: (error) => {
      console.error("Update user failed:", error);
      return error;
    },
  });
};

async function updateUser(id: string, payload: { name: string; email: string; role: number }): Promise<IGetUserProfileAdminResponse> {
  const response = await apiClientBe.put<IGetUserProfileAdminResponse>(`api/User/${id}`,payload);
  return response.data;
}

export const useToggleUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:string) => toggleUserStatus(id),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [ToggleUserStatus] });
        },
        onError(error) {
           return error;
    }
});
};

async function toggleUserStatus(id: string): Promise<void> {
    await apiClientBe.post(`api/User/toggle-status/${id}`);
}