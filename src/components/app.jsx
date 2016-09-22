import React from 'react';
import request from 'superagent';

const propTypes = {
  message: React.PropTypes.string.isRequired,
};

class App extends React.Component {
  // componentDidMount() {
  //   
  // }
  render() {
    return (
      <div>
        <h1>Hello There click me</h1>
        <img alt="bill murray pic" src={this.props.message} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
