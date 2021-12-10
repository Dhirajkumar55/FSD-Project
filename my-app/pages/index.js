import React, {useContext} from "react";
import { Context } from "../context";
import { useRouter} from "next/router"
import axios from "axios";
import Navbar from "../components/navbar/Navbar";

function App(){
  return (
    <div>
      <Navbar />
      
    </div>
  )
}
export default App;