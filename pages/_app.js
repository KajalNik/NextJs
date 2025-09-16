import { useEffect } from "react";
import { useRouter } from "next/router";
import { initPostHog } from "../lib/posthog";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const posthog = initPostHog();

    // Track initial page load
    posthog?.capture("$pageview");

    // Track route changes
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
