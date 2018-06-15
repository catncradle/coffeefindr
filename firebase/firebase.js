import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyCHDGNSkfmq-CzC5IKfrLjlnGvPOzjWMgI",
  authDomain: "coffee-finder-a7796.firebaseapp.com",
  databaseURL: "https://coffee-finder-a7796.firebaseio.com",
  projectId: "coffee-finder-a7796",
  storageBucket: "coffee-finder-a7796.appspot.com",
  messagingSenderId: "766456486450"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

module.exports = firebase;
