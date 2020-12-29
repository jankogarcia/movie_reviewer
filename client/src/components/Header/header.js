import React, {Component} from 'react'; 
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import Sidenav from './Sidenav/sidenav';

const styles = {
    color:'#ffffff',
    padding:'10px',
    cursor:'pointer'
}

class Header extends Component{

    state = {
        showNav:false
    };

    onHideNav = () => {
        this.setState({showNav:false})
    }

    toggleNav = (setValue) => {
        this.setState({showNav:setValue})
    }

    render(){
        return(
            <header>
                <div className='open_nav'>
                    <FontAwesome name='bars' 
                        style={styles}
                        onClick={() => this.setState({showNav:true})}
                    />
                </div>
                <Sidenav 
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleNav(false)}
                    //onShowNav={() => this.toggleNav(false)}
                />
                <Link to='/' className='logo'>Movie Reviewer</Link>
            </header>
        )
    }
}

export default Header;