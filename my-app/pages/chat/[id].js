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
import ReadytoChat from "../../public/readyToChat.svg";




// This [id].js is a dynamic page and the id gets populated when a id is passed as a
// prop to the page. We can get the id value from the useRouter hook defined in Nextjs docs.

function Chat({chat, messages}){

    // this is the useRouter hook 
    const router =  useRouter();

    // the useAuthState hook is used for maintaining the user status, whether he is logged in or not.
    // it also returns a loading state which tells us that whether the user is logged in or not
    // (i.e) as this hook returns a promise, the loading is set to true if there is no user status,
    // and false once we get the user is logged in
    // Note: that this hook is also decalred and used in other files, 
    //so the above expalnation holds true for those files too.
    const [user,loading] = useAuthState(auth)


    // this useEffect hook takes a call back, it takes both the existing users and the first time users
    // and set their releavant fields as returned from the user state. and the {merge:true} is to just modify
    // the user details if he has already logged in, and add a new reference when a new user has signed up
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


// we are here taking advantage of nextjs's server side rendering capabilites
// hence we use getServerSideProps function, which is run intially  (i.e.) before even rendering the
// the ui to the user. This is most oftenly used to get the all the data before rendering it to the Users

export async function getServerSideProps(context){

    // this chatRef is a reference to the chats collection in the firebase based on the id which 
    // is populated dynamically. hence it's used to get a particular chatref between two users
    // which is previously stored in the chats collection
    const chatRef = doc(collection(db,'chats'),context.query.id);

    // to getDocs is promise returning function and hence we used await,
    // it's basic functionality is to get the docs from the messages collection ordered by time stamp.
    const messagesRes = await getDocs(query(collection(chatRef,'messages'),orderBy('timestamp','asc')));

    //after we get the messageRes populated with the relevant data we should
    // we want to get the meaningful data from the returned query object hence we need to use the .map(message => ({}))
    // as it's an array object
    const messages = messagesRes.docs.map(message => ({
        id: message.id,
        ...message.data()
    })).map(message => ({
        ...message,
        timestamp: message.timestamp?.toDate().getTime()
    }));

    // to get the chatSnapshot 
    const chatSnapShot = await getDoc(chatRef);

    const chat = {
        id: chatSnapShot.id,
        ...chatSnapShot.data()
    }

    // and finally we are setting the inital props with the already populated data as above
    // this data inside of the props can be used by the above Chat component to render the
    // relevant content
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