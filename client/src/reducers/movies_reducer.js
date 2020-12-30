export default function(state={}, action){
    switch(action.type){
        case 'GET_MOVIES_HOME':
            return {...state, moviesList:action.payload} //name that will be getting in props
        case 'GET_MOVIE_BY_ID':
        case 'UNLOAD_MOVIE':
            return {...state, movie:action.payload}
        default:
            return state;
    }
}