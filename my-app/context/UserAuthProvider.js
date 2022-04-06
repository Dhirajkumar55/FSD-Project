import {createContext,useState,useContext} from "react";

const userSnapshot = {
    isLoggedIn: false,
    user:null
}

export const userAuthContext = createContext();

export function UserAuthProvider({children}){
    const [user,setUser] = useState(userSnapshot);

    function logIn(){
        setUser({
            isLoggedIn:true,
            user:{
                name:"Dhiraj",
                id:"63499901knjdckl1200",
                email:"dhiruch2000@gmail.com",
            }
        });
    }

    function logOut(){
        setUser(userSnapshot);
    }

    return (
        <userAuthContext.Provider value={{user, logIn, logOut}}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth(){
    const {user, logIn, logOut} = useContext(userAuthContext);

    return {user,logIn, logOut};
}