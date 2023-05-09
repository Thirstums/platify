import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('');
const matchedSongs: string[] = [];    

export async function createPlaylist(title: string, description: string, collaborative: boolean, isPublic: boolean) {
    let playlistId = "";
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

export async function searchTrack(query: string) {
    let uri: any;

    await spotifyApi.searchTracks(query, { limit: 1 }).then(
        function(data) {
           uri = data.body.tracks?.items[0].uri;
        },
        function(err) {
            console.error(err);
        }
    );
    return uri;
}

export async function addTracksToPlaylist(id: string, tracks: string[]) {
    await spotifyApi.addTracksToPlaylist(id, tracks).then(
        function(err) {
            console.error(err);
            return null;
        }
    );
}

    export async function createPlaylistByMatchingSongs(tracks: any){

        for (let i = 0; i < tracks.length; i++) {
            matchedSongs.push(await searchTrack(tracks[i]));
            }

    createPlaylist("GAY", "This playlist was created with Platify", false, true).then(res => 
    addTracksToPlaylist(res, matchedSongs));

    return <p>tracks</p>
}