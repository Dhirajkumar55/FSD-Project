import styled from "styled-components";
import {auth,db} from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";

function Message({user, message}){
    const [userLoggedIn] = useAuthState(auth);
	// this is to check whether the user who is sending the message is a sender or Receiver
	// perform the necessary stylings.
    const TypeofMessage = user === userLoggedIn.email ? Sender:Receiver;
	const Timestamp = user === userLoggedIn.email ? SenderTimestamp:ReceiverTimestamp;

    return (
        <Container>
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
	padding-bottom: 1.5rem;
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

const SenderTimestamp = styled.span`
	padding: 0.5rem;
	font-size: 0.7rem;
	bottom: 0;
	left: 0;
	text-align: right;
	position:absolute;
`;

const ReceiverTimestamp = styled.span`
	padding: 0.5rem;
	font-size: 0.7rem;
	bottom: 0;
	right: 0;
	text-align: right;
	position:absolute;
`;