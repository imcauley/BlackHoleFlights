import React from 'react';
import './MainPage.css';
import User from './User.js';
import Admin from './Admin.js';
import Pilot from './Pilot.js';
import logo from './logo.svg'

function MainPage () {
    return (
        <body>
        <TabHandler/>
        </body>
    )
}


class TabHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tabs: ['User', 'Pilot', 'Admin'],
          active: 'User'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({active: e.target.id})
    }

    render() {
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
            <p className='sideBarText'> Logout </p>

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
