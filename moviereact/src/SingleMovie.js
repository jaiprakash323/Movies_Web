import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true);

    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True"){
        setIsLoading(false);
        setMovie(data);
      }
    }catch(error){
      console.log(error)
    }
  };

  useEffect(()=>{
    getMovies(`${API_URL}&i=${id}`);
  }, [id]);
  if(isLoading){
    return(
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    );
  }

  // Optional: Handle case where movie data wasn't found
  if (!movie) {
    return (
      <div className='movie-section'>
        <div>Movie not found.</div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }
  
  return (
    <>
    <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          {/* Changed 'Movies' to 'movie' to match the state */}
          <img src={movie.Poster} alt={movie.Title || "Movie Poster"} />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="text">{movie.Released}</p>
          <p className="text">{movie.Genre}</p>
          <p className="text">{movie.imdbRating} / 10</p>
          <p className="text">{movie.Country}</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default SingleMovie;