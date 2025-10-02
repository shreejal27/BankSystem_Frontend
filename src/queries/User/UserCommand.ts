import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { IGetUserProfileResponse } from "../../types/UserDto";
import { GetUserQueryKey, UpdateUserKey } from "../User/UserQueryKey";

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

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string; email: string }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UpdateUserKey] });
    },

    onError: (error) => {
      console.error("Update user failed:", error);
      return error;
    },
  });
};

async function updateUser(id: string, payload: { name: string; email: string }): Promise<IGetUserProfileResponse> {
  const response = await apiClientBe.put<IGetUserProfileResponse>(`api/User/${id}`,payload);
  return response.data;
}