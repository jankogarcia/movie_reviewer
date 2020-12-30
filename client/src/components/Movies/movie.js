import React from 'react';
import MovieContainer from '../../containers/movie_container';

const Movie = (props) => {
    return(
        <div>
            <MovieContainer {...props}/>
        </div>
    )
}

export default Movie;