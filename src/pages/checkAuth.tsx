
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import secureLocalStorage  from  "react-secure-storage";
import { refreshAccessToken } from './api/auth/spotify-auth';


export default function checkAuth(WrappedComponent: any) {
  const HOC = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token: any = secureLocalStorage.getItem('token');

      if (token) {
        if(Date.now() > token.accessTokenExpires!) {
          // If the access token is expired, refresh it:
          console.log('Access token expired, refreshing...')
          refreshAccessToken(token);
        }
      } else {
        // If the access token is not present, redirect the user to the login page
        console.log('initial login')
        router.push('/login');
      }
    }, [router]);

    // If the access token is present, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return HOC;
}