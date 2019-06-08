import React from 'react';
import SideBar from './SideBar';

class Pilot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className='mainPage'> 
        <p> I'm a pilot </p>
        <SideBar
            className='pilotSideBar'
            tabs={['My Flights', 'Signup for Flights']} 
            mapper={{
                'My Flights': (<ViewFlights/>), 
                'Signup for Flights': (<p> add page </p>)
            }}
        />
        </div>)
    }
}

class ViewFlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className='viewFlightsPage'> 
        <p> this is the view flights page </p>
        </div>)
    }
}


export default Pilot;