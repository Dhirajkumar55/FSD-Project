import {useState} from 'react';
import styles from  "./createpost.module.css"
import {useRouter} from 'next/router';
import Restricted from '../../components/Restricted';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../../context/auth';
import {useContext} from "react"
import {CREATE_POST} from "../../graphql/client/queries"
import {useMutation} from "@apollo/client"

function CreatePost(){
    const router = useRouter();                  //hook used to get the query in the route of this page.
    const {user} = useContext(AuthContext);           //return the data of the person who is logged in and is currently in this page 

    const [success,setSuccess] = useState(0);   //hook to show success message when the post is created
    const [failure,setFailure] = useState(0);   //hook to show failed message when the post is not created

    const [newpost,setNewpost] = useState({    //hook to store data of the post i.e. created
        title:"",
        goal:"",
        description:"",
        membercount:0,
        duration:0,
        weeklyhrs:0,
        skills:[]
    })

    const [addPost,{data,err,loading}] = useMutation(CREATE_POST,{
        update(_,{data:{createPost:data}}){
            console.log(data);
        }
    });

    const handleinput = (e)=>{           //function to collect data from form and store in hook.
        let name,value;
        name=e.target.name;
        value=e.target.value;
        if(name === "duration" || name === "weeklyhrs" || name == "membercount"){
            value = parseInt(e.target.value);
            console.log("name: ",name , typeof value);
        }
        setNewpost({...newpost,[name]:value})
    }
    function taghandle(e){           //function to get the tag data(skills),convert it to an object and store in the hook 
        let name,value,sList; 
        name=e.target.name;
        value=e.target.value;
        sList=value.split(',');
        for (let i=0;i<sList.length;i++)sList[i]=sList[i].toUpperCase();
        setNewpost({...newpost,[name]:sList})
    }

    const handlesubmit = async (e)=>{              //function that sends data to the firebase after submission.
        e.preventDefault();
        try{
            console.log(newpost)
            const postid=await addPost({variables:{title:newpost.title, description:newpost.description ,goal: newpost.goal, membercount:newpost.membercount, duration:newpost.duration, weeklyhrs:newpost.weeklyhrs, skills:newpost.skills,}})
            console.log("postid:",postid)
            router.push(`/newPost/${postid?.data?.createPost?.id}`);
            setSuccess(1);
        }catch(err){
            setFailure(1);
        }
        
    }



    return (
        <div>
            {
                user?
                (<div className={styles.div}>
                    <form onSubmit={handlesubmit}>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Title</strong>
                            <label>
                                <input className={styles.input} type="text" name="title" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add a title for your post" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Goal</strong>
                            <label>
                                <input className={styles.input} type="text" name="goal" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add a goal for your post" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Description</strong>
                            <label>
                                <textArea className={styles.input} type="text" name="description" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add a description for your post" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Total Members</strong>
                            <label>
                                <input className={styles.input} type="number" min="2" max="100" name="membercount" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the number of people you want in your team" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Duration</strong>
                            <label>
                                <input className={styles.input} type="number" min="1" max="55" name="duration" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the number of weeks it takes for your project to complete" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Weekly Hours</strong>
                            <label>
                                <input className={styles.input}type="number" min="1" max="12" name="weeklyhrs" onChange={handleinput} required/>
                            </label> 
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the how much hours per week it takes for your project to complete" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Skills</strong>
    
                    <input className={styles.input} type="text" name="skills" onChange={taghandle} required/>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the skills as comma seperated values" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                        <div className={styles.innerdiv}>
                            <button className={styles.btn}>Post</button>
                        </div>
                    </form>
                    {success?(<Alert onClose={() => {setSuccess(0)}}>Your Post has been successfully posted, and you will be redirected to the post page in 2s</Alert>
                     ):(<div></div>)}

                    {failure?(<Alert severity="error" onClose={() => {setFailure(0)}}>There was an Error while posting your Post</Alert>
                     ):(<div></div>)}
                </div>
                ):(
                    <Restricted/>
                )
            }
            
        </div>
    )

}

export default CreatePost;

