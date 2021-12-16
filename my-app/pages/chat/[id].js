
import {useEffect} from 'react';
import ChatPage from '../../components/chatpage/ChatPage'
import Navbar from "../../components/navbar/Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,provider,db} from "../../firebase";
import {useAuth} from "../../context/AuthUserContext"
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs } from "firebase/firestore";
import SignUp from "../signUp";
import Loading from '../../components/chatpage/Loading'
import Sidebar from '../../components/chatpage/Sidebar';
import ChatsScreen from  "../../components/chatpage/ChatsScreen"
import styled from "styled-components";
import {useRouter} from 'next/router'



function Chat(){
    const router =  useRouter();
    const id=router.query.id;
    const ref =  getDocs(collection(db,'chats'));
    console.log("ref: ",ref)

    console.log(id);
    const [user,loading] = useAuthState(auth)
    console.log(user);

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
                <Container>
                    <Sidebar/>
                    <ChatsContainer>
                        <ChatsScreen/>
                    </ChatsContainer>
                </Container>
            </div>
        )
    }
}


export default Chat;

// export async function getServerSideProps(context){
//     const ref = doc(collection(db,'chats'));

// }


const Container = styled.div`
    display:flex;
`;

const ChatsContainer = styled.div`
    flex: 1;
    height:100vh
    overflow: scroll;

    ::-webkit-scrollbar{
        display : none;
    }
    -ms-overflow-style: none;
    scrollbar-width:none;
`;