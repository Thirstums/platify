import { useRouter } from 'next/router'
import { useEffect } from 'react';
import secureLocalStorage  from  "react-secure-storage";

export default function checkAuth(WrappedComponent: any) {
  const HOC = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = secureLocalStorage.getItem('access_token') && secureLocalStorage.getItem('refresh_token');

      if (!isAuthenticated) {
        // If the access token is not present, redirect the user to the login page
        router.push('/login');
      }
    }, [router]);

    // If the access token is present, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return HOC;
}