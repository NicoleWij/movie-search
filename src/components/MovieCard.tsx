    import React from 'react';
    import "./../css/MovieCard.css";

    interface MovieProps {
        title: string;
        year: string;
        poster: string;
    }

    const MovieCard: React.FC<MovieProps> = ({ title, year, poster }) => (
        <div className="movie-card">
        <img src={poster} alt={`${title} poster`} />
        <h3>{title}</h3>
        <p>{year}</p>
        </div>
    );  

    export default MovieCard;