
import styled from 'styled-components'
import {Avatar} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import {auth,db,provider} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollection} from "react-firebase-hooks/firestore";
import { signOut } from 'firebase/auth';
import EmailValidator from 'email-validator';
import {collection, query,where,addDoc} from 'firebase/firestore';
import Chat from './Chat'

function Sidebar(){

    const [user] = useAuthState(auth);
    const userChatRef = query(collection(db,'chats'), where('users', 'array-contains',user?.email));
    //console.log("userChatRef: ", userChatRef);

    const [chatsSnapshot] = useCollection(userChatRef);
    //console.log("chatSnapShot: ", chatsSnapshot);

    const createChat = ()=>{
        const input = prompt("please enter a user's email");

        if(!input){
            return null;
        }

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) &&input !== user?.email){
            const docRef =  addDoc(collection(db,'chats'),{
                users : [user?.email, input]
            })
        }
    }

    const chatAlreadyExists =  (recipientEmail)=>{
        !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0);
    }

    return(
        <Container>
            <Header>
                <TopContainer>
                    <UserAvatar src = {user?.photoURL} onClick={() => createChat()}/>
                    <IconsContainer>
                        <IconButton color="primary">
                            <ChatIcon/>
                        </IconButton>
                        <IconButton color="primary">
                            <MoreVertIcon/>
                        </IconButton>  
                    </IconsContainer>
                </TopContainer>
                <Search>
                    <SearchIcon/>
                    <SearchInput placeholder="Search in chats"/>
                </Search>
            </Header>
           
                
            
            

            {/* list of chats */}
            {chatsSnapshot?.docs.map(chat=>(
                <Chat key = {chat.id} id = {chat.id} users= {chat.data().users}/>
            ))}
            {/* <PersonsContainer>

            </PersonsContainer> */}

        </Container>
    )
}

export default Sidebar;


const Container = styled.div`
   flex: 0.45;
   border-right: 1px solid whitesmoke;
   height:100vh;
   min-width: 17rem;
   max-width:20rem;
   padding:0.5rem;
   ::-webkit-scrollbar {
		display: none !important;
	}
	-ms-overflow-style: none !important; /* IE and Edge */
	scrollbar-width: none !important; /* Firefox */
`;

const Header = styled.div`
    
    position:sticky;
    top: 0;
    background-color:white;
    z-index:1;
    align-items: center;
    padding:1rem 0.5rem;
    
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;


const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity:0.8;
    }
`;

const IconsContainer = styled.div``;


const Search = styled.div`
    display: flex;
    align-items: center;
    padding:0.5rem;
    border-radius:0.5rem;
    border: 0.1rem solid #0EA0FF;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border:none !important; 
    flex: 1; 
`;

