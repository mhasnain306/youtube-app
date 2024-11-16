import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import HttpService from "../services/HttpService";


interface Video {
    items:
    {
        snippet:
        {
            thumbnails:
            {
                [key: string]: { url: string }
            }
        }
    }[];
}

interface ThumbnailResource {
    type: string;
    url: string;
}

const httpClient = new HttpService<Video>("/videos");
const useThumbnail = (inputUrl: string) => {
    const [thumbnailData, setThumbnailData] = useState<ThumbnailResource[]>([]);
    const [selectedUrl, setSelectedUrl] = useState("");
    let thumbnailUrls: ThumbnailResource[] = [];


    const { data, error, isLoading } = useQuery({
        queryKey: [{ videoId: inputUrl }],
        queryFn: () => {
            const params = {
                id: inputUrl
            }
            console.log(params);

            return httpClient.get(params).then(res => res.data);
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
    useEffect(() => {
        if (data?.items[0]) {
            const thumbnails = data.items[0].snippet.thumbnails;
            for (const key in thumbnails) {
                thumbnailUrls.push({ type: key, url: thumbnails[key].url })
            }
            setThumbnailData(thumbnailUrls);
        }
        return () => {
            setThumbnailData([]);
            setSelectedUrl("");
        }
    }, [data])


    return {
        thumbnailData,
        isLoading,
        error,
        selectedUrl,
        setSelectedUrl
    };
}

export default useThumbnail;