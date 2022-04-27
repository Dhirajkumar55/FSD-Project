import { initializeApp,getApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged , GoogleAuthProvider} from "firebase/auth";

let app;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDU8zzMP5Ofmq71EpNWibua_kw_wHfM2oA",
    authDomain: "chat-functionality-e402d.firebaseapp.com",
    projectId: "chat-functionality-e402d",
    storageBucket: "chat-functionality-e402d.appspot.com",
    messagingSenderId: "141878280087",
    appId: "1:141878280087:web:b4b03988aad153bdb50ed2",
    measurementId: "G-SEL0GX42EL"
  };


if(getApps.length){
  app = getApp();
} else{
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const auth = getAuth(app);
onAuthStateChanged(auth, user => {
  // Check for user status
});
const provider = new GoogleAuthProvider();

export {db,auth,provider};