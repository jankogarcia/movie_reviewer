import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearMovieWithReviewer, getMovieWithReviewer } from '../actions'

class MovieContainer extends Component {

    componentDidMount(){
        //this.props.getMovieById(this.props.match.params.id)
        this.props.getMovieWithReviewer(this.props.match.params.id)
    }

    componentWillUnmount(){
        this.props.clearMovieWithReviewer();
    }

    renderMovieInfo = () => (
        !this.props.movies.movie || !this.props.movies.reviewer
        ? null
        : <div className='br_container'>
            <div className='br_header'>
                <h2>
                    {this.props.movies.movie.name}
                </h2>
                <h5>
                    {this.props.movies.movie.director}
                </h5>
                <div className='br_reviewer'>
                    <span>Review by:</span> {this.props.movies.reviewer.name} {this.props.movies.reviewer.lastname}
                </div>
            </div>
            <div className="br_review">
                {this.props.movies.movie.review}
            </div>
            <div className='br_box'>
                <div className='left'>
                    <div>
                    <span>Year:</span> {this.props.movies.movie.year}
                    </div>
                    <div>
                    <span>Time:</span> {this.props.movies.movie.minutes} mins
                    </div>
                </div>
                <div className='right'>
                    <span>Rating</span>
                    <div>{this.props.movies.movie.rating}/5</div>
                </div>
            </div>
        </div>
    )




    render(){
        //console.log(this.props.movies.movie)
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
    return bindActionCreators({clearMovieWithReviewer, getMovieWithReviewer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);

