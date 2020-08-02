
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAv30YsVW1oSnJbTMSVHKKPmg69zd4sLaU",
    authDomain: "tic-tac-toe-e15a6.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-e15a6.firebaseio.com",
    projectId: "tic-tac-toe-e15a6",
    storageBucket: "tic-tac-toe-e15a6.appspot.com",
    messagingSenderId: "644343342481",
    appId: "1:644343342481:web:7f8643121bf9a0a9dde630"
  };

var fire = firebase.initializeApp(firebaseConfig);

export default fire;
