import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginQueryKey, RegisterQueryKey } from "./AuthQueryKey";
import { apiClientBe } from "../../api/Client/apiClientBe";
import type { TLoginSchema } from "../../utils/schema/TLoginSchema";
import type { ILoginResponse, IRegisterResponse } from "../../types/auth/AuthType";
import type { TRegisterSchema } from "../../utils/schema/TRegisterSchema";

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

export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TRegisterSchema) => registerUser(data),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [RegisterQueryKey] });
        },
        onError(error) {
           return error;
    }
});
};

async function registerUser(data: TRegisterSchema): Promise<IRegisterResponse> {
    const response = await apiClientBe.post<IRegisterResponse>("api/Auth/register", data);
    return response.data;
}