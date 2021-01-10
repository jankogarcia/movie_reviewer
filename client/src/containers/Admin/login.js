import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions'

class Login extends Component{

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state)
    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }

    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')
        }else{
            
        }
    }

    componentDidUpdate(){
        //console.log(this.props)
    }

    renderError = () => (
        !this.props.user.login
        ? null
        : <div className='error'>
            {this.props.user.login.message}
        </div>
    )

    render(){
        return(
            <div className='rl_container'>
                <form onSubmit={this.submitForm}>
                    <h2>Log in here</h2>
                    <div className='form_element'>
                        <input 
                            type='email'
                            placeholder='enter your email'
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>
                    <div className='form_element'>
                        <input 
                            type='password'
                            placeholder='enter your password'
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    <button type='submit'>Log in</button>
                    {this.renderError()}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loginUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);