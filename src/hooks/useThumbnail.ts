import axios from "axios";
import { useEffect, useState } from "react";
import getVideoId from "../services/getVideoId";
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

const useThumbnail = (inputUrl: string) => {
    const [thumbnailData, setThumbnailData] = useState<ThumbnailResource[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedUrl, setSelectedUrl] = useState("");

    const httpClient = new HttpService<Video>("/videos");

    useEffect(() => {

        const id = getVideoId(inputUrl);
        if (id) fetchthumbnail(id);
        else setError("Invalid URL");
    }, [inputUrl]);

    const fetchthumbnail = (id: string) => {
        setSelectedUrl("");
        setLoading(true);
        const params = {
            id: id
        }
        httpClient.get(params).then(res => {
            let thumbnailUrls: ThumbnailResource[] = [];
            if (res.data.items[0]) {
                const thumbnails = res.data.items[0].snippet.thumbnails;
                for (const key in thumbnails) {
                    thumbnailUrls.push({ type: key, url: thumbnails[key].url })
                }

                setError("")
            } else {
                setError("No video found");
            }
            setThumbnailData(thumbnailUrls);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setError(err);

        });
    };

    return {
        thumbnailData,
        isLoading,
        error,
        selectedUrl,
        setSelectedUrl
    };
}

export default useThumbnail;