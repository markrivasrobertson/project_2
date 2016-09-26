import firebase from '../../firebase.config.js';

function requireAuth(nextState, replace) {
  if (firebase.auth().currentUser === null) {
    replace({
      pathname: '/login',
      state: { nextPathame: nextState.location.pathname },
    });
  }
}
function acceptAuth(nextState, replace) {
  if (firebase.auth().currentUser !== null) {
    replace({
      pathname: '/users',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

module.exports = requireAuth;
module.exports = acceptAuth;
