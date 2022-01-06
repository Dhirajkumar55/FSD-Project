import React from "react";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../firebase';
import {signOut} from 'firebase/auth'
import Link from "next/link";


function Navbar(props){

    const [user] = useAuthState(auth);

    function LoggedInUser(){
        return (
            <div className = "navbar-container">
                <a href ="/" className = "logo">proSpaces</a>
                <a href ="#" onClick={()=>signOut(auth)} className = "blue-button">Sign Out</a>
            </div>
        )
    }

    function Stanger(){
        return (
            <div className = "navbar-container">
                <a href ="/" className = "logo">proSpaces</a>
                <a href ="signUp" className = "blue-button">Get Started</a>
                <a href = "signIn" className = "white-button"> Sign In </a>
                
            </div>
        )
    }

    
    console.log(user);
    

    return (
        <div>
        {user ?(
            <LoggedInUser/>
        ):(
            <Stanger/>
        )}
    </div>
    )
   
}

export default Navbar;