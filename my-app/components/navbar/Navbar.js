import React from "react";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../firebase';

function Stanger(){
    return (
        <div className = "navbar-container">
            
            <a href ="signUp" className = "blue-button">Get Started</a>
            <a href = "signIn" className = "white-button"> Sign In </a>
            
        </div>
    )
}

function LoggedInUser(props){
    return (
        <div className = "navbar-container">
            <h3>{()=>{console.log(typeof(props.user))}}</h3>
            <a href ="#" className = "blue-button">Sign Out</a>
            
        </div>
    )
}

function Navbar(props){

    const [user] = useAuthState(auth);
    console.log(user)
    
    return <Stanger/>
   
}

export default Navbar;