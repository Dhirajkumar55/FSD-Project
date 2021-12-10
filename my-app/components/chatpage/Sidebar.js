
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
                <TopContainer>
                    <UserAvatar/>
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

const SearchContainer = styled.div`
    position: fixed;
    align-items: center;
    flex :1;
`;

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

