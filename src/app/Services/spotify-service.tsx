import SpotifyWebApi from 'spotify-web-api-js';

let spotify = new SpotifyWebApi();

spotify.getPlaylist('3cEYpjA9oz9GiPac4AsH4n').then((playlist) => {
    console.log(playlist);
});