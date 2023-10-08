import { useState } from "react";
import { axiosInstance } from "./useThumbnail";

const useChannel = () => {
    const [data, setData] = useState<any>();

    const getChannel = (channel: string) => {
        axiosInstance.get("/channels", {
            params: {
                part: "snippet,contentDetails,statistics",
                id: channel,
            }
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }


    return { getChannel, data };
}

export default useChannel