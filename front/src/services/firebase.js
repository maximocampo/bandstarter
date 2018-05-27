import * as firebase from 'firebase'
import { uploadSnippet } from "./authService";


var config = {
  apiKey: "AIzaSyAs4-CA7_AVj9rWOu2mYM-K_V_XeRQPb6M",
  authDomain: "bandstarter-e4143.firebaseapp.com",
  databaseURL: "https://bandstarter-e4143.firebaseio.com",
  projectId: "bandstarter-e4143",
  storageBucket: "bandstarter-e4143.appspot.com",
  messagingSenderId: "904715450266"
};
firebase.initializeApp(config);

const db = firebase.database();

const storageRef = firebase.storage().ref();
const snippetsRef = storageRef.child('snippets');
const picturesRef = storageRef.child('profilePic');

export function addTrack(file,whatfile){
  if(whatfile === 'snippets'){
    snippetsRef.child(file.name).put(file)
      .then(snap => {
        console.log('Uploaded file!');
      })
      .catch(e=>console.log(e))
  }
  if(whatfile === 'profilePic'){
    picturesRef.child(file.name).put(file)
      .then(snap => {
        console.log('Uploaded file!');
      })
      .catch(e=>console.log(e))
  }
}


