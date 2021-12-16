import React, {useContext} from "react";

import { useRouter} from "next/router"
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/homepage/Banner";
import {auth,} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth";
function App(){

  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div>
      <Navbar/>
      <Banner/>
    </div>
  )
}
export default App;