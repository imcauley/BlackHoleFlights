import React from 'react';
import SideBar from './SideBar';
import FlightInfo from './FlightInfo';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
    }

    getFlights() {
        fetch(`${API_URL}/get_assigned_flights/?user_id=${cookies.get('user_id')}`)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 200) {
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
          }
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
      this.getFlights();
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
        // console.log();
        this.signUpForFlight(this.state.flight_list[event.target.value].flight_number);
    }

    signUpForFlight(flight_number) {
      fetch('http://127.0.0.1:3000/add_pilot_to_flight', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          flightID: flight_number,
          pilotID: cookies.get('user_id')
        })
      })
      .then(response => {
        this.getFlights();
      });
    }

    getFlights() {
        fetch(`${API_URL}/get_unassigned_flights`)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 200) {
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
          }
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