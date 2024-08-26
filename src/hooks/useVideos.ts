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

    useEffect(() => {
        const fetchVideos = async () => {
            if (!playlistId) return;

            const client = new HttpService<PlaylistItemsResultType>("/playlistItems");
            const params: ParamsType = {
                part: "snippet",
                playlistId: playlistId,
                maxResults: MAX_RESULTS
            };

            try {
                const results = await fetchAllVideos(client, params, queryData);
                setData(results);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            }
        };

        fetchVideos();
    }, [playlistId, queryData]);

    return { data, error };
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
        const res = await client.get(currentParams);
        nextPageToken = res.data.nextPageToken;

        const { newResults, shouldStop } = filterVideosByDate(res.data.items, from, to);
        results = [...results, ...newResults];

        if (shouldStop) break;
    } while (nextPageToken);

    return results;
}

function filterVideosByDate(items: VideoType[], from: Date, to: Date): { newResults: VideoType[], shouldStop: boolean } {
    const newResults: VideoType[] = [];
    let shouldStop = false;

    for (const item of items) {
        const videoDate = new Date(item.snippet.publishedAt);
        if (videoDate >= from && videoDate <= to) {
            newResults.push(item);
        } else if (videoDate < from) {
            shouldStop = true;
            break;
        }
    }

    return { newResults, shouldStop };
}

export default useVideos;