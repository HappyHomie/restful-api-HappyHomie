const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyC8jWT_Cm6E46THWaZo-4tXEXhUVAO6H-s",
    authDomain: "briansostebiks1.firebaseapp.com",
    databaseURL: "https://briansostebiks1.firebaseio.com",
    projectId: "briansostebiks1",
    storageBucket: "briansostebiks1.appspot.com",
    messagingSenderId: "929295290847",
    appId: "1:929295290847:web:00e83a03fb08b1a235f46a"
  };


const db = firebase.initializeApp(firebaseConfig);

module.exports = db;

