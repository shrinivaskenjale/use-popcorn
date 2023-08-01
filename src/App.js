import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import ResultCount from "./components/ResultCount";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";

const App = () => {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState();

  const { movies, error, isLoading } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleDeselectMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    handleDeselectMovie();
  };

  const handleRemoveWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBox query={query} onQueryChange={setQuery} />
        <ResultCount movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onDeselectMovie={handleDeselectMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
