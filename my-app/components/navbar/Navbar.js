import React from "react";

function Navbar(props){
    return (
        <div className = "navbar-container">
            <a href ="signUp" className = "blue-button">Get Started</a>
            <a href = "signIn" className = "white-button"> Sign In </a>
            
        </div>
    )
}

export default Navbar;