import React from 'react';

class UserRow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
      };
    }
  
    render() {
        return(
            <div className='flightRow'>
                Username: {this.props.username}
                {` - `}
                User ID: {this.props.id}
                <br/>
                Phone Number: {this.props.phone_number}
                {` - `}
                E-Mail: {this.props.email}
            </div>
        );
    }
}

export default UserRow;