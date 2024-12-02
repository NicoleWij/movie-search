import React from 'react';

interface MovieProps {
    title: string;
    year: string;
    poster: string;
}

const MovieCard: React.FC<MovieProps> = ({ title, year, poster }) => (
    <div>
        <img src={poster} alt={`${title} poster`} />
        <h3>{title}</h3>
        <p>{year}</p>
    </div>
);

export default MovieCard;