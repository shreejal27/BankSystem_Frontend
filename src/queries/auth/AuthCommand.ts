import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginQueryKey } from "./AuthQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { TLoginSchema } from "../../utils/schema/TLoginSchema";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TLoginSchema) => loginUser(data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [LoginQueryKey] });
        },
        onError(error) {
           return error;
    }
});
};

async function loginUser(data: TLoginSchema): Promise<TLoginResponse> {
    const response = await apiClientBe.post<TLoginResponse>("/auth/login", data);
    return response.data;
}