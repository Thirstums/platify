import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('');

/*export async function getPlaylist(id: string) {
    let playlist;

    await spotifyApi.getPlaylist(id).then(
        function(data) {
            playlist = data.body;
        },
        function(err) {
            console.error(err);
            return null;
        }
    );
    return playlist;
}*/

// creates an empty playlist:
export async function createPlaylist(title: string, description: string, collaborative: boolean, isPublic: boolean) {
    let playlistId: any;

    await spotifyApi.createPlaylist(title, { description: description, collaborative: collaborative, public: isPublic}).then(
        function(data) {
            playlistId = data.body.id;
        },
        function(err) {
            console.error(err);
            return null;
        }
    );
    return playlistId;
}

// searches spotify track and returns uri:
export async function searchTrack(query: string) {
    let uri: any;

    await spotifyApi.searchTracks(query, { limit: 5}).then(
        function(data) {
            uri = data.body.tracks?.items[0].uri;
        },
        function(err) {
            console.error(err);
        }
    );
    return uri;
}

// adds tracks to a playlist:
export async function addTracksToPlaylist(id: string, tracks: string[]) {
    await spotifyApi.addTracksToPlaylist(id, tracks).then(
        function(err) {
            console.error(err);
            return null;
        }
    );
}