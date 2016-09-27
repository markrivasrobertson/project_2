import { withRouter, Link } from 'react-router';
import React from 'react';
import firebase from '../../firebase.config.js';

const propTypes = {
  children: React.PropTypes.element.isRequired,
};

class Main extends React.Component {
  constructor() {
    super();
    this.signOut = this.signOut.bind(this);
    this.loggedInLinks = this.loggedInLinks.bind(this);
  }
  signOut() {
    firebase.auth().signOut().then(() => {
      console.log('signed out successfully')
    })
    .then(() => {
      this.props.router.push('/');
    });
  }
  loggedInLinks() {
    if (firebase.auth().currentUser === null) {
      return (
        <Link to="/login">Sign In</Link>
      );
    } else {
      return (
        <Link to="/" onClick={this.signOut}>Sign Out</Link>
      );
    }
  }
  render() {
    if (firebase.auth().currentUser) {
    }
    return (
      <div>
        <div id="navbar">
          <div className="navbar" id="appname">Plate Catcher</div>
          <div className="navbar" id="login">Login / Register</div>
        </div>
        <div id="main-content">
          {this.props.children}
        </div>
        <br /><Link to="/new_photo" >Add a Photo</Link><br />
        {
          this.loggedInLinks()
        }
      </div>
    );
  }
}

Main.propTypes = propTypes;

export default withRouter(Main);
