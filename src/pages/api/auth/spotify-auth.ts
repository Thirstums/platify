import queryString from 'query-string'
import crypto from 'crypto'
import secureLocalStorage  from  "react-secure-storage";
import { spotifyApi } from '@/pages/api/spotify';

export async function getAuthorizationUrl() {
    const state = crypto.randomBytes(20).toString('hex');
    const codeVerifier = crypto.randomBytes(32).toString('hex');
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    
    const queryParams = queryString.stringify({
        client_id: spotifyApi.getClientId(),
        response_type: 'code',
        redirect_uri: spotifyApi.getRedirectURI(),
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
            redirect_uri: spotifyApi.getRedirectURI(),
            code_verifier: codeVerifier,
            client_id: spotifyApi.getClientId()
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
        
        secureLocalStorage.setItem('token', {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpires: Date.now() + data.expires_in * 1000 // 3600 seconds from spotify * 1000 for milliseconds
        });

        console.log('succesfully logged in')
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

export function refreshAccessToken(token: any) {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    spotifyApi.refreshAccessToken()

    spotifyApi.refreshAccessToken().then(
        function(data) {
            const { body: refreshTokenResponse } = data;

            secureLocalStorage.setItem('token', {
                accessToken: refreshTokenResponse.access_token,
                refreshToken: refreshTokenResponse.refresh_token ?? token.refreshToken,
                accessTokenExpires: Date.now() + refreshTokenResponse.expires_in * 1000 // 3600 seconds from spotify * 1000 for milliseconds
            });
        },
        function(err) {
            console.error(err);

            return {
                error: "RefreshAccessTokenError",
            };
        }
    );
}

export function logout() {
    spotifyApi.resetAccessToken();
    spotifyApi.resetRefreshToken();
    secureLocalStorage.clear();
};