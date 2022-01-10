import React, {useContext} from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/homepage/Banner";
import {auth,} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import Footer from "../components/homepage/footer";
function App(){

  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Footer/>
    </div>
  )
}
export default App;