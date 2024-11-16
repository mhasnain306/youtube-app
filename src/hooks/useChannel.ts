import { useEffect, useState } from "react";
import HttpService from "../services/HttpService";

interface ChannelInfoType {
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: { url: string }
        };
    };
    statistics: {
        subscriberCount: number;
    };
    contentDetails: {
        relatedPlaylists: {
            uploads: string;
        }
    }
}

interface ChannelInfoResponseType {
    items: ChannelInfoType[];
}

const useChannel = (channelHandle: string, onFetch: (id: string) => void) => {
    const [data, setData] = useState<ChannelInfoType[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if (!channelHandle) {
            setData([]);
            setError("");
            return;
        }
        setLoading(true);
        const httpClient = new HttpService<ChannelInfoResponseType>("/channels");

        const params = {
            part: "snippet,contentDetails,statistics",
            forHandle: channelHandle,
        }
        httpClient.get(params).then(res => {
            setError("");
            setLoading(false);
            onFetch(res.data.items[0].contentDetails.relatedPlaylists.uploads);
            setData([...res.data.items])
        })
            .catch(err => {
                setLoading(false);
                setError(err.message)
            });
    }, [channelHandle]);




    return { data, error, isLoading };
}

export default useChannel