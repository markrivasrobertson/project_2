import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../components/main.jsx';
import Home from '../components/home.jsx';
import Login from '../components/login.jsx';
import GroupView from '../components/group_view.jsx';
// import UserView from '../components/user_view.jsx';
// import NewPhoto from '../components/new_photo.jsx';
// import Photo from '../components/photo.jsx';
import requireAuth from '../utils/auth.js';


const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="/users" component={GroupView} onEnter={requireAuth} />
      </Route>
    </Router>
  );
};

export default Routes;

/*

<Route path="/users" component={GroupView} onEnter={requireAuth} />
<Route path="/users/:user" component={UserView} onEnter={requireAuth} />
<Route path="/new_photo" component={NewPhoto} onEnter={requireAuth} />
<Route path="/:photo" component={Photo} onEnter={requireAuth} />
*/
