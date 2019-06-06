import React from 'react';
import DestinationSelector from './DestinationSelector';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className='mainPage'> 
        <p> I'm a user </p>
        <DestinationSelector/>
        </div>)
    }
}

export default User;