import React from "react";
import Link from "next/link";
import { AuthContext } from '../../context/auth';
import {useContext} from "react"

function Navbar(props){

    const {user,logOut} = useContext(AuthContext);

    function LoggedInUser(){
        return (
            <div className = "navbar-container">
                <Link href ="/">
                    <a className = "logo">proSpaces</a>
                </Link>
                <Link href ="/">
                    <a  onClick={()=>logOut()} className = "blue-button">Sign Out</a>
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