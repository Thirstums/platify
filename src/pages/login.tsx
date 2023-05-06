import { getAuthorizationUrl } from '@/pages/api/spotify'
import checkAuth from './checkAuth';

const Login = () => {
  const handleLogin = async () => {
    const authorizationUrl = await getAuthorizationUrl();
    window.location.href = authorizationUrl;
  };

  return (
    <button onClick={handleLogin}> Log in with Spotify </button>
  );
};

export default checkAuth(Login);