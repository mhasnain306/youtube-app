import axios from "axios";
import { useState } from "react";

export const axiosInstance = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        key: "AIzaSyAxGGRfdnUpozj052bPxMabHrIM4dHwgLA",
        part: "snippet",
    },
});
type thumbnailTypes = "standard" | "maxres" | "default";
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

const useThumbnail = () => {
    const [thumbnailData, setUrl] = useState<ThumbnailResource[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedUrl, setSelectedUrl] = useState("");

    const fetchthumbnail = (id: string) => {
        setLoading(true);
        axiosInstance.get<Video>('/videos', {
            params: {
                id: id
            }
        }).then((res) => {
            let urls: ThumbnailResource[] = [];
            if (res.data.items[0]) {
                const thumbnails = res.data.items[0].snippet.thumbnails;
                for (const key in thumbnails) {
                    urls.push({ type: key, url: thumbnails[key].url })
                }

                setError("")
            } else {
                setError("No video found");
            }
            setUrl(urls);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setError(err);

        });
    };

    return {
        thumbnailData,
        isLoading,
        fetchthumbnail,
        setUrl,
        error,
        setError,
        selectedUrl,
        setSelectedUrl
    };
}

export default useThumbnail;