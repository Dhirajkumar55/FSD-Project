import { useRouter } from "next/router";

function Postid(){
    const router=useRouter();
    const post=router.query.postid;

    return (
        <div>This is a post of post id={post}</div>
    )
}


export default Postid;