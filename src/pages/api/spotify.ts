import SpotifyWebApi from 'spotify-web-api-node'

export const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

const matchedSongs: string[] = [];

/*
// gets a playlist
export async function getPlaylist(id: string) {
    let playlist;

    await spotifyApi.getPlaylist(id).then(
        function(data) {
            playlist = data.body;
        },
        function(err) {
            console.error(err);
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
        }
    );
}

export async function createPlaylistByMatchingSongs(tracks: any){
    for (let i = 0; i < tracks.length; i++) {
        matchedSongs.push(await searchTrack(tracks[i]));
        }

    createPlaylist("Platify", "This playlist was created with Platify", false, true).then(res => 
    addTracksToPlaylist(res, matchedSongs));

    return tracks;
}

// interesting for future usage
/*
export async function getUserInformation(){
    const url = 'https://api.spotify.com/v1/me';
    const response = await fetch(url, {
        headers: {
            // call accessToken from localstorage instead of "accessToken"
            'Authorization': 'Bearer accessToken',
        },
    });
    const data = await response.json();
    return data;
}*/

export async function getCurrentUser() {
    let currentUser: any;

    await spotifyApi.getMe().then(
        function(data) {
            currentUser = data.body;
        },
        function(err) {
            console.error(err);
        }
    )
    return currentUser;
}