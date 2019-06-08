import React from 'react';
import DestinationSelector from './DestinationSelector';
import SideBar from './SideBar';

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
                'My Tickets': (<p> add page </p>)
            }}
        />
        </div>
        </div>)
    }
}

class LookFlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
          from: '',
          to: '',
          values: ['Earth', 'Mars', 'Venus']
        };
    
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleFromChange(event) {
        this.setState({from: event.target.value});
      }
    
      handleToChange(event) {
        this.setState({to: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.to);
        console.log(this.state.from);
      }
    
      render() {
        return (
          <div>
          <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              From: 
              <select value={this.state.value} onChange={this.handleFromChange}>
                {this.state.values.map((item, index) => (
                <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </label>
          </form>
    
          <form onSubmit={this.handleSubmit}>
            <label>
              To: 
              <select value={this.state.value} onChange={this.handleToChange}>
                {this.state.values.map((item, index) => (
                <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </label>
          </form>
    
          <button onClick={this.handleSubmit}> Find Routes </button>
          </div>

          <div className='tripList'>
            <TripInfo
            source="Earth"
            dest="Mars"
            flights={[
                <FlightInfo/>,
                <FlightInfo/>
            ]}/>
          </div>
          <div className='tripList'>
            <TripInfo
            source="Earth"
            dest="Mars"
            flights={[
                <FlightInfo/>,
            ]}/>
          </div>

          </div>
        );
      }
}

class TripInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
          collapsed: true
        };
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        if(this.state.collapsed) {
          this.setState({collapsed: false})
        } else {
          this.setState({collapsed: true})
        }
      }
    
      render() {
        var main = (
        <div className='tripRow' onClick={this.handleClick}> 
        Source: {this.props.source} 
        </div>);

        if(this.state.collapsed) {
          return(main)
        }
        else {
          return(
            <div> 
              {main}
              {this.props.flights}
            </div>
          )
        }
      }
}

class FlightInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
      };
    }
  
    render() {
        return(
            <div className='flightRow'>
            <p> Flight 1 </p>
            </div>
        );
    }
}

export default User;