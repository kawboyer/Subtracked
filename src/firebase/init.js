import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCT-cxaeL9QVljaDNXrDY1KhEdSCYDZ_Po",
    authDomain: "subtrack-fb-db.firebaseapp.com",
    databaseURL: "https://subtrack-fb-db.firebaseio.com",
    projectId: "subtrack-fb-db",
    storageBucket: "subtrack-fb-db.appspot.com",
    messagingSenderId: "1044549477444"
  };
 const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()