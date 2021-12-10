import Singlepost from "../../components/Singlepost";
import {useEffect,useState} from "react"

function Post(){
    const url="http://localhost:8000/posts";
    const [data,setData]=useState([])

    
    useEffect(()=>{
        async function getdata(){
            const res=await fetch(url);
            const jsonData=await res.json();
            setData(jsonData)
            console.log(jsonData);
        }
        getdata();
    },[])
    

    return (
         <div>
             {
            data.map((post)=><Singlepost {...post} key={post.id}/>)
            }
         </div>
    )
}

export default Post;