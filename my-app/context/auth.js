import React , {useReducer, createContext} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
  };

    if(typeof window !== 'undefined'){

        if (localStorage?.getItem('jwtToken')!=='undefined') {
            
            // const decodedToken = jwtDecode(localStorage?.getItem('jwtToken'));
        
            // if (decodedToken?.exp * 1000 < Date.now()) {
            //     localStorage?.removeItem('jwtToken');
            // } else {
            //     initialState.user = decodedToken;
            // }
        }
    }
    




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

function AuthProvider({children}){
    const [state,dispatch] = useReducer(authReducer, initialState)

    function logIn(userData){

        console.log(userData);
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
        <AuthContext.Provider value = {{user:state.user, logIn, logOut}}>{children}</AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}