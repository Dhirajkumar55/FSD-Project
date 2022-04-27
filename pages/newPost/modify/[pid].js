import {useState,useEffect,useContext} from 'react';
import {useRouter} from 'next/router'
import styles from  "../createpost.module.css";
import Restricted from '../../../components/Restricted';
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';
import {UPDATE_POST,GET_POST} from "../../../graphql/client/queries"
import {useMutation} from "@apollo/client";
import {AuthContext} from "../../../context/auth"
import {client} from "../../../graphql/client/clientSetup"

function ModifyPost({title,goal,description,duration,weeklyhrs,membercount,skills,userid}){

    const {user} = useContext(AuthContext);   //return the data of the person who is logged in and is currently in this page 
    const sameUser = user?.user_id === userid; //loggedin user validation with the person who created the post
    const router = useRouter();    //hook used to get the query in the route of this page.
    const postid = router.query.pid;    //query present in the route of this page
    const [success,setSuccess] = useState(0);    //update success message
    const [failure,setFailure] = useState(0);    //update failure message
    const [newpost,setNewpost] = useState({      //hook to store post data and update
        title:"",
        goal:"",
        description:"",
        membercount:1,
        duration:1,
        weeklyhrs:1,
        skills:[]
    })

    const [updatePost,{data,error,loading}] = useMutation(UPDATE_POST);     //refence to the collection of all posts      //referece of the required document from the collection based on the postid

    useEffect(() => {
        setNewpost({                           //this hook is called  upon redering this page first time and the values are stored in the variable created above
            title: title,
            goal : goal,
            description: description,
            duration : duration,
            weeklyhrs : weeklyhrs,
            membercount : membercount,
            skills : skills,
        });
        {/* eslint-disable-next-line*/}
    },[postid])
        


    const handleinput = (e)=>{          //updates the values of the post
        let name,value;
        name=e.target.name;
        value=e.target.value;
        if(name === "duration" || name === "weeklyhrs" || name == "membercount"){
            value = parseInt(e.target.value);
        }
        setNewpost({...newpost,[name]:value})
    }
    function taghandle(e){            //updates the tags(skills required) of the post
        let name,value,sList;
        name=e.target.name;
        value=e.target.value;
        sList=value.split(',');
        for (let i=0;i<sList.length;i++)sList[i]=sList[i].toUpperCase();
        setNewpost({...newpost,[name]:sList})
    }

    async function handlesubmit(e){         //function updates the data in firebase
        e.preventDefault();
        try{
            updatePost({variables:{...newpost}});
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
                        <input className={styles.input} type="text"  name="goal" onChange={handleinput} value={newpost.goal} required/>
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
                        <input className={styles.input} type="number" min="2" max="100" name="membercount" onChange={handleinput} value={newpost.membercount} required/>
                    </label>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the number of people you want in your team" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Duration</strong>
                    <label>
                        <input className={styles.input} type="number" min="1" max="55" name="duration" onChange={handleinput} value={newpost.duration} required/>
                    </label>
                    <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="Please add the number of weeks it takes for your project to complete" arrow>
                            <InfoOutlinedIcon/>
                    </Tooltip>
                    </div>
                    <div className={styles.innerdiv}>
                        <strong className={styles.bold}>Weekly Hours</strong>
                    <label>
                        <input className={styles.input}type="number" min="1" max="12" name="weeklyhrs" onChange={handleinput} value={newpost.weeklyhrs} required/>
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

    const id = context.query.pid;
    const {data} = await client.query({
        query:GET_POST,
        variables:{
        postId:id
        }
    });


  return {
    props: {
      title: data.post.title,
      goal: data.post.goal,
      description: data.post.description,
      duration: data.post.duration,
      weeklyhrs: data.post.weeklyhrs,
      membercount: data.post.membercount,
      skills: data.post.skills,
      userid:data.post.postedBy.id,
    },
  };
}

