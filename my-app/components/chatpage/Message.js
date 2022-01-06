import styled from "styled-components";
import {auth,db} from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";

function Message({user, message}){
    const [userLoggedIn] = useAuthState(auth);
    const TypeofMessage = user === userLoggedIn.email ? Sender:Receiver;

    return (
        <Container>
            {/* {message.message}
            {message.timestamp?moment(message.timestamp).format('LT'): "..."} */}
           <TypeofMessage>
               {message.message}
               <Timestamp>
                    {message.timestamp?moment(message.timestamp).format('LT'): "..."}
               </Timestamp>
            </TypeofMessage>
        </Container>
    )
}

export default Message;

const Container = styled.div``;


const MessageElement = styled.p`
	width: fit-content;
	padding: 1rem;
	border-radius: 0.8rem;
	margin: 0.5rem;
	min-width: 2rem;
    max-width: 20rem;
	padding-bottom: 1.3rem;
	position: relative;
	font-size:1.1rem;
`;

const Sender = styled(MessageElement)`
	background-color: #FFFFFF;
    color: #0EA0FF;
	margin-left: auto;
	text-align: right;
`;
const Receiver = styled(MessageElement)`
	background-color: #0EA0FF;
    color: #FFFFFF;
	text-align: left;
`;

const Timestamp = styled.span`
	padding: 0.5rem;
	font-size: 0.8rem;
	bottom: 0;
	right: 0;
	text-align: right;
`;