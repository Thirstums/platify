import SpotifyWebApi from 'spotify-web-api-node'
import queryString from 'query-string'
import crypto from 'crypto'
import secureLocalStorage  from  "react-secure-storage";
import Router from 'next/router';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectURI = process.env.SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectURI
});

export async function getAuthorizationUrl() {
    const state = crypto.randomBytes(20).toString('hex');
    const codeVerifier = crypto.randomBytes(32).toString('hex');
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    const queryParams = queryString.stringify({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectURI,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        state,
        scope: 'playlist-modify-public playlist-read-private playlist-modify-private',
    });

    const authorizationUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
    secureLocalStorage.setItem('codeVerifier', codeVerifier);
    secureLocalStorage.setItem('state', state);
    
    return authorizationUrl;
}

export async function exchangeCodeForToken(code: any, state: any) {
    const codeVerifier = secureLocalStorage.getItem('codeVerifier');
    const savedState = secureLocalStorage.getItem('state');

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
            redirect_uri: redirectURI,
            code_verifier: codeVerifier,
            client_id: clientId
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
        spotifyApi.setRefreshToken(data.refresh_token);
        secureLocalStorage.setItem('access_token', data.access_token);
        secureLocalStorage.setItem('refresh_token', data.refresh_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

export async function refreshAccessToken() {
    const response = await spotifyApi.refreshAccessToken();
    console.log(response);
}

export function isAuthenticated() {
    return secureLocalStorage.getItem('access_token') && secureLocalStorage.getItem('refresh_token');
}

export async function logout() {
    secureLocalStorage.clear();
    Router.push('/')
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