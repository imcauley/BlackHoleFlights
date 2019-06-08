import React from 'react';
import SideBar from './SideBar';

class Admin extends React.Component {
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
            tabs={['Add Destination', 'Assign Pilots']} 
            defaultActive='Add Destination'
            mapper={{
                'Add Destination': (<DestinationForm/>), 
                'Assign Pilots': (<p> add page </p>)
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
        submitted: false
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
            name: this.state.name,
            x: this.state.x,
            y: this.state.y,
            z: this.state.z,
            secondParam: 'yourOtherValue',
        })
      })


      event.preventDefault();
    }
  
    render() {
      if(!this.state.submitted) {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input name='name' type="text" value={this.state.name} onChange={this.handleChange}/>
              <br/>
            </label>
            <label>
              X Coordinate:
              <input name='x' type="text" value={this.state.x} onChange={this.handleChange}/>
              <br/>
              </label>
            <label>
              Y Coordinate: 
              <input name='y' type="text" value={this.state.y} onChange={this.handleChange}/>
              <br/>
              </label>
            <label>
              Z Coordinate:
              <input name='z' type="text" value={this.state.z} onChange={this.handleChange}/>
              <br/>
              </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
      else {
        return (
          <div> 
              Submitted new destination
              <button onClick={this.resetForm}> Add another </button>
          </div>
        )
      }
    }
}

export default Admin;