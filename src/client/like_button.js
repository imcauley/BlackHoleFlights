'use strict';

const ip = '127.0.0.1'
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

class TestObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: "",
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    fetch("https://ipinfo.io/json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.ip
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            items: "none"
          });
        }
      )
  }


  render() {
    return this.state.items;
  }

}

const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);
ReactDOM.render(e(TestObject), domContainer);