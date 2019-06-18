import React from 'react';

class DestinationSelector extends React.Component {
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
  }

  render() {
    return (
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
    );
  }
}

export default DestinationSelector;