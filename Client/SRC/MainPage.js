import React from 'react';
import './MainPage.css';
import User from './User.js';
import Admin from './Admin.js';
import Pilot from './Pilot.js';
import logo from './logo.svg'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var API_URL = 'http://127.0.0.1:3000';


function MainPage () {
    return (
        <TabHandler/>
    )
}


class TabHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tabs: [],
          active: 'User',
          logged_out: false
        };
        this.setUserType();
        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    setUserType() {
        fetch(`${API_URL}/get_user_type?user_id=${cookies.get('user_id')}`)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 200) {
                var user_types = ['User'];
                if(result.is_pilot) {
                    user_types.push('Pilot');
                }
                if(result.is_admin) {
                    user_types.push('Admin');
                }
    
            this.setState({
                tabs: user_types
            });
          }
          },
          (error) => {
            this.setState({
              error: true
            });
          }
        )
    }

    handleClick(e) {
        this.setState({active: e.target.id})
    }

    handleLogout() {
        cookies.remove('user_id');
        this.setState({logged_out: true})
    }

    render() {
        if(this.state.logged_out) {
            return (<Redirect to='/'/>);
        }

        var page;
        if(this.state.active == 'User') {
            page = <User/>;
        }
        else if(this.state.active == 'Pilot') {
            page = <Pilot/>;
        }
        else if(this.state.active == 'Admin') {
            page = <Admin/>;
        }

        return (
            <div>
            <div className='SideBar'>

            <img className='logo' src={logo}/>
            {this.state.tabs.map((item, index) => (
                <div onClick={this.handleClick} className='userButtonTab'>
                <Tab text={item} key={index} id={item}/>
                </div>
              ))}
            <br/>
            <br/>
            <p className='userButtonTab' onClick={this.handleLogout}> Logout </p>

            </div>
            <div className='Page'>
            {page}
            </div>
            </div>
        )
    }
}

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div id={this.props.id} className='sideBarText'> {this.props.text} </div>)
    }
}

export default MainPage;
