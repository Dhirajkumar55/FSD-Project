import React, {useContext} from "react";
import { Context } from "../context";
import { useRouter} from "next/router"
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/homepage/Banner";

function App(){
  return (
    <div>
      <Navbar />
      <Banner/>
    </div>
  )
}
export default App;