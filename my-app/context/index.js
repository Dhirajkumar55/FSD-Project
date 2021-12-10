import React,  { useState, createContext } from 'react';

export const Context = createContext();

export const ContextProvider = (props) =>{
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const value = {
        username, 
        setUsername,
        password,
        setPassword
    }

    return <Context.Provider value = {value}> {props.children}</Context.Provider>
}