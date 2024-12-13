import React, { useRef, useState } from "react";
import { fetchMovies } from "./presenters/MoviePresenter";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { Movie } from "./models/MovieModel";
import "./css/App.css";
import "./css/Modal.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
    } catch (err) {
      setError("Failed to fetch movies. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div>
      <h1>Welcome to Movie Search!</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <div className="loading-message">Loading...</div>}
      {error && <p>{error}</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            onClick={() => openModal(movie)}
          />
        ))}
      </div>

      {/* Dialog for Movie Details */}
      <dialog
        ref={modalRef}
        className="modal"
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "DIALOG") closeModal();
        }}
      >
        {selectedMovie && (
          <div className="modal-content">
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong>Year:</strong> {selectedMovie.Year}
            </p>
            <p>
              <strong>Type:</strong> {selectedMovie.Type}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default App;
