import { useState} from 'react';
import styles from  "./Projectpost.module.css"

function Projectpost(){
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
    let value ,name;
    function handleinput(e){
        name=e.target.name;
        value=e.target.value;
        setNewpost({...newpost,[name]:value})
    }
    async function handlesubmit(e){
        e.preventDefault();
        await fetch("http://localhost:8000/posts",{
            method:'POST',
            body:JSON.stringify(newpost),
            headers:{'Content-Type':'application/json'}
        })
        window.location.replace("/post")
    }

    return (
        <div className={styles.div}>
            <form onSubmit={handlesubmit}>
                <div>
                <label className={styles.label}>
                    ID: <input type="number" name="id" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                <label>
                    Title: <input type="text" name="title" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                <label>
                    Goal: <input type="text" name="goal" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                <label>
                    Description: <input type="text" name="description" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                <label>
                    MemberCount: <input type="number" name="membercount" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                <label>
                    Duration: <input type="number" name="duration" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                <label>
                    Weekly Hours: <input type="number" name="weeklyhrs" onChange={handleinput} required/>
                </label>
                </div>
                <div>
                    <button>Post</button>
                </div>
            </form>
        </div>
    )
}


export default Projectpost;