import React from "react";
import { fetchMovies } from "./presenters/MoviePresenter";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [movies, setMovies] = React.useState<any[]>([]);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError("");
        try {
            const movies = await fetchMovies(query);
            setMovies(movies);
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
            {movies.map((movie) => (
                <div key={movie.imdbID}>
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                </div>
            ))}
        </div>
    );
};

export default App;