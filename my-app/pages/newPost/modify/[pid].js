import {useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import {db} from '../../../firebase';
import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs ,addDoc, updateDoc} from "firebase/firestore";
import styles from  "../createpost.module.css";
import Restricted from '../../../components/Restricted';


function ModifyPost({title,goal,description,duration,weeklyhrs,membercount,skills,userid}){

    const [user] = useAuthState(auth);
    const sameUser = user?.email == userid;
    const router = useRouter();
    const postid = router.query.pid;
    const [newpost,setNewpost] = useState({
        title:"",
        goal:"",
        description:"",
        membercount:"",
        duration:"",
        weeklyhrs:"",
        skills:[]
    })

    const colRef = collection(db, 'posts');
    const docRef = doc(colRef,postid);

    useEffect(() => {
        setNewpost({
            title: title,
            goal : goal,
            description: description,
            duration : duration,
            weeklyhrs : weeklyhrs,
            membercount : membercount,
            skills : skills,
        });
    },[postid])
        


    const handleinput = (e)=>{
        let name,value;
        name=e.target.name;
        value=e.target.value;
        setNewpost({...newpost,[name]:value})
    }


    async function handlesubmit(e){
        e.preventDefault();
        await updateDoc(docRef,{
            ...newpost
        })
        router.push(`/newPost/${postid}`)
    }



    return (
        <div>
            {sameUser?(
                <div className={styles.div}>
                <form onSubmit={handlesubmit}>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Title</strong>
                    <label>
                        <input className={styles.input} type="text" name="title" onChange={handleinput} value={newpost.title} required/>
                    </label>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Goal</strong>
                    <label>
                        <input className={styles.input} type="text" name="goal" onChange={handleinput} value={newpost.goal} required/>
                    </label>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Description</strong>
                    <label>
                        <input className={styles.input} type="text" name="description" onChange={handleinput} value={newpost.description} required/>
                    </label>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Total Members</strong>
                    <label>
                        <input className={styles.input} type="number" name="membercount" onChange={handleinput} value={newpost.membercount} required/>
                    </label>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Duration</strong>
                    <label>
                        <input className={styles.input} type="number" name="duration" onChange={handleinput} value={newpost.duration} required/>
                    </label>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Weekly Hours</strong>
                    <label>
                        <input className={styles.input}type="number" name="weeklyhrs" onChange={handleinput} value={newpost.weeklyhrs} required/>
                    </label> 
                    </div>
                    <div className={styles.innerdiv}>
                        <button className={styles.btn}>Modify</button>
                    </div>
                </form>
                </div>
            ):(
                <Restricted/>
            )
        }
        </div>
       
    )
}

export default ModifyPost;

export async function getServerSideProps(context){

    //console.log("id: ",context.query.pid);

    const docRef = doc(collection(db, 'posts'),context.query.pid);

    const postRef = await getDoc(docRef);
    
    
    console.log("typeof: ",typeof postRef.data());
    
    return {
        props : { 
            title: postRef.data().title,
            goal : postRef.data().goal,
            description: postRef.data().description,
            duration : postRef.data().duration,
            weeklyhrs : postRef.data().weeklyhrs,
            membercount : postRef.data().membercount,
            skills : postRef.data().skills,
            userid: postRef.data().userid,
        }
    }
}

