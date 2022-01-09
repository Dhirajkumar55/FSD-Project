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
          <div className="sidebar-item comments">
          <div className="sidebar-heading" style={{ textAlign: "center" }}>
            <h1> DISCUSS </h1>
          </div>
          <div className="content">
            <ul>
              <li
                style={{
                  display: "block",
                  marginBottom: "5px",
                  paddingBottom: "5px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div className="right-content">
                  <p>
                    {" "}
                    <span
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      <b>Shankar : </b>
                    </span>{" "}
                    comment body{" "}
                  </p>
                  {/* <form
                    action="/blogs/<%=blog._id%>/comments/<%=comment._id%>?_method=DELETE"
                    method="POST"
                  >
                    <button className="btn btn-sm btn-danger"> Delete </button>
                  </form> */}
                </div>
              </li>
              <li
                style={{
                  display: "inline-block",
                  marginBottom: "5px",
                  paddingBottom: "5px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div className="right-content">
                  <p>
                    {" "}
                    <span
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      <b>Ritwik : </b>
                    </span>{" "}
                    comment body{" "}
                  </p>
                  {/* <form
                    action="/blogs/<%=blog._id%>/comments/<%=comment._id%>?_method=DELETE"
                    method="POST"
                  >
                    <button className="btn btn-sm btn-danger"> Delete </button>
                  </form> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-item submit-comment">
          <div Name="sidebar-heading">
            <h2>WANNA ADD SOMETHING ?? </h2>
          </div>
          <div className="content">
            <form
              id="comment"
              action="/blogs/<%=blog._id%>/comments"
              method="post"
            >
              <div className="row">
                <div className="col-lg-12">
                  <fieldset>
                    <textarea
                      name="comment[body]"
                      rows="6"
                      cols="100"
                      id="message"
                      placeholder="Add anything that you want to"
                      required=""
                    ></textarea>
                  </fieldset>
                </div>
                <div className="col-lg-12" style={{ paddingBottom: "2%" }}>
                  <fieldset>
                    <button
                      type="submit"
                      id="form-submit"
                      className="main-button"
                      style={{
                        display: "inline-block",
                        backgroundColor: "rgb(32, 179, 32)",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: "500",
                        padding: "12px 20px",
                        textTransform: "uppercase",
                        transition: "all .3s",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    >
                      Submit
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
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
