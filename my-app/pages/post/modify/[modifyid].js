import {Router,useRouter} from "next/router"
import styles from "../Projectpost.module.css"
import {useState,useEffect} from "react"

function Modifyid(){
    const router=useRouter();
    const postid=router.query.modifyid;
    const [newpost,setNewpost] = useState({
        id : "",
        title:"",
        goal:"",
        description:"",
        membercount:"",
        duration:"",
        weeklyhrs:"",
        skills:[]
    })
    console.log(postid);
    useEffect(()=>{

        async function getdata(){
            const res=await fetch(`http://localhost:8000/posts/${postid}`)
            const data=await res.json();
            setNewpost(data)
        }
        getdata()
    },[postid])

    let value ,name;
    function handleinput(e){
        name=e.target.name;
        value=e.target.value;
        setNewpost({...newpost,[name]:value})
    }

    async function handlesubmit(e){
        e.preventDefault()
        await fetch(`http://localhost:8000/posts/${postid}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(newpost) 
        })
        router.push(`/post/${postid}`)
    }


    return(
        <div className={styles.div}>
            <form onSubmit={handlesubmit}>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Id</strong>
                <label>
                    <input className={styles.input} type="number" name="id" onChange={handleinput} value={newpost.id} required/>
                </label>
                </div>
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
    )
}

export default Modifyid;