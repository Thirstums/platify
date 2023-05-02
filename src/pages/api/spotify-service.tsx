import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQC_pSsXnR2SgNfzj9pNlDDxa5Q5AX9BHe-P7ASnEJDHgnzZfkMdGj6MSFuJF4QjxfbUwBjAbhIucxCA-YCht8HLanDOv6wzcpoLjlRqw732_6LgJY8yIH11UyIrTuuYhChQUIJwa5rCrmcvVpq6ZIaCM-xlUofZlA_uyATSBsA0XQgvJ7D97dkZJ84nwslEqAURGqIxMrDL1ubfCDoOq5ie0J0F0QCnbtjKcLu5hcaHmcRlDMAfDuvmdbqWIIEuPzQDuRj0v368NZk');
const matchedSongs: string[] = [];    


// creates an empty playlist:
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

// searches spotify track and returns uri:
export async function searchTrack(query: string) {
    let uri: any;

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
            matchedSongs.push(await searchTrack(tracks[i]));
    }
    createPlaylist("DummyTest", "This playlist was created with Platify", false, true).then((res => 

    addTracksToPlaylist(res, matchedSongs))
    
    );
    return <p>tracks</p>
}