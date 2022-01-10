import { auth, db } from "../../firebase";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import worko from "../../public/worko.svg";
import Image from "next/image";
import { useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {doc,serverTimestamp,setDoc,query,where,collection,getDocs,getDoc,orderBy,docs,addDoc} from "firebase/firestore";
import styles from "./singlepost.module.css";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";
import {useCollection} from "react-firebase-hooks/firestore";
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';




function SinglePost({title,goal,description,duration,weeklyhrs,membercount,skills,userid,name,photo,timestamp}) {
  const [user] = useAuthState(auth);                   //return the data of the person who is logged in and is currently in this page 
  const router = useRouter();       //hook used to get the query in the route of this page.


  const docRef = doc(collection(db, "posts"), router.query.id);     //returns the data from firebase based on the router query
  const [responseRef]=useCollection(collection(docRef,"AppliedBy"));  //returns the data of the people who applied for a post.
  responseRef?.docs?.map((response)=>{console.log(response)})




  const [mdl, setMdl] = useState(false);    //Modal for Apply and see Responses Button
  const [applyformdata, setApplyformdata] = useState({        //hook to collect data from the apply form
    ques1: "",
    ques2: "",
    ques3: "",
  });

  

  const applyDataHandle = (e) => {                            //function to get data from the apply form
    let name = e.target.name;
    let value = e.target.value;
    setApplyformdata({ ...applyformdata, [name]: value });
    console.log(applyformdata);
  };



  function handleApply(e) {                                //this function sends the data to firebase upon clicking submit in apply form
    e.preventDefault();
    const applyRef = collection(docRef, "AppliedBy");
    addDoc(applyRef, {
      ...applyformdata,
      timestamp: serverTimestamp(),
      name: user?.displayName,
      photo: user?.photoURL,
      userid: user?.email,
    });
    setMdl(false);
  }



  const modifyFunctionality = () => {         //this function checks if the user loggedin is the person who created the post. if(yes)shows the modify and see response buttons.
    if (user?.email === userid) {
      return (
        <div style={{"textAlign":"center"}}>
          <div>
        <Button variant="contained"  onClick={() => router.push(`/newPost/modify/${router.query.id}`)} size="medium">Modify</Button>
          </div>
          <div>
        <Button variant="contained" style={{"marginTop":"1rem"}} size="medium" onClick={()=>{setMdl(true)}}>See responses</Button>
          </div>
          <div>

          <Modal
                open={mdl}
                onClose={() => {
                  setMdl(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                  {
                    responseRef?.docs?.map((response)=>{return (
                      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",margin:"0.5rem"}}>
                      <div style={{display:"flex",flexDirection:"column"}}>
                        <div style={{display:"flex",flexDirection:"row",fontSize:"0.9rem"}}>&nbsp;<strong>{response.data().name}</strong>({response.data().userid})<Tooltip color="primary" title="Send a message to this email address in the chats page." arrow><InfoOutlinedIcon/></Tooltip></div>
                        <div style={{fontSize:"0.85rem"}}><strong>&nbsp;&nbsp;&nbsp;Ans1.&nbsp;</strong>{response.data().ques1}</div>
                        <div style={{fontSize:"0.85rem"}}><strong>&nbsp;&nbsp;&nbsp;Ans2.&nbsp;</strong>{response.data().ques2}</div>
                        <div style={{fontSize:"0.85rem"}}><strong>&nbsp;&nbsp;&nbsp;Ans2&nbsp;</strong>{response.data().ques3}</div>
                      </div>
                      </div>
                    )})
                  }
                </Box>

          </Modal>
          </div>
        </div>
      );
    }
  };



  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <div>
        <Navbar />
        <hr className={styles.hr} />
        <div className={styles.bodydiv}>
          <div className={styles.innerdiv}>
            <h1 id={styles.title}>{title}</h1>  

            <h2>Goal</h2>
            <div className={styles.smallestdiv}>{goal}</div>
            <h2>Description</h2>
            <div className={styles.smallestdiv}>{description}</div>

            <h2>Skills</h2>
            <div id={styles.skilldiv}>    
              {
                skills.map((skill)=><div id={styles.insideSkilldiv} key={userid}>{skill}</div>)
              }
            </div>
            <h2>
              Duration of Project:{" "}
              <span className={styles.time}> {duration} weeks</span>
            </h2>
            <h2>
              Weekly Hours:{" "}
              <span className={styles.time}> {weeklyhrs} hours</span>
            </h2>
            <h2>
              Total Members: <span className={styles.time}> {membercount}</span>
            </h2>
          </div>
          <div className={styles.rightInnerdiv}>
            <Image src={worko} alt="workup" width="400" height="400" />
            <div id={styles.btndiv}>
              {modifyFunctionality()}
            </div>
            {user?.email === userid?(
              <div></div>
            ):(
              <div>
              <Button
                variant="contained"
                className={styles.new_button}
                size="medium"
                onClick={() => {
                  setMdl(true)
                }}
              >
                Apply
              </Button>
              <Modal
                open={mdl}
                onClose={() => {
                  setMdl(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "1rem 0rem 1rem 0rem",
                    }}
                  >
                    <p>What are the skills you have in the given jobpost?</p>
                    <TextField
                      id="standard-basic"
                      label="answer"
                      name="ques1"
                      variant="standard"
                      type="string"
                      onChange={applyDataHandle}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "1rem 0rem 1rem 0rem",
                    }}
                  >
                    <p>Why do you think you are fit for the job?</p>
                    <TextField
                      id="standard-basic"
                      label="answer"
                      name="ques2"
                      variant="standard"
                      type="string"
                      onChange={applyDataHandle}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "1rem 0rem 1rem 0rem",
                    }}
                  >
                    <p>Describe about yourself in one sentence.</p>
                    <TextField
                      id="standard-basic"
                      label="answer"
                      name="ques3"
                      variant="standard"
                      type="string"
                      onChange={applyDataHandle}
                    />
                  </div>
                  <Button variant="contained" onClick={handleApply}>Submit</Button>
                </Box>
              </Modal>
            </div>
            )}
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
  );
}

export default SinglePost;

export async function getServerSideProps(context) {
  const docRef = doc(collection(db, "posts"), context.query.id);     

  const postRef = await getDoc(docRef);

  console.log("typeof: ", postRef.data());

  return {
    props: {
      title: postRef.data().title,
      goal: postRef.data().goal,
      description: postRef.data().description,
      duration: postRef.data().duration,
      weeklyhrs: postRef.data().weeklyhrs,
      membercount: postRef.data().membercount,
      skills: postRef.data().skills,
      userid: postRef.data().userid,
      photo: postRef.data().photo,
      timestamp: postRef.data().timestamp?.toDate().getTime(),
      name: postRef.data()?.name,
    },
  };
}
