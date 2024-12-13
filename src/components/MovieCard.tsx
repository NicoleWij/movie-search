    import React from 'react';
    import "./../css/MovieCard.css";

    interface MovieProps {
      title: string;
      year: string;
      poster: string;
      onClick: () => void; // Add onClick prop
    }
    
    const MovieCard: React.FC<MovieProps> = ({ title, year, poster, onClick }) => (
      <div className="movie-card" onClick={onClick}> {/* Add onClick */}
        <img src={poster} alt={`${title} poster`} />
        <h3>{title}</h3>
        <p>{year}</p>
      </div>
    );
    
    export default MovieCard;
    