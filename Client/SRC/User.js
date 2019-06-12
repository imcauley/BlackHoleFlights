import React from 'react';
import DestinationSelector from './DestinationSelector';
import SideBar from './SideBar';
import FlightInfo from './FlightInfo';

var API_URL = 'http://127.0.0.1:3000';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className='mainPage'> 
        <div className='mainPage'> 
        <p> I'm a pilot </p>
        <SideBar
            className='pilotSideBar'
            tabs={['Look Up Flights', 'My Tickets']} 
            mapper={{
                'Look Up Flights': (<LookFlights/>), 
                'My Tickets': (<LookTickets/>)
            }}
        />
        </div>
        </div>)
    }
}

class LookTickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket_list: [],
      tickets: [],
      error: false
    }

    this.get_tickets(); 
  }

  get_tickets() {
    var user_id = 1;
    fetch(`${API_URL}/get_tickets_for_passenger/?user_id=${user_id}`)
    .then(res => res.json())
    .then(
      (result) => {

        var tempTickets = [];
        for (const [index, element] of result.tickets.entries()) {
          tempTickets.push(
            <TicketInfo 
            key={index}
            {...element}
          />)
        }

        this.setState({
          error: false,
          ticket_list: result.tickets,
          tickets: tempTickets
        });

      },
      (error) => {
        this.setState({
          error: true
        });
      }
    )
  }

  render() {
      return(<div>
        <div className='mainHeader'> Your Tickets: </div>
        {this.state.tickets}
      </div>)
  }
}

class LookFlights extends React.Component {
    constructor(props) {
        super(props);

        this.default = {  
          from: '',
          to: '',
          values: ['-', 'Earth', 'Mars', 'Venus'],
          year: 0,
          month: 0,
          day: 0,
          form_error: false,
          trips_list: [],
          trips: []
        };
    
        this.state = this.default;

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

      }
    
      handleFromChange(event) {
        this.setState({from: event.target.value});
      }
    
      handleToChange(event) {
        this.setState({to: event.target.value});
      }

      handleDateChange(event) {
        this.setState({[event.target.name]: parseInt(event.target.value)});
      }
    
      handleSubmit(event) {
        console.log(this.state);

        event.preventDefault();
        if(this.state.from === '') {
          this.setState({
            form_error: true,
            trips: []
          });
          return;
        }
        if(this.state.to === '') {
          this.setState({
            form_error: true,
            trips: []
          });
          return;
        }
        if(this.state.year === 0) {
          this.setState({
            form_error: true,
            trips: []
          });
          return;
        }
        if(this.state.month === 0) {
          this.setState({
            form_error: true,
            trips: []
          });
          return;
        }
        if(this.state.day === 0) {
          this.setState({
            form_error: true,
            trips: []
          });
          return;
        }

        this.getTrips();
        //ADD this in with the request
        // this.setState({form_error: true});
      }

      handleBuy = (tripIndex) => {
        console.log(tripIndex);
        // this.setState({language: langValue});
      }

      getTrips() {
        fetch(`${API_URL}/get_paths/?source=${this.state.from}&dest=${this.state.to}&date=${this.state.year}:${this.state.month}:${this.state.day}`)
        .then(res => res.json())
        .then(
          (result) => {
            var tempTrips = [];
            for(var i = 0; i < result.trips.length; i++) {
              tempTrips.push(
                <TripInfo
                onBuy={this.handleBuy}
                key={i}
                source={result.trips[i].source}
                dest={result.trips[i].dest}
                flights={result.trips[i].flights}/>
              )
            };

            this.setState({
              form_error: false,
              trip_list: result.trips,
              trips: tempTrips
            });
          },
          (error) => {
            this.setState({
              form_error: true,
              trips: []
            });
          }
        )
      }
    
      render() {
        if(this.state.form_error) {
          var error = <div className="formError"> Error in user input </div>
        } else {
          var error = <div></div>
        }

        return (
          <div>
          <div className='tripFinder'>
          <form onSubmit={this.handleSubmit}>
            <label>
              From: 
              <select value={this.state.value} onChange={this.handleFromChange}>
                {this.state.values.map((item, index) => (
                <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              To: 
              <select value={this.state.value} onChange={this.handleToChange}>
                {this.state.values.map((item, index) => (
                <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </label>
            <br/>
            <label>
              Year:
            </label>
              <input type="number" name="year" onChange={this.handleDateChange}/>
              Month:
              <input type="number" name="month" onChange={this.handleDateChange}/>
              Day:
              <input type="number" name="day" onChange={this.handleDateChange}/>
            
          </form>
    
          <button onClick={this.handleSubmit}> Find Routes </button>
          
          </div>
          {error}
          <div className='tripList'>
          {this.state.trips}
          </div>
          </div>
        );
      }
}

class TripInfo extends React.Component {
    constructor(props) {
        super(props);
        var flightViews = [];
        this.props.flights.forEach(element => {
          flightViews.push(
            <FlightInfo {...element}/>
          )
        });

        this.state = {  
          flights:flightViews,
          collapsed: true
        };

        console.log(this.state.flights);
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
        if(this.state.collapsed) {
          this.setState({collapsed: false})
        } else {
          this.setState({collapsed: true})
        }
      }

      handleBuy = () => {
        this.props.onBuy(this.props.key);
      }
    
      render() {
        var main = (
        <div className='tripRow'> 
        <button onClick={this.handleBuy}> Buy Flight </button>
        Source: {this.props.source} 
        <div className='viewMoreButton' onClick={this.handleClick}> View Flights on Trip </div>
        </div>);

        if(this.state.collapsed) {
          return(main)
        }
        else {
          return(
            <div> 
              {main}
              {this.state.flights}
            </div>
          )
        }
      }
}

class TicketInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return(<div className='mainRow'>
      Ticket Number: {this.props.ticketID}
      <br/>
      Seat Number: {this.props.seat}
      <br/>
      Flight Number: {this.props.flight_number}
    </div>)
  }
}



export default User;