import { useRouter } from 'next/router'
import { useEffect } from 'react'

// TODO: fix localStorage error:
/*
export default function requireAuth(WrappedComponent: any) {
  const HOC = (props: any) => {
    const router = useRouter();

    // Check if the authorization code exists in local storage
    const isAuthenticated = !!localStorage.getItem('accessToken');

    // If the user is not authenticated, redirect them to the login page
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    // If the user is authenticated, render the protected page
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return HOC;
};*/