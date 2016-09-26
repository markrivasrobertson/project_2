import React from 'react';
import request from 'superagent';
import firebase from '../../firebase.config.js';

class UserView extends React.Component {
  constructor() {
    super();
    this.state = {
      photoArr: [],
      user: '',
    }
  }
  componentDidMount() {
    const currentUser = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser);
    const url = `https://license-plate-scavenger-hunt.firebaseio.com/users/${currentUser}.json`;
    console.log('component did mount');
    request.get(url)
      .then((response) => {
        const photoURLs = response.body.urls;
        const photoArr = Object.keys(photoURLs).map((state, idx) => {
          return (
            <li key={idx}><img src={photoURLs[state].url} /></li>
          );
        });
        this.setState({
          photoArr: photoArr,
          user: firebase.auth().currentUser.email,
        });
        console.log(this.state);
      });
  }
  render() {
    return (
      <div>
        <h1>{this.state.user}</h1>
        <ul>
          {this.state.photoArr}
        </ul>
      </div>
    );
  }
}


export default UserView;

/*
return {
  <li key={idx}><img src={plateData[state].url} /></li>
};
});
}

let plateImages = [];
const currentUser = firebase.auth().currentUser.uid;
console.log(currentUser);
const url = `https://license-plate-scavenger-hunt.firebaseio.com/users/${currentUser}/urls/.json`;
request.get(url).then((response) => {
  const plateData = response.body;
  console.log(plateData);
  if (plateData) {
    plateImages = Object.keys(plateData).map((state, idx) => {
      return (
        <li key={idx} >{state}</li>
      );
    });
  }
});
return (
  <ul>
    {plateImages}
  </ul>
);
}
*/
