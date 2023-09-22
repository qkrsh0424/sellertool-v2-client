import { axiosAuthInterceptor } from "./axiosInterceptors";

const AUTH_API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.authApiAddress : process.env.production.authApiAddress

const BASE_URL = `${AUTH_API_ADDRESS}/auth/v1/event-applied-logs`;

export const EventAppliedLogDataConnect = () => {
    return {
        searchList: searchList
    }
}

const searchList = async () => {
    return await axiosAuthInterceptor.get(`${BASE_URL}`, {
        withCredentials: true,
    });
}