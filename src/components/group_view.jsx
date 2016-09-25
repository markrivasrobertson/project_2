import React from 'react';
import firebase from '../../firebase.config.js';
import request from 'superagent';

// const propTypes = {
  // users: React.PropTypes.array.isRequired,
  // message: React.PropTypes.string.isRequired,
// };

class GroupView extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.getUsers = this.getUsers.bind(this);
  }
  componentWillMount() {
    console.log('component pre mounting');
    setTimeout(() => {
      this.getUsers();
    });
  }
  getUsers() {
    console.log('get users called');
    const url = 'https://license-plate-scavenger-hunt.firebaseio.com/users/.json';
    request.get(url).then((response) => {
      let users = [];
      const userData = response.body;
      if (userData) {
        users = Object.keys(userData).map((id) => {
          // const individualUser = userData[id].user_name;
          return {
            // user: individualUser,
            user: userData[id].user_name,
            remaining: userData[id].remaining.length,
          };
        });
      }
      this.setState({ users: users, });
    });
  }
  componentDidMount() {
    // this.getUsers();
    console.log('component mounted');
  }
  render() {
    // const userNames = [];
    // const userArray = this.state.users;
    // const userNameList = userArray.map((obj) => {
    //   let individualName = obj.user;
    //   userNames.push(individualName);
    // });
    // const displayedProfiles = userNames.map((name, idx) => {
    const displayedProfiles = this.state.users.map((obj, idx) => {
      let individualName = obj.user;
      console.log(individualName);
      let individualRemaining = obj.remaining;
      console.log(individualRemaining);
      return (
        <div key={idx} className="userListDisplay">
          {individualName}<br/>{individualRemaining} states to go
          <button>View Profile</button>
        </div>
      );
    });
    return (
      <ul>
        {displayedProfiles}
      </ul>
    );
  }
}

// GroupView.propTypes = propTypes;

export default GroupView;


/*
const userNames = this.props.users.map((userName, idx) => {
  return (
    <li key={idx}>{userName}</li>
  );
});

*/
