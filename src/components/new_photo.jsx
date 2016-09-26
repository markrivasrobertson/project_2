import React from 'react';
import request from 'superagent';
import firebase from '../../firebase.config.js';

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
   'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
   'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
   'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
   'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

class NewPhoto extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.acceptURL = this.acceptURL.bind(this);
    this.acceptPlate = this.acceptPlate.bind(this);
    this.state = {
      plate: '',
      url: '',
    };
  }
  acceptURL(e) {
    const newURL = e.target.value;
    this.setState({
      url: newURL,
    });
  }
  acceptPlate(e) {
    const newPlate = e.target.value;
    this.setState({
      plate: newPlate,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const currentUser = firebase.auth().currentUser.uid;
    const url = `https://license-plate-scavenger-hunt.firebaseio.com/users/${currentUser}/urls/${this.state.plate}.json`;
    const objURL = this.state.url;
    console.log(url);
    console.log(this.state);
    request.patch(url)
      .send({ url: objURL })
      .then(console.log('patch state url sent'));
  }
  render() {
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
       'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
       'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
       'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
       'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const statesRemaining = states.map((state, idx) => {
      return (
        <option key={idx}>{state}</option>
      );
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="url" onChange={this.acceptURL} />
          <select onChange={this.acceptPlate}>
            {statesRemaining}
          </select>
          <button type="submit">Add Plate</button>
        </form>
      </div>
    );
  }
}

export default NewPhoto;
