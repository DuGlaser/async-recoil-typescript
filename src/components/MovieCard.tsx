import React from 'react';
import { css } from 'emotion';
import { Movie } from '../api/client';

const movieCardStyle = css`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  img {
    object-fit: contain;
    width: 100%;
    height: 80%;
  }
  span,
  time {
    text-align: center;
  }
`;

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = (props) => {
  const { Poster, Title, Year, Type } = props.movie;
  return (
    <li className={movieCardStyle}>
      <img src={Poster} alt="" />
      <span>{Title}</span>
      <time dateTime={Year}>{Year}</time>
      <span>{Type}</span>
    </li>
  );
};

export default MovieCard;
