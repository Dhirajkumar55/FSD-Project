
import styled from 'styled-components'
import {Avatar} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

function Sidebar(){

    return(
        <Container>
            <Header>
                <UserAvatar/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>  
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search in chats"/>
            </Search>


            {/* list of chats */}
            {/* <PersonsContainer>

            </PersonsContainer> */}

        </Container>
    )
}

export default Sidebar;


const Container = styled.div`
   
`;

const Header = styled.div`
    display: flex;
    position:sticky;
    top: 0;
    background-color:white;
    z-index:1;
    justify-content: space-between;
    align-items: center;
    padding:1rem;
    border-bottom: 0.1rem solid whitesmoke;
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

