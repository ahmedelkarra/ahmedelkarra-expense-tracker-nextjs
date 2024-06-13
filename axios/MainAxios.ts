import axios from "axios";

const url = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'

export const AxiosMain = axios.create(
    {
        baseURL: `${url}/api/auth`,
        withCredentials: true
    }
)


export const AxiosExpenses = axios.create(
    {
        baseURL: `${url}/api`,
        withCredentials: true
    }
)