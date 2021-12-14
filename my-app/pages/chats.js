
import {useEffect} from 'react';
import ChatPage from '../components/chatpage/ChatPage'
import Navbar from "../components/navbar/Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db,provider} from "../firebase";
import { doc,serverTimestamp,setDoc } from "firebase/firestore";
import SignUp from "./signUp";
import Loading from '../components/chatpage/Loading'

function Chats(){

    const [user,loading] = useAuthState(auth)


    useEffect(()=>{
        if(user){
            setDoc(doc(db,'users',user.uid),{
                email: user.email,
                lastSeen : serverTimestamp(),
                photo:user.photoURL,
            },{merge:true})
        }
    },[user])

    if(loading) return <Loading/>

    if(!user) return <SignUp/>
    else{
        return (
            <div>
                <Navbar/>
                <ChatPage/>
            </div>
        )
    }
}


export default Chats;