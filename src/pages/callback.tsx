import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { exchangeCodeForToken } from '@/pages/api/spotify'

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const { code } = router.query;
      const data = await exchangeCodeForToken(code);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    };

    fetchToken();
  }, [router]);

  return <div>Logging you in...</div>;
};
