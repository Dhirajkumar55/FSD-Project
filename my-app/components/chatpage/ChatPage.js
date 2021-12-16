import styled from "styled-components";
import Sidebar from "./Sidebar";
import ChatsScreen from "./ChatsScreen";


function ChatPage(){

    return (
        <Container>
            <Sidebar/>
            <ChatsContainer>
                <ChatsScreen/>
            </ChatsContainer>
        </Container>
    )

}


export default ChatPage;


const Container = styled.div`
    display:flex;
`;

const ChatsContainer = styled.div`
    flex: 1;
    height:100vh
    overflow: scroll;
`;