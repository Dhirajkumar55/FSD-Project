import {db,auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs } from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';
function Test(){
    // function testing(){
    //     const [user] = useAuthState(auth);
    // }
    // async function testing(){ 
    //     const ref = await getDoc(doc(collection(db,'chats'), '5zyF9eDshMOwHb2O0RT4'));
    //     collection(ref,)
    //     console.log(ref);
    // }
   
        // const ref = doc(collection(db,'chats'), '5zyF9eDshMOwHb2O0RT4');
        // const [newRef] = useCollection(collection(ref,'messages'));
        

        const userRef = doc(collection(db,'chats'), '5zyF9eDshMOwHb2O0RT4');
        const [messagesSnapshot] = useCollection(collection(userRef, 'messages'), orderBy('timestamp', 'asc'));
        //console.log(messagesSnapshot);
        //messagesSnapshot.docs.forEach(message => console.log(message.data().timestamp));

        const chatref = doc(collection(db,"chats"),"5zyF9eDshMOwHb2O0RT4");
        //console.log(collection(chatref, 'messages'));
        getDocs(query(collection(chatref,"messages"),orderBy('timestamp','asc')))
        .then( snapshot =>{
            let messages = [];
            snapshot.docs.forEach( message => {
                messages.push({message: message.data().message, timestamp: message.data().timestamp, id:message.id});
            })
            console.log(messages);
        })
        
    
    //testing();
 

    return <div></div>;
}
export default Test;