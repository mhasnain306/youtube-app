import axios from "axios";

const controller = new AbortController();
export const axiosInstance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        key: "AIzaSyAMbdK3aEELtRuszeJjOUBnoVnSXu01k5M",
        part: "snippet",
    },
    signal: controller.signal
});

interface Params {
    id?: string;
    part?: string;
    forHandle?: string;
}
class HttpService<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    get = (params: Params) => {
        return axiosInstance.get<T>(this.endpoint, { params });
    }

    cancel = () => controller.abort();
}

export default HttpService;