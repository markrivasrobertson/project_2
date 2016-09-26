import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../components/main.jsx';
import Home from '../components/home.jsx';
import Login from '../components/login.jsx';
import GroupView from '../components/group_view.jsx';
import UserView from '../components/user_view.jsx';
// import NewPhoto from '../components/new_photo.jsx';
// import Photo from '../components/photo.jsx';
import requireAuth from '../utils/auth.js';

const propTypes = {
  message: React.PropTypes.string.isRequired,
};

class Routes extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   users: [],
    // };
    // this.getUsers = this.getUsers.bind(this);
  }
  // componentDidMount() {
  //   this.getUsers();
  // }
  // getUsers() {
  //   const url = 'https://license-plate-scavenger-hunt.firebaseio.com/users/.json';
  //   request.get(url).then((response) => {
  //     let users = [];
  //     const userData = response.body;
  //     if (userData) {
  //       users = Object.keys(userData).map((id) => {
  //         const individualUser = userData[id].user_name;
  //         return {
  //           user: individualUser,
  //         };
  //       });
  //     }
  //     this.setState({ users: users });
  //   });
  // }
  render() {
    // console.log(this.props.message);
    // console.log(this.state.users);
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} />
          <Route path="/users" component={GroupView} onEnter={requireAuth} />
          <Route path="/users/:user" component={UserView} onEnter={requireAuth} />
        </Route>
      </Router>
    );
  }
}

Routes.propTypes = propTypes;

export default Routes;

/*

<Route path="/users" component={GroupView} onEnter={requireAuth} />
<Route path="/users/:user" component={UserView} onEnter={requireAuth} />
<Route path="/new_photo" component={NewPhoto} onEnter={requireAuth} />
<Route path="/:photo" component={Photo} onEnter={requireAuth} />
*/
