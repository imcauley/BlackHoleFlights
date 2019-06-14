import React from 'react';
import './MainPage.css';
import { throws } from 'assert';
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var API_URL = 'http://127.0.0.1:3000';


function LoginPage () {

    return (
        <div>
        <LoginForm/>
        <br/>
        <br/>
        <SignUpForm/>
        </div>
    )
};



class LoginForm extends React.Component {

    constructor(props) {
      super(props);
    
      this.state = {
        username: "",
        password: "",
        id: -1,
        bad_login: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleLogin(event) {
        fetch(`${API_URL}/login`)
        .then(res => res.json())
        .then(
        (result) => {
            if(result.status == 200) {
                cookies.set('user_id', result.user_id, { path: '/' });
                this.setState({
                    id: result.user_id
                }); 
            }
            else {
                this.setState({
                    bad_login: true
                }); 
            }
        },
        (error) => {
            this.setState({
                bad_login: true
            });
        }
        )
    }

    render() {
        var bad_login_popup = <div> </div>;
        if(this.state.id != -1) {
            return (<Redirect to='/app'/>)
        }

        if(this.state.bad_login) {
            bad_login_popup = <div> Bad login credentials </div>
        }
        return(
        <div>
            Login Here:
            <form>
            <label> Username: </label>
            <input name='username' type="text" onChange={this.handleChange}/>
            <br/>
            <label> Password: </label>
            <input name='password' type="password" onChange={this.handleChange}/>
            </form>
            <button onClick={this.handleLogin}> Log In </button>

            {bad_login_popup}
        </div>)
    }
}

class SignUpForm extends React.Component {

    constructor(props) {
      super(props);
    
      this.state = {
        username: "",
        password: "",
        phone_number: "",
        email: "",
        id: -1,
        bad_login: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleLogin(event) {
        fetch(`${API_URL}/signup`)
        .then(res => res.json())
        .then(
        (result) => {
            if(result.status == 200) {
                cookies.set('user_id', result.user_id, { path: '/' });
                this.setState({
                    id: result.user_id
                }); 
            }
            else {
                this.setState({
                    bad_login: true
                }); 
            }
        },
        (error) => {
            this.setState({
                bad_login: true
            });
        }
        )
    }

    render() {
        var bad_login_popup = <div> </div>;
        if(this.state.id != -1) {
            return (<Redirect to='/app'/>)
        }

        if(this.state.bad_login) {
            bad_login_popup = <div> Bad login credentials </div>
        }
        return(
        <div>
            Sign Up Here:
            <form>
            <label> Username: </label>
            <input name='username' type="text" onChange={this.handleChange}/>
            <br/>
            <label> Password: </label>
            <input name='password' type="password" onChange={this.handleChange}/>
            <br/>
            <label> E-Mail: </label>
            <input name='email' type="text" onChange={this.handleChange}/>
            <br/>
            <label> Phone: </label>
            <input name='phone_number' type="text" onChange={this.handleChange}/>
            </form>
            <button onClick={this.handleLogin}> Sign Up </button>

            {bad_login_popup}
        </div>)
    }
}

export default LoginPage;