import React, {useContext} from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/homepage/Banner";
import {db,auth} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {setDoc,doc,serverTimestamp} from "firebase/firestore";
import Footer from "../components/homepage/Footer";
import {useEffect} from 'react';

function App(){
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Footer/>
    </div>
  )
}
export default App;