import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';
import { refreshAccessToken } from './api/auth/spotify-auth';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (token: any) => {
      refreshAccessToken(token);
    }

    const token: any = secureLocalStorage.getItem('token');

    if (token) {
      console.log(token);
      if (router.pathname === '/login') {
        // If the user is already logged in and wants to access login page, redirect him to home page
        console.log('You are already logged in');
        router.push('/');
      }
      if(Date.now() > token.accessTokenExpires!) {
        // If the access token is expired, refresh it:
        console.log('Access token expired, refreshing...')
        fetchData(token);
      }
    } else if(router.pathname === '/') {
        // If the access token is not present, redirect the user to the login page
        console.log('initial login')
        router.push('/login');
    }
  }, [router]);

  return <Component {...pageProps} />
}
