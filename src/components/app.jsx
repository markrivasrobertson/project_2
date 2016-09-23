import React from 'react';
import request from 'superagent';

const propTypes = {
  message: React.PropTypes.string.isRequired,
};

class App extends React.Component {
  componentDidMount() {
    let imageToShow;
    const url = 'https://license-plate-scavenger-hunt.firebaseio.com/.json';
    request.get(url).then((response) => {
      imageToShow = response.body.users.Meredith;
      console.log(imageToShow);
      let imagesOfNaN = Object.keys(imageToShow);
      console.log(imagesOfNaN);
    });
  }
  render() {
    // let imageToShow;
    // const url = 'https://license-plate-scavenger-hunt.firebaseio.com/Bill/.json';
    // request.get(url).then((response) => {
    //   imageToShow = response.body;
    //   console.log(imageToShow+' is the response from firebase');
    // });
    return (
      <div>
        <h1>Hello There click me</h1>
        <img src="//i.imgur.com/3Hk1OFO.jpg" alt={this.props.message} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
