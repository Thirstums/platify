import { useRouter } from "next/router";
import { useEffect } from "react";
import { exchangeCodeForToken } from "@/pages/api/auth/spotify-auth";
import { Loading } from "@nextui-org/react";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      await exchangeCodeForToken(code, state);
      router.push("/");
    };

    fetchToken();
  }, [router]);

  return (
    <Loading className="spinner" color="success" textColor="success">
      Logging you in...
    </Loading>
  );
}
