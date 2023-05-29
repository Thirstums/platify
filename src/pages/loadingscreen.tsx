import { useRouter } from "next/router";
import { getTrackList } from "./api/openai";


export function loadingScreen() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    

    //fixing needed, currenlty doesn't know when the prompt is ready
    if (!getTrackList) {
        return null;
    }

    router.push('playlists', undefined, {shallow: true});
    return (
        <div>
            <h2>Loading...</h2>

            {/* Add your loading animation or relevant content here */}
        </div>
    )
}

export default loadingScreen;