# Platify
----------------------------------------------------------------------------------------

Platify is a Spotify Playlist Generator using AI for IOS and Android

![Platify](/img/PlatifyLogo.png)


## AI Training Prompt
I want you to act as a playlist creator for individuals who don't know any songs and would like a playlist based on the Year, Genre, Artist, a Specific Song or based on a sentence describing the playlist. I will provide you with input forms like "Year" "Music Genre" "Artist" "Song" or a sentence. 
Your Task will be to find songs based on the input forms or the sentence and generate a playlist with 30 songs and provide it to me. Try your best to always create different playlists with different songs. Always include the Specific song in the playlist

If there is a -like tag, I want you to find a Genre, Artist, Song similar in style and in mood to the given input. 

Input forms:
Year = "", 
Genre = "", 
Artist = "", 
Song = ""


# Playlist  showcase

Coming soon

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



# Capacitor
Capacitor is used to convert your existing Next.js app (code) into a Mobile app

## Next.js Configuration (get it ready for Capacitor)

add e new block to your Package.json file (in the scrits object)
```
"static": "next build && next export"
```
run with
```
npm run static
```

This won't work yet, due to the image optimaziation. Change the next.config.js file to the code below so it can work. Then run the command again.
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  nextConfig, 
  images: {
    unoptimized: true
  }

}
```
## Install Capacitor

In your Root directory install the Capacitor main npm dependencie
```
npm i -D @capacitor/cli
```

Initialize Capacitor
```
npx cap init
```
go to the newly created Capacitor.config.ts file and change the webDir from 'public' to 'out'

Then proceed installing the rest of the npm dependencies
```
npm i @capacitor/core
npm install @capacitor/ios 
npm install @capacitor/android
```

Add ios & Android Code
```
npx cap add ios
npx cap add android
```

You can Open the projects in your terminal with
```
npx cap open ios
npx cap open android
```
On Windows device's you have to use [AndroidStudio](https://developer.android.com/studio)
In order to programm IOS applications on Windows you will need set up a Virtual MacOs system

On MacOS systems you can work with [Xcode](https://developer.apple.com/xcode/) & [Android Studio](https://developer.android.com/studio)

### info

If you make any changes to your capacitor.config.ts File you need to sync it again.
```
npx cap sync
```


# OpenAI
```
$ npm install openai
```
