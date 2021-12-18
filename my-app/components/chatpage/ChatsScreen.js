import styled from "styled-components";
import {Avatar, Input} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

function ChatsScreen(){
    return(
        <Container>
            <Header>
                <UserAvatar /> 
                <HeaderInformation>
                    <h3>Rec Email</h3>
                    <p>last active : Yesterday, 9:00 PM</p>
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
                <EndOfMessage/>
            </MessageContainer>


            <InputContainer onSubmit = {e => e.preventDefault()}>
                <IconButton color="primary">
                    <InsertEmoticonIcon/>
                </IconButton>
                <InputBox  placeholder="Type Something..."/>
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

const EndOfMessage = styled.div``;

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