import { useEffect, useState } from "react";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        // Network failure
        if (!res.ok) {
          throw new Error("Something went wrong while fetching movies");
        }
        const data = await res.json();
        // Error on server => response contains details
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
        // setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
