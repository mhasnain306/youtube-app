import { useEffect, useState } from "react"
import HttpService from "../services/HttpService"
import { InputsType } from "../components/ChannelForm";


export interface VideoType {
    id: string;
    snippet: {
        publishedAt: string;
        title: string;
        description: string;
        thumbnails: {
            high: {
                url: string;
            }
        }
        resourceId: {
            videoId: string;
        }
    }
}
interface PlaylistItemsResultType {
    nextPageToken: string;
    items: VideoType[];
}
interface ParamsType {
    part: string;
    playlistId: string;
    maxResults: number;
    pageToken?: string;
}
const useVideos = (playlistId: string, queryData: InputsType) => {
    const [data, setData] = useState<VideoType[]>([]);
    const [error, setError] = useState("");
    console.log(playlistId, "in usevideos");
    const from = new Date(queryData.fromDate);
    const to = new Date(queryData.toDate);

    useEffect(() => {
        const fetchVideos = async () => {
            if (playlistId) {
                let nextPageToken = "";
                let stopLoop = false;

                const client = new HttpService<PlaylistItemsResultType>("/playlistItems");
                let params: ParamsType = {
                    part: "snippet",
                    playlistId: playlistId,
                    maxResults: 50
                }
                if (queryData.fromDate && queryData.toDate) {
                    let results: VideoType[] = [];
                    try {
                        do {
                            if (nextPageToken !== "") { params = { ...params, pageToken: nextPageToken } };
                            const res = await client.get(params);
                            nextPageToken = res.data.nextPageToken;
                            let videoDate;
                            for (const item of res.data.items) {
                                videoDate = new Date(item.snippet.publishedAt);
                                if (videoDate < to && videoDate > from) {
                                    results = [...results, item];
                                }
                                if (videoDate < from) {
                                    stopLoop = true;
                                    break;
                                }
                            };
                        } while (!stopLoop);
                        setData(results);
                    } catch (err) {
                        if (err instanceof Error && err.message) setError(err.message);
                    }
                } else {
                    client.get(params).then(res => setData(res.data.items))
                        .catch(err => setError(err.message));
                }
            }
        }
        fetchVideos();
    }, [playlistId]);

    return { data, error };

}
export default useVideos;