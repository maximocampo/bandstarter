import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAs4-CA7_AVj9rWOu2mYM-K_V_XeRQPb6M",
  authDomain: "bandstarter-e4143.firebaseapp.com",
  databaseURL: "https://bandstarter-e4143.firebaseio.com",
  projectId: "bandstarter-e4143",
  storageBucket: "bandstarter-e4143.appspot.com",
  messagingSenderId: "904715450266"
};
firebase.initializeApp(config);

const storageRef = firebase.storage().ref();
const snippetsRef = storageRef.child('snippets');

export function addTrack(file){
  snippetsRef.child(file.name).put(file)
    .then(snap => {
    console.log('Uploaded file!');
  })
    .catch(e=>console.log(e))
}

