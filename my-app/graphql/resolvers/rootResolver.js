import {signup, login, createPost} from "./Mutation"
import { posts,user} from "./Query";
import { postedBy } from "./Post";

const resolvers = {
    Query:{
        posts,
        user
    },
    Mutation:{
        signup,
        login,
        createPost
    },
    Post:{
        postedBy
    }
}


export {resolvers};