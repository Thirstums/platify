import { useState } from 'react'
import { getAuthorizationUrl } from '@/pages/api/spotify'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const authorizationUrl = await getAuthorizationUrl();
    window.location.href = authorizationUrl;
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Log in with Spotify'}
    </button>
  );
};