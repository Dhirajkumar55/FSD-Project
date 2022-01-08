import {auth,db} from '../../firebase';
import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore"
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs } from "firebase/firestore";




function Posts(){
    const [user] = useAuthState(auth);
    const postRef = collection(db,'posts');
    const [posts] = useCollection(postRef);


    const showPosts = () =>{
        if(posts){
            return posts.docs.map( post => {
                return <Post
                    key = {post.id}
                    user = {post.data().user}
                    post = {{
                        ...post.data(),
                        timestamp: post.data().timestamp?.toDate().getTime(),
                    }}
                />
            })
        }
    }

    return (
        <div>
            {showPosts()}
        </div>
    )
}

export default Posts;


const Post = styled.div`

`;