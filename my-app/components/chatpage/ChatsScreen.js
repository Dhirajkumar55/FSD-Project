import styled from "styled-components";
import {useState,useRef} from 'react';
import {Avatar, Input} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {auth,db} from '../../firebase';
import {collection,query,where, doc, orderBy, serverTimestamp, addDoc, setDoc, getDocs} from 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from 'react-firebase-hooks/firestore';
import {useRouter} from 'next/router';
import Message from './Message';
import getRecipientEmail from '../../lib/getRecipientEmail';
import TimeAgo from "timeago-react";


function ChatsScreen({chat, messages}){

    const [user]= useAuthState(auth);
    // we are going to set the input state initally as "" using the react's useState() hook.
    // by this we can track the data.
    const [input, setInput] = useState("");
    const endOfMessageRef = useRef(null);
    const router = useRouter();
    const userRef = doc(collection(db,'chats'), router.query.id);
    const [messagesSnapshot] = useCollection(query(collection(userRef, 'messages'),orderBy('timestamp','asc')));

    //this show Messages function is executed when the user clicks some button with user's email id
    // in the SiderBar component.
    //the data is transferred as a props data to the Message Component which in turn is used to 
    // differentiate and display the messages to user based on whether they are sent or received.
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => {
                    return <Message
                        key={message.id}
                        user={message.data().user}
                        message={{
                            ...message.data(),
                            timestamp: message.data().timestamp?.toDate().getTime(),
                        }}
                    />;
                })
        }
        return JSON.parse(messages).map(message => (
            <Message key={message.id} user={message.user} message={message} />
        ));
    }

    
    // this is the function which is executed when the user clicks the enter button, 
    // after entering the text in the input box
    const sendMessage = (e) => {
        e.preventDefault();

        //update their last seen - the logic behind this is to show that the user is active and he is
        // chatting
        setDoc(doc(db,'users',user.uid),{
            lastSeen : serverTimestamp(),
        },{merge:true});

        const docRef = collection(db,'chats');
        console.log(docRef);

        // this is to add the messages in firebase using the addDoc and it's a promise based one.
        addDoc(collection(doc(collection(db,'chats'), router.query.id), 'messages'),{
            timestamp : serverTimestamp(),
            message: input,
            user: user.email,
            photo: user.photoURL,
        })

        //this is to set the input box back again to ""
        setInput("");
        // this scrollToMessageEnd is a function which shows the latest message that is sent.
        scrollToMessageEnd();
    }

    const scrollToMessageEnd = () => {
		endOfMessageRef.current.scrollIntoView({
			behaviour: "smooth",
			block: "start",
		});
	};


    // te getRecipientEmail function gets the email id of the person whom we are sending a message to...
    // and this recipientSnapshot is to just show to the user that whom he is sending a message to
    const [recipientSnapshot]= useCollection(query(collection(db, "users"), where("email", "==", getRecipientEmail(chat.users, user))));
    const recipientEmail = getRecipientEmail(chat.users, user);
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    return(
        <Container>
            <Header>
                {recipient?(
                        <UserAvatar  src={recipient?.photo}/>
                    ):(
                        <UserAvatar/>
                    )
                }
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot?(
                        <p>Last active: {''}
                        {recipient?.lastSeen?.toDate() ?(
                                <TimeAgo datetime = {recipient.lastSeen?.toDate()}/>
                            ):(
                                "Unavaliable"
                            )
                        }
                        </p>   
                    ):(
                        <p>Loading last active ...</p>
                    )
                }
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton color="primary">
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton color="primary">
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>


            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>


            <InputContainer onSubmit = {e => e.preventDefault()}>
                <IconButton color="primary">
                    <InsertEmoticonIcon/>
                </IconButton>
                <InputBox  
                    value={input}
					onChange={e => setInput(e.target.value)}
					placeholder="Type a message"
                />
                <button hidden disabled = {!input} type="submit" onClick={sendMessage}></button>
            </InputContainer>
        </Container>
    )
}

export default ChatsScreen;


const Container = styled.div`
`;

const Header = styled.div`
    position:sticky;
    background-color:White;
    z-index:1;
    top: 0;
    display: flex;
    padding: 1rem;
    align-items:center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left:1.1rem;
    flex: 1;

`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity:0.8;
    }
`;
const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding:3rem;
    background-color: #e5ded8;
    min-height:90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 3rem;
`;

const InputContainer = styled.form`
    display: flex;
    align-items:center;
    padding: 1rem;
    position:sticky;
    bottom: 0;
    background-color:white;
    z-index:100;

`;

const InputBox = styled.input`
    flex: 1;
    align-items:center;
    padding: 1.2rem;
    position: sticky;
    background-color:white;
    bottom: 0;
    z-index:100;
    border-radius:0.5rem;
    border: 0.1rem solid #0EA0FF;
    margin-left:1.5rem;
    margin-left:1.5rem;

`;