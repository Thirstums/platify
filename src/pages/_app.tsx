import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { refreshAccessToken } from '@/pages/api/spotify'

const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000; // refresh the token every 55 minutes

export default function App({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (refreshToken) {
        refreshAccessToken();
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [refreshToken]);

  return <Component {...pageProps} />
}
