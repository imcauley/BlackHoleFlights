import React from 'react';
import SideBar from './SideBar';
import FlightInfo from './FlightInfo';

var API_URL = 'http://127.0.0.1:3000';

class Pilot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className='mainPage'> 
        <SideBar
            className='pilotSideBar'
            defaultActive='My Flights'
            tabs={['My Flights', 'Signup for Flights']} 
            mapper={{
                'My Flights': (<ViewMyFlights/>), 
                'Signup for Flights': (<ViewOpenFlights/>)
            }}
        />
        </div>)
    }
}

class ViewMyFlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getFlights();
    }

    getFlights() {
        var user_id = 1;
        fetch(`${API_URL}/get_assigned_flights/?user_id=${user_id}`)
        .then(res => res.json())
        .then(
          (result) => {
            var tempFlights = [];
            for (const [index, element] of result.flights.entries()) {
                tempFlights.push(
                  <FlightInfo
                  key={index}
                  {...element}
                />)
              }

            this.setState({
              form_error: false,
              flight_list: result.trips,
              flights: tempFlights
            });
          },
          (error) => {
            this.setState({
              form_error: true,
              flights: []
            });
          }
        )
    }

    render() {
        return (
        <div> 
        <div className='mainHeader'> My Flights </div>
        {this.state.flights}
        </div>)
    }
}

class ViewOpenFlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getFlights();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        //Signup for flight
        console.log(this.state.flight_list[event.target.value].flight_number);
        this.getFlights();
    }

    getFlights() {
        var user_id = 1;
        fetch(`${API_URL}/get_assigned_flights/?user_id=${user_id}`)
        .then(res => res.json())
        .then(
          (result) => {
            var tempFlights = [];
            for (const [index, element] of result.flights.entries()) {
                tempFlights.push(
                  <div> 
                      <FlightInfo key={index} {...element} />
                      <div className='flightButton'> <button value={index} onClick={this.handleClick}> Sign Up </button> </div>
                  </div>)
              }

            this.setState({
              form_error: false,
              flight_list: result.flights,
              flights: tempFlights
            });
          },
          (error) => {
            this.setState({
              form_error: true,
              flights: []
            });
          }
        )
    }

    render() {
        return (
        <div> 
        <div className='mainHeader'> Open Flights </div>
        {this.state.flights}
        </div>)
    }
}


export default Pilot;