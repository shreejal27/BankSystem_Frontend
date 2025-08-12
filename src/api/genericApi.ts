import {apiClientBe} from "./Client/apiClientBe";

export async function fetchData<T>(url:string): Promise<T> {
    const response = await apiClientBe.get(url);
    return response.data();
}

export async function postData<T>(url: string, data: T): Promise<T> {
    const response = await apiClientBe.post(url, data);
    return response.data;
}