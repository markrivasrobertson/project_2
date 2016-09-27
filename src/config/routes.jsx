import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../components/main.jsx';
import Home from '../components/home.jsx';
import Login from '../components/login.jsx';
import GroupView from '../components/group_view.jsx';
import UserView from '../components/user_view.jsx';
import NewPhoto from '../components/new_photo.jsx';
import { requireAuth, acceptAuth } from '../utils/auth.js';

class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home} />
          <Route path="/login" component={Login} onEnter={acceptAuth} />
          <Route path="/users" component={GroupView} onEnter={requireAuth} />
          <Route path="/users/:user" component={UserView} onEnter={requireAuth} />
          <Route path="/new_photo" component={NewPhoto} onEnter={requireAuth} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
