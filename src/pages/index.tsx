import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.scss';
import { createPlaylistByMatchingSongs, spotifyApi } from './api/spotify';
import { getTrackList } from './api/openai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getToken, refreshAccessToken } from './api/auth/spotify-auth';

const inter = Inter({ subsets: ['latin'] });
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000; // refresh the token every 55 minutes

export default function Home() {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
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

  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const onChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag || '');
    }

    setIsKeyReleased(false);
  };

const onKeyUp = () => {
  setIsKeyReleased(true);
}

const deleteTag = (index: number) => {
  setTags(prevState => prevState.filter((tag, i) => i !== index));
};

return (
  <>
    {/* ... */}
    <main className={styles.main}>
      {/* ... */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ... */}
        <div className={styles.inputParent}>
          {tags.map((tag, index) => (
            <div className={styles.tag} key={index}>
              
              {tag}
              <button onClick={() => deleteTag(index)}>x</button>

          <input
            type="text"
            id="UserInputforms"
            name="UserInputforms"
            placeholder={"Add a Tag. For example: \"90s music\""}
            value={input}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
                    </div>
          ))}
          <button type="button" className={styles.addTagsbtn}>
            Add Tags
          </button>
        </div>
        {/* ... */}
      </form>
      {/* ... */}
    </main>
  </>
);
}