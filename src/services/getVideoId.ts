

const getVideoId = (url: string) => {
    try {
        return new URL(url).searchParams.get("v");
    } catch (error) {
        console.log(error);
    }
    return null;
};
export default getVideoId;