import React from 'react';

class FlightInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
      };
    }
  
    render() {
        return(
            <div className='flightRow'>
            <div> Flight: {this.props.flight_number} {"\n"} </div>
            <div> 
              Source: {this.props.source} {` - `}
              Destination: {this.props.destination}
            </div>
            {"\n"}
            <div> 
              Departure: {this.props.dep_hour}:{this.props.dep_minute}
              {`\t`}
            </div>
            <br/>
            <div>
              Seats Left: {this.props.seats_left}
            </div>
            </div>
        );
    }
}

export default FlightInfo;