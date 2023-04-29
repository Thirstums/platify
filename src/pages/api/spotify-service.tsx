import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQDjRjPTfcuN3zOB6enhWzggzsKOVU33GzoTM8U2c0Eyb1Zxa7DbkL6hj2bKO-AN1Ag0Y6vqGJS_cG0Sp2EeRwqYLAd8AU3TpofneBo9Xuy1zstBs5LQM_2ogRvyHs_AOuSRgsxCw0EixSFDMgdYuF9R75CUF3w7yXF9JkHKsj2bx1tPPxZ-qJTosPSWeznRw-TCCT2iqkvLindXx_Uhg68ui6AkWDNMAL7ZdZdiaGpcGJuyYf4U0xhxofQycPYuRgV76IqiVBdz7zU');
const matchedSongs: any[] = [];


// creates an empty playlist:
export async function createPlaylist(title: string, description: string, collaborative: boolean, isPublic: boolean) {
    let playlistId;
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
    let uri = null;

    await spotifyApi.searchTracks(query, { limit: 1}).then(
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

    export async function createPlaylistByMatchingSongs(tracks: string[]){

        tracks = ["hello", "believer"];
        const artists = ["adelle", "imagine dragons"];

        for (let i = 0; i < tracks.length; i++) {
            matchedSongs.push(searchTrack(tracks[i]));
    }

    addTracksToPlaylist(JSON.stringify(createPlaylist("WHODAFUGISGIGANI", "This playlist was created with Platify", false, true)), tracks);
    return <p>tracks</p>
}