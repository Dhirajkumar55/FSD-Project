import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDU8zzMP5Ofmq71EpNWibua_kw_wHfM2oA",
    authDomain: "chat-functionality-e402d.firebaseapp.com",
    projectId: "chat-functionality-e402d",
    storageBucket: "chat-functionality-e402d.appspot.com",
    messagingSenderId: "141878280087",
    appId: "1:141878280087:web:b4b03988aad153bdb50ed2",
    measurementId: "${config.measurementId}"
  };


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,provider};
