import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <UserRow/>
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
    fetch("http://localhost:3000/db_test/")
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

export default App;
