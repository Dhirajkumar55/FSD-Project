import {useState,useEffect} from 'react';
import {useRouter} from 'next/router'
import {db,auth} from '../../../firebase';
import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs ,addDoc, updateDoc} from "firebase/firestore";
import styles from  "../createpost.module.css";
import Restricted from '../../../components/Restricted';
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';

function ModifyPost({title,goal,description,duration,weeklyhrs,membercount,skills,userid}){

    const [user] = useAuthState(auth);
    const sameUser = user?.email == userid;
    const router = useRouter();
    const postid = router.query.pid;
    const [success,setSuccess] = useState(0);
    const [failure,setFailure] = useState(0);
    const [newpost,setNewpost] = useState({
        title:"",
        goal:"",
        description:"",
        membercount:0,
        duration:0,
        weeklyhrs:0,
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
        if(name === "duration" || name === "weeklyhrs" || name == "membercount"){
            value = parseInt(e.target.value);
        }
        setNewpost({...newpost,[name]:value})
    }
    function taghandle(e){
        let name,value,sList;
        name=e.target.name;
        value=e.target.value;
        sList=value.split(',');
        for (let i=0;i<sList.length;i++)sList[i]=sList[i].toUpperCase();
        setNewpost({...newpost,[name]:sList})
    }

    async function handlesubmit(e){
        e.preventDefault();
        try{
            await updateDoc(docRef,{
                ...newpost
            })
            setSuccess(1);
            router.push(`/newPost/${postid}`);
        }
        catch(err){
            setFailure(1);
        }
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
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add a title for your post" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Goal</strong>
                    <label>
                        <input className={styles.input} type="text" name="goal" onChange={handleinput} value={newpost.goal} required/>
                    </label>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add a goal for your post" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Description</strong>
                    <label>
                        <input className={styles.input} type="text" name="description" onChange={handleinput} value={newpost.description} required/>
                    </label>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add a description for your post" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Total Members</strong>
                    <label>
                        <input className={styles.input} type="number" name="membercount" onChange={handleinput} value={newpost.membercount} required/>
                    </label>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the number of people you want in your team" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Duration</strong>
                    <label>
                        <input className={styles.input} type="number" name="duration" onChange={handleinput} value={newpost.duration} required/>
                    </label>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the number of weeks it takes for your project to complete" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Weekly Hours</strong>
                    <label>
                        <input className={styles.input}type="number" name="weeklyhrs" onChange={handleinput} value={newpost.weeklyhrs} required/>
                    </label> 
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the how much hours per week it takes for your project to complete" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Skills</strong>
    
                    <input className={styles.input} type="text" name="skills" onChange={taghandle} value={newpost.skills}  required/>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the skills as comma seperated values" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                </div>
                    <div className={styles.innerdiv}>
                        <button className={styles.btn}>Modify</button>
                    </div>
                </form>
                {success?(<Alert onClose={() => {setSuccess(0)}}>Your Post has been successfully updated</Alert>
                     ):(<div></div>)}

                {failure?(<Alert severity="error" onClose={() => {setFailure(0)}}>There was an Error while updating your Post</Alert>
                     ):(<div></div>)}
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

