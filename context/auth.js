import React , {useReducer, createContext, useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import {getUserDetails} from "../utils/getUserDetails";
import { client } from '../graphql/client/clientSetup';
import {USER_DETAILS} from '../graphql/client/queries'

const initialState = {
    user: null
  };

const AuthContext = createContext({
    user:null,
    logIn:()=>{},
    logOut: ()=>{},
    signUp:()=>{},
})

function authReducer(state,action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user:action?.payload
            }
        case 'LOGOUT':{
            return {
                ...state,
                user:null
            }
        }
        case 'SIGNUP':{
            return {
                ...state,
                user:action?.payload
            }
        }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state,dispatch] = useReducer(authReducer, initialState)

    if(typeof window !== 'undefined'){
        // console.log(localStorage?.getItem('jwtToken'));
        if (localStorage?.getItem('jwtToken') !== 'undefined' && localStorage?.getItem('jwtToken')!==null) {
            const decodedToken = jwtDecode(localStorage?.getItem('jwtToken'));
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage?.removeItem('jwtToken');
            } 
            else {
                state.user = decodedToken;
                // console.log(decodedToken);
            }
        }
    }

    function signUp(userData){
        localStorage?.setItem('jwtToken', userData?.token);
        dispatch({
            type: 'SIGNUP',
            payload: userData,
        })
    }

    function logIn(userData){

        localStorage.setItem('jwtToken', userData?.token);
        
        dispatch({
            type: 'LOGIN',
            payload: userData,
        })
    }

    function logOut(){
        
        localStorage?.removeItem('jwtToken');
        
        dispatch({
            type: 'LOGOUT',
        })
    }

    return (
        <AuthContext.Provider value = {{user:state.user, logIn, logOut, signUp}} {...props}/>
    )
}

export {AuthContext, AuthProvider}