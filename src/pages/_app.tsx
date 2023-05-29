import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getToken, refreshAccessToken } from "./api/auth/spotify-auth";
import { createTheme, NextUIProvider } from "@nextui-org/react";

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (token: any) => {
      refreshAccessToken(token);
    };

    const token: any = getToken();

    if (token) {
      if (router.pathname === "/login") {
        // If the user is already logged in and wants to access login page, redirect him to home page
        console.log("You are already logged in");
        router.push("/");
      }
      if (Date.now() > token.accessTokenExpires!) {
        // If the access token is expired, refresh it:
        console.log("Access token expired, refreshing...");
        fetchData(token);
      }
    } else if (router.pathname === "/") {
      // If the access token is not present, redirect the user to the login page
      console.log("initial login");
      router.push("/login");
    }
  }, [router]);

  return (
    <NextUIProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
