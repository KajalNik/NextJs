import posthog from "posthog-js";

export const initPostHog = () => {
  if (typeof window !== "undefined" && !posthog.__loaded) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          console.log("PostHog loaded");
        }
      },
    });
  }
  return posthog;
};
