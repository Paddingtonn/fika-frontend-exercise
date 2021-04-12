import './movieView.css';

import React, { useState, useEffect } from 'react';
import Divider from '../divider/divider';
import ClipLoader from "react-spinners/ClipLoader";
import FindGenres from '../../services/findGenres';
import MovieList from '../../services/moviesList';

const MovieView = ({searchPhrase}) => {
  const [moviesList, setMoviesList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [targetElement, setTargetElement] = useState(null);

  useEffect(() => {

    (async() => {
      try {
        const movies = await MovieList.get(page, searchPhrase);
        const moviesWithGenres = await FindGenres.find(movies);

        if (movies.total_pages === page) {
          setLoadMore(false)
        }
        setMoviesList(moviesList => [...moviesList, ...moviesWithGenres]);
        setLoader(false);

      } catch(err) {
        console.error(err);
      }

    })();

  }, [page, searchPhrase]);

  useEffect(() => {
    setLoader(true)
    setMoviesList([]);
    setPage(1);
  }, [searchPhrase]);

  return(
    loader ? (
      <div className='loader_container'>
        <ClipLoader color='white' size='120' />
      </div>
    ) : (
      <div className='movie_container'>
        {moviesList.length > 0 ? (
          <>
          {moviesList.map(({poster_path, title, genres, overview, release_date, vote_average}, i) => {
            return (
              <div className='movie' >
                <div className={`overview ${i == targetElement ? 'show' : ''}`}>{overview}</div>
                <span 
                  className='toggleClass' 
                  id={i} 
                  onMouseOut={() => setTargetElement(null)}
                  onMouseEnter={({target}) => setTargetElement(target.id)}>
                </span>
                {poster_path && <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`}></img>}
                <div className='text_box'>
                  <h3 className='title'>{title}</h3>
                  <span className='release_date'>{release_date.split('-')[0]}</span>
                  {genres.map((name, id, arr) => {
                    return <p className='genre'>{name} {arr.length - 1 !== id && <Divider  />}</p>
                  })}
                  <span className='vote_average'>&#9733; {vote_average}</span>
                </div>
              </div>
            )
          })}
          {loadMore && <p className='more' onClick={()=> setPage(page + 1)}>Load more</p>}
          </>
        ) : (
          <p className='no_results'>No movies found :(</p>
        )}
      </div>
    )
  );
};

export default MovieView;