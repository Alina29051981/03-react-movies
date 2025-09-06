import React from 'react';
import { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  lastMovieRef?: React.Ref<HTMLLIElement>;
}

const imageBase = (path: string | null) => (path ? `https://image.tmdb.org/t/p/w500${path}` : '');

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect, lastMovieRef }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map((movie, index) => (
        <li
          key={movie.id}
          ref={index === movies.length - 1 ? lastMovieRef : null} 
        >
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(movie)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSelect(movie);
            }}
          >
            <img
              className={css.image}
              src={imageBase(movie.poster_path) || undefined}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;

