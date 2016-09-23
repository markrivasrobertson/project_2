const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyAVKB3v4lD7l_-5qV3IfPqDPdlnTEEIBkI',
  authDomain: 'license-plate-scavenger-hunt.firebaseapp.com',
  databaseURL: 'https://license-plate-scavenger-hunt.firebaseio.com',
  storageBucket: 'license-plate-scavenger-hunt.appspot.com',
  messagingSenderId: '451718852930',
};

firebase.initializeApp(config);

module.exports = firebase;
