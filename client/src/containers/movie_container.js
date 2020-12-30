import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovieById, clearMovie } from '../actions'

class MovieContainer extends Component {

    componentDidMount(){
        this.props.getMovieById(this.props.match.params.id)
    }

    componentWillUnmount(){
        this.props.clearMovie();
    }

    renderMovieInfo = () => (
        !this.props.movies.movie
        ? null
        : <div>
            {this.props.movies.movie.name}
        </div>
    )

    render(){
        console.log(this.props.movies.movie)
        return(
            <div>
                {this.renderMovieInfo()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getMovieById, clearMovie}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);

