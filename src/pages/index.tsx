import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { createPlaylistByMatchingSongs } from './api/spotify'
import { getTrackList } from './api/openai'
import secureLocalStorage from 'react-secure-storage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { logout, refreshAccessToken } from './api/auth/spotify-auth'
import { addTracksToPlaylist, createPlaylist, searchTrack } from './api/spotify'

const inter = Inter({ subsets: ['latin'] })
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000; // refresh the token every 55 minutes

export default function Home() {

// Handles the submit event on form submit.
const handleSubmit = async (event: any) => {
  // Stop the form from submitting and refreshing the page.
  event.preventDefault()

  // Get data from the form.
  const data = {
    UserInputforms: event.target.UserInputforms.value
    
  }

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data)

  // API endpoint where we send form data.
  const endpoint = '/api/form'

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  }

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options)

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json()


  getTrackList(event.target.UserInputforms.value).then(res =>
    createPlaylistByMatchingSongs(res)
  );

}

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (token: any) => {
      refreshAccessToken(token);
    }

    const intervalId = setInterval(async () => {
      const token: any = secureLocalStorage.getItem('token');
      
      if(token) {
        // If the user is online for 55 minutes and the token is about to expire, refresh the token
        console.log('Refreshing token... (1h in)');
        fetchData(token);
      } else {
        // If the user somehow got logged out, redirect him to home page
        router.push('/login');
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [router]);

  function handleLogout() {
    logout();
    console.log('successfully logged out')
    router.push('/login');
  }

  async function createTestPlaylist() {
    const uri = await searchTrack('Shape of you');
    const playlistId = await createPlaylist('Platify', 'your mum', false, false);

    if (uri && playlistId) {
      const tracks = [uri];
      await addTracksToPlaylist(playlistId, tracks);
    }
  }

  return (
    <>
      <Head>
        <title>Platify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
        <div>
          </div>
          
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/BlueberryTartLogo.png"
                alt="Vercel Logo"
                
                width={50}
                height={50}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.description}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="UserInputforms">Playlist Tags</label>
            <input type="text" id='UserInputforms' name='UserInputforms' />

            <button className={styles.addTagsbtn}> Add Tags</button>

            <div>
            <button className={styles.generatebtn} type='submit'>Generate Playlist</button>
            </div>
            
          </form>
          </div>
          
          

          </div>

        <div className={styles.center}>
          <Image
            
            src="/Platifylogo.png"
            alt="Next.js Logo"
            width={180}
            height={180}
            priority
          />
        </div>

        <button onClick={createTestPlaylist}> Create Test Playlist </button>

        <button onClick={handleLogout}> Logout </button>

        <div className={styles.grid}>
        <a
            href="https://github.com/Thirstums/platify"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Contact Us <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              help.platify@gmail.com
            </p>

            <Image
            
            src="/GithubLogo.png"
            alt="GitHub Logo"
            width={90}
            height={35}
            priority
          />
          </a>
          <a
            href="https://github.com/Thirstums/platify"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Github <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Platify Official Github
            </p>

            <Image
            
            src="/GithubLogo.png"
            alt="GitHub Logo"
            width={90}
            height={35}
            priority
          />
          </a>
          <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/BlueberryTartLogo.png"
                alt="Vercel Logo"
                
                width={50}
                height={50}
                priority
              />
            </a>
        </div>
        
      </main>
    </>
  )
}