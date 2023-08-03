import { FaCircleXmark } from "react-icons/fa6";

const WatchedMovie = ({ movie, onRemoveWatched }) => {
  return (
    <li>
      <img
        src={movie.poster === "N/A" ? "/default-movie.png" : movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onRemoveWatched(movie.imdbID)}
        >
          <FaCircleXmark />
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
