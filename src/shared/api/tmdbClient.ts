import axios from "axios";
const tmdbUrl = import.meta.env.VITE_TMDB_API_URL;
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
export const tmdbClient = axios.create({
  baseURL: tmdbUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: tmdbApiKey,
  },
  params: {
    language: "en-US",
  },
});
axios.interceptors.response.use((response) => response, (error) => {
    if (error === axios.isAxiosError) {
        
    }
})
