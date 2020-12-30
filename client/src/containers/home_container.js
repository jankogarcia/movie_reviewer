import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMoviesHome } from '../actions'
import MovieItem from '../widgetsUI/movie_item';

class HomeContainer extends Component{

    componentDidMount(){
        this.props.getMoviesHome(1, 0, 'desc')
    }

    renderItems = () => (
        this.props.movies.moviesList 
        ? <div>
            {this.props.movies.moviesList.map((item, i) => (
                <div key={item._id}>
                    <MovieItem {...item}/>
                </div>
            ))}
        </div>
        : null
    )

    loadMore = () => {
        if(!this.props.movies.moviesList)
            return;

        let count = this.props.movies.moviesList.length;
        this.props.getMoviesHome(1, count, 'desc', this.props.movies.moviesList)
    }

    render(){
        return(
            <div>
                {this.renderItems()}
                <div 
                    className='loadmore'
                    onClick={this.loadMore}>
                    Load More Movies
                </div>
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
    return bindActionCreators({getMoviesHome}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);