import React from 'react';
import request from 'superagent';
// import firebase from '../../firebase.config.js';

const propTypes = {
  id: React.PropTypes.string.isRequired,
};

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.id,
      photoArr: [],
    };
  }
  componentDidMount() {
    // const currentUser = firebase.auth().currentUser.uid;
    // console.log(firebase.auth().currentUser);
    const url = `https://license-plate-scavenger-hunt.firebaseio.com/users/${this.state.uid}.json`;
    console.log(this.state);
    console.log('component did mount');
    request.get(url)
      .then((response) => {
        console.log(response);
        const photoURLs = response.body.urls;
        const photoArr = Object.keys(photoURLs).map((state, idx) => {
          return (
            <li key={idx} className="images"><img alt="plate" src={photoURLs[state].url} /></li>
          );
        });
        this.setState({
          photoArr: photoArr,
        });
      });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.photoArr}
        </ul>
      </div>
    );
  }
}

UserView.propTypes = propTypes;

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
