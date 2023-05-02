import {OpenAIApi} from 'openai/dist/api'
import { Configuration } from "openai/dist/configuration";
//
const configuration = new Configuration({
  apiKey: ""
});

const openai = new OpenAIApi(configuration);

export async function getTrackList(textInput: string) {
  try{
    const gptResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `I want you to act as a playlist creator for individuals who don't know any songs 
        and would like a playlist based on the Year, Genre, Artist, a Specific Song or based on a sentence describing the playlist. 
        I will provide you with input forms like \"Year\" \"Music Genre\" \"Artist\" \"Song\" or a sentence. \n
        Your Task will be to find songs based on the input forms or the sentence and generate a playlist with 30 songs and provide it to me. 
        Try your best to always create different playlists with different songs. 
        Always include the Specific song in the playlist\n\n
        if there is a -like tag, I want you to find a Genre, Artist, Song similar in style and in mood to the given input. \n\n
        Input forms: """
         ${textInput}
        """
        # Playlist  showcase`,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
    
      //returns the first response from OpenAI (there is only one in this case)                                    //splits into array
      const Playlist = gptResponse.data.choices[0].text?.replace('\r', '').replace('\n', '').replace(/ +(?= )/g,'').split('\n');

      //console log for troubleshooting
      console.log(Playlist);
      return Playlist;
    } catch (error) {
        console.error(error)
        return error;
}};



 

