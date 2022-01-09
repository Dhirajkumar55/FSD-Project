import {useState} from 'react';
import {auth,db} from '../../firebase';
import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore"
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs ,addDoc} from "firebase/firestore";
import styles from  "./createpost.module.css"
import {useRouter} from "next/router"


function CreatePost(){
    const router=useRouter()
    const [user] = useAuthState(auth);
    console.log(user?.email);
    const [newpost,setNewpost] = useState({
        title:"",
        goal:"",
        description:"",
        membercount:"",
        duration:"",
        weeklyhrs:"",
        skills:[]
    })

    const handleinput = (e)=>{
        let name,value;
        name=e.target.name;
        value=e.target.value;
        setNewpost({...newpost,[name]:value})
    }
    function taghandle(e){
        let name,value,sList;
        name=e.target.name;
        value=e.target.value;
        sList=value.split(',');
        setNewpost({...newpost,[name]:sList})
    }

    const handlesubmit = (e)=>{
        e.preventDefault();
        const newColRef = collection(db,'posts');
        addDoc(newColRef,{
            userid :  user?.email,
            ...newpost,
            timestamp:serverTimestamp(),
            photo:user.photoURL,
        })
        router.push('/newPost');
    }

    return (
        <PostContainer>
            <div className={styles.div}>
            <form onSubmit={handlesubmit}>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Title</strong>
                <label>
                    <input className={styles.input} type="text" name="title" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Goal</strong>
                <label>
                    <input className={styles.input} type="text" name="goal" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Description</strong>
                <label>
                    <textarea className={styles.input} type="text" name="description" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Total Members</strong>
                <label>
                    <input className={styles.input} type="number" name="membercount" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Duration</strong>
                <label>
                    <input className={styles.input} type="number" name="duration" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Weekly Hours</strong>
                <label>
                    <input className={styles.input}type="number" name="weeklyhrs" onChange={handleinput} required/>
                </label> 
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Skills</strong>
    
                    <input className={styles.input} type="text" name="skills" onChange={taghandle} required/>
                 
                </div>
                <div className={styles.innerdiv}>
                    <button className={styles.btn}>Post</button>
                </div>
            </form>
        </div>
        </PostContainer>
    )

}

export default CreatePost;

const PostContainer = styled.div`

`;