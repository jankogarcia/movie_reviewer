import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = (item) => {
    //console.log(item)

    const renderActors = () => (
        // <div key={i}>
                    //     {actor.name}
                    // </div>
        <ul>
            {
                item.actors.map((actor, i) => (
                    <li key={i}>
                        {actor.name}
                    </li>
                ))
            }
        </ul>
    )

    return(
        <Link to={`/movie/${item._id}`} className="movie_item">
            <div className='movie_header'>
                <h2>{item.name}</h2>
            </div>
            <div className='movie_items'>
                <div className='movie_director'>
                    {item.director}
                </div>
                <div>
                    {item.review}
                </div>
                <div>
                    <h3>Actors:</h3>
                    {renderActors()}
                </div>
                <div className='movie_bubble rating'>
                    Rating: {item.rating}
                </div>
            </div>
        </Link>
    )
}

export default MovieItem;