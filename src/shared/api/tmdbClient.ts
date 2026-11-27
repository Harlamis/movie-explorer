import axios from "axios";
const tmdbUrl = import.meta.env.VITE_TMDB_API_URL;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

interface TmdbErrorResponse {
  status_message?: string;
}
if (!tmdbUrl || !tmdbApiKey)
  console.warn(
    "No Api URL or Api Key detected, enter them in .env file and restart the project",
  );

// AxiosInstance type and our custom HttpClient are covariant, so compiler will aslo treat tmdbClient as of HttpClient type
// We will achieve Dependency inversion with this and won't leak implementation details in external slices
export const tmdbClient = axios.create({
  baseURL: tmdbUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
  params: {
    language: "en-US",
  },
});
tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError<TmdbErrorResponse>(error)) {
      const message =
        error.response?.data?.status_message ||
        error.message ||
        "Network error occurred";

      throw new Error(message);
    }
    throw new Error("Unexpected error occurred");
  },
);
