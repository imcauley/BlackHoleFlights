import React from 'react';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          active: this.props.defaultActive
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({active: e.target.id})
    }

    render() {
        var page;
        page = this.props.mapper[this.state.active];

        return (
            <div>
            <div className={this.props.className} className='subBar'>
            
            {this.props.tabs.map((item, index) => (
                <div onClick={this.handleClick} className='userButtonTab'>
                <Tab text={item} key={index} id={item}/>
                </div>
              ))}
            </div>

            <br/>
            <br/>

            <div className='content'>
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

export default SideBar;