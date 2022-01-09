import {useEffect} from 'react';
import ChatPage from '../../components/chatpage/ChatPage'
import Navbar from "../../components/navbar/Navbar";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,provider,db} from "../../firebase";
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs } from "firebase/firestore";
import SignUp from "../signUp";
import Loading from '../../components/chatpage/Loading'
import Sidebar from '../../components/chatpage/Sidebar';
import ChatsScreen from  "../../components/chatpage/ChatsScreen"
import styled from "styled-components";
import {useRouter} from 'next/router'
import Image from "next/image";
import ReadytoChat from "../../public/readyToChat.svg"



function Chat({chat, messages}){
    const router =  useRouter();
    // const ref =  doc(collection(db,'chats'),router.query.id);

    // console.log(id);
    const [user,loading] = useAuthState(auth)

    useEffect(()=>{
        if(user){
            setDoc(doc(db,'users',user.uid),{
                email: user.email,
                lastSeen : serverTimestamp(),
                photo:user.photoURL,
                name:user.displayName,
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
                        {
                            router.query.id === "1"?(
                            <div style={{display:'grid', placeItems: 'center',height: '90vh',opacity:"0.8"}}>
                                <Image 
                                    src = {ReadytoChat} 
                                    alt = "Ready to chat"
                                    height = "600"
                                    width = "600"
                                >
                                </Image>
                            </div>
                            ): (
                            <ChatsScreen chat={chat} messages={messages}/>
                            )

                        }
                       
                    </ChatsContainer>
                </Container>
            </div>
        )
    }
}


export default Chat;

export async function getServerSideProps(context){
    const chatRef = doc(collection(db,'chats'),context.query.id);

    const messagesRes = await getDocs(query(collection(chatRef,'messages'),orderBy('timestamp','asc')));

    // console.log("type: ",typeof messagesRes.docs);
    // const messages = await onSnapshot(messagesRes, (doc)=>{
    //     console.log("doc data: ",doc.data());
    // })
    const messages = messagesRes.docs.map(message => ({
        id: message.id,
        ...message.data()
    })).map(message => ({
        ...message,
        timestamp: message.timestamp?.toDate().getTime()
    }));

    const chatSnapShot = await getDoc(chatRef);

    const chat = {
        id: chatSnapShot.id,
        ...chatSnapShot.data()
    }

    return {
        props:{ chat, messages: JSON.stringify(messages) },
    };

}


const Container = styled.div`
    display:flex;
`;

const ChatsContainer = styled.div`
    flex: 1;
    height:100vh;
    ::-webkit-scrollbar {
		display: none !important;
	}
	-ms-overflow-style: none !important; /* IE and Edge */
	scrollbar-width: none !important; /* Firefox */

    
`;