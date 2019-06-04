import React from 'react';
import './App.css';


const API_URL = 'http://localhost:3000/'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <UserRow/>
      <NameForm/> 
      </header>
    </div>
  );
}


class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: "",
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    fetch(API_URL.concat('db_test/'))
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.first_user
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            items: "none"
          });
        }
      )
  }

  render() {
    return (<div className='UserRow'> {this.state.items} </div>);
  }
}


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitted: false
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({submitted: true});
    event.preventDefault();
  }

  render() {
    if(!this.state.submitted) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    else {
      return (
        <div> Thank you {this.state.value} </div>
      )
    }
  }
}

export default App;
