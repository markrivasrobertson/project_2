import React from 'react';
import request from 'superagent';
import firebase from '../../firebase.config.js';
window.request = request;

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
    // this.reduceRemaining = this. reduceRemaining.bind(this);
    this.state = {
      plate: '',
      url: '',
    };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser.email;
    if (user) {
      console.log(user);
    }
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
    let url = `https://license-plate-scavenger-hunt.firebaseio.com/users/${currentUser}.json`;
    request.get(url).then((response) => {
      let remaining = response.body.remaining;
      remaining -= 1;
      request.patch(url)
        .send({ remaining })
        .then(() => {
          url = `https://license-plate-scavenger-hunt.firebaseio.com/users/${currentUser}/urls/${this.state.plate}.json`;
          request.patch(url)
            .send({ url: this.state.url })
            .then(() => {
            });
        });
    })
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
