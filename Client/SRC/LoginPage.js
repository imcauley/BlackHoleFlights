import React from 'react';
import './MainPage.css';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var API_URL = 'http://127.0.0.1:3000';


function LoginPage () {

    return (
        <div className="userLogInForm">
            <center>
        <h1> Black Hole Flights </h1>
        <LoginForm/>
        <br/>
        <br/>
        <SignUpForm/>
        </center>
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
        if(this.state.username != "" && this.state.password != ""){ 
            fetch(`${API_URL}/login?username=${this.state.username}&password=${this.state.password}`)
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
        } else {
            this.setState({
                bad_login: true
            });
        }
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
        phone_number: -1,
        email: "",
        id: -1,
        bad_login: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSignup = this.handleSignup.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSignup(event) {
        if(this.state.username != "" && this.state.password != "" && this.state.email != "" && this.state.phone_number != -1) {
            fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    ...this.state
                })
              })
              .then(res => res.json())
              .then(
                (result) => {
                    if(result.status === 200) {
                    cookies.set('user_id', result.user_id, { path: '/' });
                    this.setState({
                        id: result.user_id
                    }); 
                    }
                    else {
                        this.setState({bad_login: true});
                    }
                })
        }
        else{
            this.setState({bad_login: true});
        }
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
            <input name='phone_number' type="number" onChange={this.handleChange}/>
            </form>
            <button onClick={this.handleSignup}> Sign Up </button>

            {bad_login_popup}
        </div>)
    }
}

export default LoginPage;