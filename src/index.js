import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import * as firebase from 'firebase';

const destination = document.getElementById("mainContainer");

ReactDOM.render(
  <React.Fragment>
    <Header />
    <SideMenu />
  </React.Fragment>,
  destination
);

var firebaseConfig = {
  apiKey: "AIzaSyB9btt9B0h0IaF33xkEUH6EyPdsacWh7lQ",
  authDomain: "react-library-15d5f.firebaseapp.com",
  databaseURL: "https://react-library-15d5f.firebaseio.com",
  projectId: "react-library-15d5f",
  storageBucket: "react-library-15d5f.appspot.com",
  messagingSenderId: "1030142681853",
  appId: "1:1030142681853:web:01750638436daace6d5494",
  measurementId: "G-M8HRQV7VCZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();