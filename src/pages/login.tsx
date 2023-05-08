import { getAuthorizationUrl } from '@/pages/api/auth/spotify-auth'

export default function Login() {
  const handleLogin = async () => {
    const authorizationUrl = await getAuthorizationUrl();
    window.location.href = authorizationUrl;
  };

  return (
    <button onClick={handleLogin}> Log in with Spotify </button>
  );
};