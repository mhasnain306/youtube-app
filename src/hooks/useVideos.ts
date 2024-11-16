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

const MAX_RESULTS = 50;

const useVideos = (playlistId: string, queryData: InputsType) => {
    const [data, setData] = useState<VideoType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);

    const client = new HttpService<PlaylistItemsResultType>("/playlistItems");
    const params: ParamsType = {
        part: "snippet",
        playlistId: playlistId,
        maxResults: MAX_RESULTS
    };
    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            if (!playlistId) {
                setData([]);
                setError(null);
                setLoading(false);
                return;
            }
            setError(null);
            try {
                console.log("in try of usevideos");

                const results = await fetchAllVideos(client, params, queryData);

                setLoading(false);
                setData(results);
            } catch (err) {
                setLoading(false);
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            }
        };

        fetchVideos();
        // return () => client.cancel();
    }, [playlistId, queryData]);

    return { data, error, isLoading };
};

async function fetchAllVideos(client: HttpService<PlaylistItemsResultType>, params: ParamsType, queryData: InputsType): Promise<VideoType[]> {
    if (!queryData.fromDate || !queryData.toDate) {
        const res = await client.get(params);
        return res.data.items;
    }

    const from = new Date(queryData.fromDate);
    const to = new Date(queryData.toDate);
    let results: VideoType[] = [];
    let nextPageToken = "";

    do {
        const currentParams = nextPageToken ? { ...params, pageToken: nextPageToken } : params;
        console.log(currentParams);

        const res = await client.get(currentParams);
        nextPageToken = res.data.nextPageToken;

        const { newResults, shouldStop } = filterVideosByDate(res.data.items, from, to);

        results = [...results, ...newResults];

        if (shouldStop || !nextPageToken) break;
    } while (nextPageToken);
    // console.log(results);

    return results;
}

function filterVideosByDate(items: VideoType[], from: Date, to: Date): { newResults: VideoType[], shouldStop: boolean } {
    const newResults: VideoType[] = [];
    let shouldStop = false;

    console.log(items);

    for (const item of items) {
        const videoDate = new Date(item.snippet.publishedAt);
        if (videoDate >= from && videoDate <= to) {
            // console.log(item);

            newResults.push(item);
        } else if (videoDate < from) {
            shouldStop = true;
            break;
        }
    }

    return { newResults, shouldStop };
}

export default useVideos;