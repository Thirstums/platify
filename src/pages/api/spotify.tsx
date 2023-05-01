import SpotifyWebApi from 'spotify-web-api-node'
import queryString from 'query-string'
import crypto from 'crypto'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: SPOTIFY_REDIRECT_URI
});

export async function getAuthorizationUrl() {
    const state = crypto.randomBytes(20).toString('hex');
    const codeVerifier = crypto.randomBytes(32).toString('hex');
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    const queryParams = queryString.stringify({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: SPOTIFY_REDIRECT_URI,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        state,
        scope: 'playlist-modify-public playlist-read-private playlist-modify-private',
    });

    const authorizationUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    localStorage.setItem('codeVerifier', codeVerifier);
    localStorage.setItem('state', state);
    
    return authorizationUrl;
}

export async function exchangeCodeForToken(code: any, state: any) {
    const codeVerifier = localStorage.getItem('codeVerifier');
    const savedState = localStorage.getItem('state');
    var tokens = { accessToken: '', refreshToken: '' };

    if (state !== savedState) {
        throw new Error('Invalid state');
    }

    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: queryString.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            code_verifier: codeVerifier,
            client_id: SPOTIFY_CLIENT_ID
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        spotifyApi.setAccessToken(data.access_token);
        tokens = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return tokens;
};

export async function refreshAccessToken() {
    const data = await spotifyApi.refreshAccessToken();
    const newAccessToken = data.body.access_token;
    spotifyApi.setAccessToken(newAccessToken);
}

// gets a playlist
export async function getPlaylist(id: string) {
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
}

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

/*
export async function createPlaylistByMatchingSongs() {
    let tracks = ['ching cheng hanji', 'red sun in the sky'];
    let spotifyTracks = [];

    for (let i = 0; i < tracks.length; i++) {
        let uri = await searchTrack(tracks[i]);
        spotifyTracks.push(uri);
    }

    const playlistId = await createPlaylist('CHING CHONG', 'approved by mao zedong', false, false);

    if (playlistId && spotifyTracks.length > 0) {
        addTracksToPlaylist(playlistId, spotifyTracks);
    }
}*/