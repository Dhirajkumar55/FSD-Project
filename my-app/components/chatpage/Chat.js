import styled from "styled-components";
import {Avatar} from '@mui/material'
import getRecipientEmail from "../../lib/getRecipientEmail";
import {auth,db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore'
import {collection, query,where} from 'firebase/firestore';
import {useRouter} from 'next/router';
import LoadingUsers from "./LoadingUsers";

function Chat({id,users}){

    const router = useRouter();
    const [user] = useAuthState(auth)
    const [recipientSnapshot, loading] = useCollection(query(collection(db,'users'),where('email','==', getRecipientEmail(users,user))));
    
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users,user);

    
    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }

    if(loading) return <LoadingUsers/>
    else
        return(
            <Container onClick = {enterChat}>
                {recipient ? (
                    <UserAvatar src = {recipient?.photo}/>
                    ):(
                        <UserAvatar/>
                    )
                }
                
                <p>{recipientEmail}</p>
            </Container>
        )
}

export default Chat;


const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding:1rem;
    border-radius:1rem;
    word-break: break-word;
    :hover{
        color:white;
        background-color:#0EA0FF
    }

`;

const UserAvatar = styled(Avatar)`
    margin: 0.5rem;
    margin-right:1rem;
`;