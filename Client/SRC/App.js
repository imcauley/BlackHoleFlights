import React from 'react';
import './App.css';


const API_URL = 'http://localhost:3000/'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h3> Database retrieval </h3>
      <UserRow/>
      <br/>

      <h3> Selecting Form </h3>
      <SelectForm/>
      <br/>

      <h3> Fill Form </h3>
      <NameForm/> 
      <br/>

      <h3> Button & Dynamic List </h3>
      <CustomList/>
      <br/>

      <h3> Collapsable </h3>
      <Collapsable/>
      <Collapsable/>
      <Collapsable/>
      <br/>
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
            items: "API connection failed"
          });
        }
      )
  }

  render() {
    return (<p className='UserRow'> {this.state.items} </p>);
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

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (<div> {this.props.text} </div>)
  }
}

class CustomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({values: [...this.state.values, "new item"]});
    event.preventDefault();
  }

  render() {
    return (
    <div>
      <button onClick={this.handleClick}>Click me</button>
      {this.state.values.map((item, index) => (
        <ListItem text={item} key={index}/>
      ))}
    </div>
    )
  }
}

class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      value: '',
      values: ['Lime', 'Coconut', 'Lemon']
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            {this.state.values.map((item, index) => (
            <option value={item} key={index}>{item}</option>
            ))}
          </select>
        </label>
      </form>
      <p> Your favorite fruit is: {this.state.value} </p>
      </div>
    );
  }
}

class Collapsable extends React.Component {
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
    var main = <div className='UserRow' onClick={this.handleClick}> There is some stuff here </div>;
    if(this.state.collapsed) {
      return(main)
    }
    else {
      return(
        <div> 
          {main}
          <div className='expanded'> And here's some more stuff </div>
        </div>
      )
    }
  }
}

export default App;
