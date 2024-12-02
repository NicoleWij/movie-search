import React from "react";
import { fetchMovies } from "./presenters/MoviePresenter";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

const App: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [movies, setMovies] = React.useState<any[]>([]);

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

    return (
        <div>
            <h1>Welcome to Movie Search!</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        title={movie.Title}
                        year={movie.Year}
                        poster={movie.Poster}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
