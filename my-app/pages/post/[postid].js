import styles from "./singlepost.module.css"
import { Router, useRouter } from "next/router";
import {useEffect,useState} from "react";
import Navbar from "../../components/navbar/Navbar"

function Postid(){
    const router=useRouter();
    const postid=router.query.postid;
    console.log(postid);
    const [postdata,setPostdata]=useState({
        id : "",
        title:"",
        goal:"",
        description:"",
        membercount:"",
        duration:"",
        weeklyhrs:"",
        skills:[]
    })
    useEffect(()=>{
        async function postData(){
            const res=await fetch(`http://localhost:8000/posts/${postid}`);
            const data=await res.json();
            console.log(data)
            setPostdata(data)
        }
        postData()
    },[postid]);
    let order=1;

    async function deletehandle(){
        await fetch(`http://localhost:8000/posts/${postid}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        })
        window.location.replace("/post")
    }

    return (
        <div id={styles.maindiv}>
          <Navbar/>
          <div className={styles.bodydiv}>
              <h1 id={styles.title}>{postdata.title}</h1>
              <div className> 
                <h2>Goal</h2>
                <div className={styles.smallestdiv}>{postdata.goal}</div>
                <h2>Duration of Project:  <span className={styles.time}> {postdata.duration} weeks</span></h2>
                <h2>Weekly Hours:  <span className={styles.time}> {postdata.weeklyhrs} hours</span></h2>
                <h2>Total Members:  <span style={{fontWeight:"300"}}> {postdata.membercount}</span></h2>
                <h2>Description</h2>
                <div className={styles.smallestdiv}>{postdata.description}</div>
                <h2>Skills</h2>
                <div id={styles.skilldiv}>{
                    // postdata.skills.map((skill)=><div id={styles.insideSkilldiv} key={order++}>{skill}</div>)
                }</div>
                <div id={styles.btndiv}>
                    <button className = {styles.bluebtn}onClick={()=>router.push(`/post/modify/${postid}`)}>Modify</button>
                    <button className = {styles.bluebtn}onClick={deletehandle}>Delete</button>
                </div>
              </div>
          </div>
        </div>
    )
}


export default Postid;