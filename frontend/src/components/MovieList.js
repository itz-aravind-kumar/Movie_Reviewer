import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import MovieNav from './MovieNav';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://movie-reviewer-backend-2.onrender.com/movies/");
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.name && movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <MovieNav />
      <h2>Movies</h2>
      <div className="row mb-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row">
        {filteredMovies.map((movie, index) => (
          <div key={index} className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{color:"white"}}>{movie.name}</h5>
                <div 
                  className="card-img-top" 
                  style={{ 
                    height: "450px", 
                    backgroundImage: `url(${movie.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} 
                />
                <p className="card-text" style={{color:'white'}}>
                  <strong>Year: </strong>{movie.release_year}<br/>
                  {/* <strong>Average Rating: </strong>{movie.average_rating}<br/> */}
                </p>
                <div className="row">
                  <Link
                    to={`/movies/${id}/${movie._id}`}
                    className="btn btn-primary col-lg-5 mx-auto mb-1"
                  >
                    View Reviews
                  </Link>
                  <a
                    href={`https://www.imdb.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary col-lg-5 mx-auto mb-1"
                  >
                    IMDb
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
