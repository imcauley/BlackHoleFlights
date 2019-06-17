import React from 'react';
import SideBar from './SideBar';
import FlightInfo from './FlightInfo';
import UserRow from './UserRow';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// import { EventEmitter } from 'events';
// import { eventNames } from 'cluster';

var API_URL = 'http://127.0.0.1:3000';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className='mainPage'> 
        <div className='mainPage'> 
        <SideBar
            className='pilotSideBar'
            tabs={['Add Destination', 'Assign Pilots', 'Add Pilots', 'Add Admins','Gold Tier Customers']} 
            defaultActive='Add Destination'
            mapper={{
                'Add Destination': (<DestinationForm/>), 
                'Assign Pilots': (<ViewOpenFlights/>),
                'Add Pilots': (<AddPilots/>),
                'Add Admins': (<p> add page </p>),
                'Gold Tier Customers': (<ViewGoldCustomers/>)
            }}
        />
        </div>
        
        </div>)
    }
}

class DestinationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        x: '',
        y: '',
        z: '',
        submitted: false,
        submit_error: false
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.resetForm = this.resetForm.bind(this);
    }

    resetForm(event) {
        this.setState({name: '', x:'', y:'', z:'', submitted: false})
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      this.setState({submitted: true});

      fetch('http://127.0.0.1:3000/add_destination', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            planetName: this.state.name,
            SGX: this.state.x,
            SGY: this.state.y,
            SGZ: this.state.z,
        })
      })


      event.preventDefault();
    }
  
    render() {
      if(!this.state.submitted) {
        return (
          <div>
          <div className='mainHeader'> Add Destination: </div>

          <div className="mainContent">
          <br/>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input name='name' type="text" value={this.state.name} onChange={this.handleChange}/>
              <br/>
            </label>
            <label>
              X Coordinate:
              <input name='x' type="number" value={this.state.x} onChange={this.handleChange}/>
              <br/>
              </label>
            <label>
              Y Coordinate: 
              <input name='y' type="number" value={this.state.y} onChange={this.handleChange}/>
              <br/>
              </label>
            <label>
              Z Coordinate:
              <input name='z' type="number" value={this.state.z} onChange={this.handleChange}/>
              <br/>
              </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
          </div>
        );
      }
      else {
        return (
          <div className='mainContent'> 
              Submitted new destination
              <button onClick={this.resetForm}> Add another </button>
          </div>
        )
      }
    }
}

class ViewOpenFlights extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        pilot_username: "",
        flight_number: -1
      };
      this.getFlights();

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
      //Signup for flight
      console.log(this.state);
      // console.log(this.state.flight_list[event.target.value].flight_number);
      // this.getFlights();
  }

  handleChange(event) {
    this.setState({flight_number: event.target.name, pilot_username: event.target.value});
  }

  getFlights() {
      fetch(`${API_URL}/get_unassigned_flights/`)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === 200) {
          var tempFlights = [];
          for (const [index, element] of result.flights.entries()) {
              tempFlights.push(
                <div> 
                    <FlightInfo key={index} {...element} />
                    <form>
                      <label> Pilot Username: </label>
                      <input type="text" name={element.flight_number} onChange={this.handleChange}/>
                    </form>
                    <div className='flightButton'> <button onClick={this.handleClick}> Sign Pilot Up </button> </div>
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

class AddPilots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user_rows: []
    };
    this.getNonePilots();
  }

  handleClick(event) {
    var user = this.state.users[event.target.index];


  }

  getNonePilots() {
    fetch(`${API_URL}/get_not_pilots`)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.status === 200) {
          var temp_user_rows = []
          for(let i = 0; i < result.users.length; i++) {
            temp_user_rows.push(
              <div> 
                <UserRow key={i} {...result.users[i]}/>
                <button onClick={this.handleClick} index={i}> Add as Pilot </button>
              </div>
            )
          }

          this.setState({
            form_error: false,
            users: result.users,
            user_rows: temp_user_rows
          });
      }
      },
      (error) => {
        this.setState({
          form_error: true,
          users: []
        });
      }
    )
  }

  render() {
    return(
    <div>
     <div className='mainHeader'> Add Pilots </div>
    {this.state.user_rows}
    </div>)
  }
}

class ViewGoldCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRows: [],
      users: []
    };
    this.getUsers();
  }

  getUsers() {
    fetch(`${API_URL}/get_all_users/`)
    .then(res => res.json())
    .then(
      (result) => {
        var tempUserRows = [];

        tempUserRows = result.users.map((item, index) => (
          <UserRow key={index} {...item} />
        ))

        this.setState({
          users: result.users,
          userRows: tempUserRows
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
    return (<div> 
      <div className='mainHeader'> Gold Status Users </div>
      {this.state.userRows} </div>)
  }
}
export default Admin;