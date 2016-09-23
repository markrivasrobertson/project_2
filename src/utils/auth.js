import firebase from '../../firebase.config.js';

function requireAuth(nextState, replace) {
  if (firebase.auth().currentUser === null) {
    replace({
      pathname: '/login',
      state: { nextPathame: nextState.location.pathname },
    });
  }
}

module.exports = requireAuth;
