import { OpenAIApi } from 'openai/dist/api'

import { Configuration } from "openai/dist/configuration"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function getTrackList() {
  return await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want you to act as a playlist creator for individuals who don't know any songs 
      and would like a playlist based on the Year, Genre, Artist, a Specific Song or based on a sentence describing the playlist. 
      I will provide you with input forms like \"Year\" \"Music Genre\" \"Artist\" \"Song\" or a sentence. \n
      Your Task will be to find songs based on the input forms or the sentence and generate a playlist with 30 songs and provide it to me. 
      Try your best to always create different playlists with different songs. 
      Always include the Specific song in the playlist\n\n
      if there is a -like tag, I want you to find a Genre, Artist, Song similar in style and in mood to the given input. \n\n
      Input forms:\nYear = \"\", \nGenre = \"\", \nArtist = \"\", \nSong = \"\"\n\n# Playlist  showcase`,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,                                                                                   
      presence_penalty: 0,
  });
}