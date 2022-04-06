import React , {useReducer, createContext, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
  };

const AuthContext = createContext({
    user:null,
    logIn:()=>{},
    logOut: ()=>{}
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
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state,dispatch] = useReducer(authReducer, initialState)

        if(typeof window !== 'undefined'){
            console.log(localStorage?.getItem('jwtToken'));
            if (localStorage?.getItem('jwtToken') !== 'undefined' && localStorage?.getItem('jwtToken')!==null) {
                const decodedToken = jwtDecode(localStorage?.getItem('jwtToken'));
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage?.removeItem('jwtToken');
                } 
                else {
                    state.user = decodedToken;
                }
            }
        }

    function logIn(userData){

        console.log("userData:",userData);
            localStorage.setItem('jwtToken', userData?.token);
        
        dispatch({
            type: 'LOGIN',
            payload: userData,
        })
    }

    function logOut(userData){
        
            localStorage?.removeItem('jwtToken');
        
        dispatch({
            type: 'LOGOUT',
        })
    }

    return (
        <AuthContext.Provider value = {{user:state.user, logIn, logOut}} {...props}/>
    )
}

export {AuthContext, AuthProvider}