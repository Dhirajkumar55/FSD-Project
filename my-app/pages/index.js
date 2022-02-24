import React, {useContext} from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/homepage/Banner";
import {db,auth} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {setDoc,doc,serverTimestamp} from "firebase/firestore";
import Footer from "../components/homepage/Footer";
import {useEffect} from 'react';

function App(){

  const [user,loading] = useAuthState(auth);

  useEffect(()=>{
    if(user){
        setDoc(doc(db,'users',user.uid),{
            email: user.email,
            lastSeen : serverTimestamp(),
            photo:user.photoURL,
            name:user.displayName,
        },{merge:true})
    }
},[user])

  return (
    <div>
      <Navbar/>
      <Banner/>
      <Footer/>
    </div>
  )
}
export default App;