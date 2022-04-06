import React from "react";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../firebase';
import {signOut} from 'firebase/auth'
import Link from "next/link";
import { AuthContext } from '../../context/auth';
import {useContext} from "react"

function Navbar(props){

    const {user} = useContext(AuthContext);

    function LoggedInUser(){
        return (
            <div className = "navbar-container">
                <Link href ="/">
                    <a className = "logo">proSpaces</a>
                </Link>
                <Link href ="/">
                    <a  onClick={()=>signOut(auth)} className = "blue-button">Sign Out</a>
                </Link>
            </div>
        )
    }

    function Stanger(){
        return (
            <div className = "navbar-container">
                <Link href = "/">
                    <a className = "logo">proSpaces</a>  
                </Link>
                <Link href = "/signUp">
                    <a className = "blue-button">Get Started</a>
                </Link>
                <Link href = "/signIn">
                    <a className = "white-button"> Sign In </a>
                </Link>
            </div>
        )
    }


    // console.log(user);
    

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