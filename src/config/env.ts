const fallbackApiUrl = "https://6a198d06489e4715751a18af.mockapi.io";

const API_URL = process.env.EXPO_PUBLIC_API_URL || fallbackApiUrl;

if (__DEV__ && !process.env.EXPO_PUBLIC_API_URL) {
  console.warn(
    "Environment variable EXPO_PUBLIC_API_URL is not set! Using fallback API URL.",
  );
}

export const ENV = {
  API_URL,
} as const;
