import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import { createPlaylistByMatchingSongs, spotifyApi } from './api/spotify'
import { getTrackList } from './api/openai'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getToken, refreshAccessToken } from './api/auth/spotify-auth'
import LoadingPrompt from '../pages/loadingPrompt'
import ReactDOM from 'react-dom'

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
    const token: any = getToken();

    if(token) {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);
    }

    const fetchData = async (token: any) => {
      refreshAccessToken(token);
    }

    const intervalId = setInterval(async () => {
      const token: any = getToken();
      
      if(token) {
        // If the user is online for 55 minutes and the token is about to expire, refresh the token
        console.log('Refreshing token... (1h in)');
        fetchData(token);
      } else {
        // If the user somehow got logged out, redirect him to login page
        router.push('/login');
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [router]);

  
  const LoadingPrompt: React.FC = () => {
    return <div>Loading...</div>;
  };
  const Platify: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleButtonClick = () => {
      setIsLoading(true);

     
  
      // Simulating an asynchronous task
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Set your desired loading time here
      router.push('/playlistview');
    };

  return (
    <>
      <Head>
        <title>Platify</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/*<div className={styles.center}>*/}
        {/*  <div className={styles.description}>*/}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="UserInputforms">A<br/>Playlist<br/>Generator</label>
          <div className={styles.inputParent}>
            <input type="text" id='UserInputforms' name='UserInputforms' placeholder={"Add a Tag. For example: \"90s music\"" }/>
            <button type = 'button' className={styles.addTagsbtn}>Add Tags</button>
          </div>          
          <div className={styles.generatebtn}>
          <div>
      {isLoading ? (
        <LoadingPrompt />
      ) : (
        <button onClick={handleButtonClick}>Start Loading</button>
      )}
    </div>
          </div>
        </form>

        {/*</div>*/}
        {/*</div>*/}
        {/*<div className={styles.grid}>*/}
        <a
            href="https://github.com/Thirstums/platify"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/*<h2 className={inter.className}>*/}
            {/*  Contact Us <span>-&gt;</span>*/}
            {/*</h2>*/}
            {/*<p className={inter.className}>*/}
            {/*  help.platify@gmail.com*/}
            {/*</p>*/}

            <Image

            src="/github-mark-white.png"
            alt="GitHub Logo"
            width={30}
            height={30}
            className={styles.githubImage}
          />
        </a>
        {/*  <a*/}
        {/*    href="https://github.com/Thirstums/platify"*/}
        {/*    className={styles.card}*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*  >*/}
        {/*    <h2 className={inter.className}>*/}
        {/*      Github <span>-&gt;</span>*/}
        {/*    </h2>*/}
        {/*    <p className={inter.className}>*/}
        {/*      Platify Official Github*/}
        {/*    </p>*/}

        {/*    <Image*/}

        {/*    src="/GithubLogo.png"*/}
        {/*    alt="GitHub Logo"*/}
        {/*    width={90}*/}
        {/*    height={35}*/}
        {/*    priority*/}
        {/*  />*/}
        {/*  </a>*/}
        {/*</div>*/}
      </main>
    </>
  )
  ReactDOM.render(<Platify/>, document.getElementById("root"));
}


}