import {auth,db} from '../../firebase';
import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs ,addDoc} from "firebase/firestore";
import styles from  "./singlepost.module.css";
import {useRouter} from 'next/router';
import Navbar from "../../components/navbar/Navbar"

function SinglePost({title,goal,description,duration,weeklyhrs,membercount,skills,userid,name,photo,timestamp}){

    const [user]= useAuthState(auth);
    const router = useRouter();

    const docRef = doc(collection(db, 'posts'),router.query.id);

    const modifyFunctionality = ()=>{
        if(user?.email === userid){
            return  <button className = {styles.bluebtn} onClick={()=>router.push(`/newPost/modify/${router.query.id}`)}>Modify</button>
        }
    }

    return <div>
        <div >
            <Navbar/>
            <hr className={styles.hr}/>
            <div className={styles.bodydiv}>
              <div className = {styles.innerdiv}> 
                <h1 id={styles.title}>{title}</h1>
                <h2>Goal</h2>
                <div className={styles.smallestdiv}>{goal}</div>
                <h2>Description</h2>
                <div className={styles.smallestdiv}>{description}</div>
                
               
                <h2>Skills</h2>
                <div id={styles.skilldiv}>{
                    // postdata.skills.map((skill)=><div id={styles.insideSkilldiv} key={order++}>{skill}</div>)
                }</div>
                <div id={styles.btndiv}>
                    {modifyFunctionality()}
                    {/* <button className = {styles.bluebtn}onClick={deletehandle}>Delete</button> */}
                </div>
              </div>
              <div className = {styles.rightInnerdiv}>
                <h2>Duration of Project:  <span className={styles.time}> {duration} weeks</span></h2>
                <h2>Weekly Hours:  <span className={styles.time}> {weeklyhrs} hours</span></h2>
                <h2>Total Members:  <span className = {styles.time}> {membercount}</span></h2>
              </div>
                
          </div>
        </div>
    </div>
}


export default SinglePost;

export async function getServerSideProps(context){

    const docRef = doc(collection(db, 'posts'),context.query.id);
    
    const postRef = await getDoc(docRef);
    
    console.log("typeof: ",postRef.data());
    
    return {
        props : { 
            title: postRef.data().title,
            goal : postRef.data().goal,
            description: postRef.data().description,
            duration : postRef.data().duration,
            weeklyhrs : postRef.data().weeklyhrs,
            membercount : postRef.data().membercount,
            skills : postRef.data().skills,
            userid : postRef.data().userid,
            photo : postRef.data().photo,
            timestamp : postRef.data().timestamp?.toDate().getTime(),
            name: postRef.data()?.name,
        }
    }

}
