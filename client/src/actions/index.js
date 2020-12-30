import axios from 'axios';

export function getMoviesHome(limit=10, start=0, order='asc', movies=[]) {
    const request = axios
                    .get(`/api/movies?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                        if(movies.length > 0){
                            return [...movies, ...response.data]
                        }

                        return response.data
                    })

    return{
        type:'GET_MOVIES_HOME',
        payload: request
    }
}

export function getMovieById(id){
    const request = axios
                    .get(`/api/movie/${id}`)
                    .then(response => response.data)
    
    return {
        type:'GET_MOVIE_BY_ID',
        payload: request
    }
}

export function clearMovie(){
    return{
        type:'UNLOAD_MOVIE',
        payload:null
    }
}