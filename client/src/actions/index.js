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

export function clearMovieWithReviewer(){
    return{
        type:'UNLOAD_MOVIE_AND_REVIEWER',
        payload:{
            movie: null,
            reviewer: null
        }
    }
}

export function getMovieWithReviewer(id){
    const request = axios.get(`/api/movie/${id}`)
    return (dispatch) => {
        request.then(({data}) => {
            let movie = data;

            axios.get(`/api/user/${movie.reviewerId}`)
            .then(({data}) => {
                let response = {
                    movie,
                    reviewer: data
                }

                dispatch({
                    type:'GET_MOVIE_WITH_REVIEWER',
                    payload:response
                })
            })            
        })
    }
}

export function loginUser({email, password}){
    const request = axios.post('/api/login', {email, password})
                    .then(response => response.data)

    return{
        type:'USER_LOGIN',
        payload:request
    }
}