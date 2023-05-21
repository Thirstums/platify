import { getAuthorizationUrl } from '@/pages/api/auth/spotify-auth'
import styles from '../styles/Login.module.scss'
export default function Login() {
  const handleLogin = async () => {
    const authorizationUrl = await getAuthorizationUrl();
    window.location.href = authorizationUrl;
  };

  return (
      <div className={styles.pageContainer}>
          <div className={styles.parent}>
              <p>Would you like to generate a playlist?</p>
              <p className={styles.padding}>Login if you trust AI</p>
            <div className={styles.button}>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
      </div>
  );
};