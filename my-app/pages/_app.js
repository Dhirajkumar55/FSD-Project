
import "../styles/header.css";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../firebase";


function MyApp({ Component, pageProps }) {




  return (
    
    <Component {...pageProps} />
    
  )
}

export default MyApp
