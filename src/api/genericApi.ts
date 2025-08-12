import axios from "axios";

export async function fetchData<T>(url:string): Promise<T> {
    const response = await axios.get(url);
    if (!response.data) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data();
}