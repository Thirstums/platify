import { useRouter } from 'next/router'

export default function requireAuth(WrappedComponent: any) {
  const HOC = (props: any) => {
    const router = useRouter();

    // Check if the authorization code exists in local storage
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        // If the access token is not present, redirect the user to the login page
        router.push('/login');
        return null;
      }

      // If the access token is present, render the wrapped component
      return <WrappedComponent {...props} />;
    }
  };

  return HOC;
}