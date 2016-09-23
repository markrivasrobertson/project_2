import React from 'react';
import firebase from '../../firebase.config.js';
import { withRouter } from 'react-router';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user_name: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleChange(e) {
    const stateObj = {};
    const stateKey = e.target.name;
    stateObj[stateKey] = e.target.value;
    this.setState(stateObj);
  }
  handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        const error = `${err.code} ${err.message}`;
        console.log(error);
      })
      .then(() => {
        console.log('login successful')
      })
      .then(() => {
        this.props.router.push('/');
      });
  }
  handleRegister(e) {
    e.preventDefault();
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      const error = `${err.code} ${err.message}`;
      console.log(error);
    })
    .then((user) => {
      firebase.database().ref('users')
        .child(user.uid)
        .set({ user_name: '',
        remaining: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
        'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
        'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
        'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
        'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
        urls: { AL: '', AK: '', AZ: '', AR: '', CA: '', CO: '', CT: '', DE: '', DC: '', FL: '',
        GA: '', HI: '', ID: '', IL: '', IN: '', IA: '', KS: '', KY: '', LA: '', ME: '',
        MD: '', MA: '', MI: '', MN: '', MS: '', MO: '', MT: '', NE: '', NV: '', NH: '',
        NJ: '', NM: '', NY: '', NC: '', ND: '', OH: '', OK: '', OR: '', PA: '', RI: '',
        SC: '', SD: '', TN: '', TX: '', UT: '', VT: '', VA: '', WA: '', WV: '', WI: '', WY: ''
        }
      });
    })
    .then(() => {
      this.props.router.push('/');
    });
  }
  render() {
    return (
      <div>
        <form>
          <h1>Login to catch em all with your friends</h1>
          <button type="submit" onClick={this.handleLogin}>Sign In</button>
          <input name="user_name" onChange={this.handleChange} type="text" placeholder="you@you.com" />
          <input name="email" onChange={this.handleChange} type="text" placeholder="you@you.com" />
          <input name="password" onChange={this.handleChange} type="password" placeholder="password" />
          <h3>Not a user yet?  Register today, totally free!</h3>
          <button type="submit" onClick={this.handleRegister}>Register Today!</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
