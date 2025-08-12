import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginQueryKey } from "./AuthQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { TLoginSchema } from "../../utils/schema/TLoginSchema";
import type { ILoginResponse } from "../../types/auth/AuthType";

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

async function loginUser(data: TLoginSchema): Promise<ILoginResponse> {
    const response = await apiClientBe.post<ILoginResponse>("api/Auth/login", data);
    return response.data;
}