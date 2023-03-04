import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('');

export async function getPlaylist() {
    let playlist = {};

    await spotifyApi.getPlaylist('37i9dQZF1DWSXMERUaiq9M').then(
        function(data) {
            playlist = data.body;
        },
        function(err) {
            console.error(err);
        }
    );
    return playlist as SpotifyApi.SinglePlaylistResponse;
}