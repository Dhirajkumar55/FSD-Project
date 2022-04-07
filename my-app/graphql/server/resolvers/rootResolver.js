import {signup, login, createPost,applyToPost,updatePost} from "./Mutation"
import { posts,user,post} from "./Query";
import { postedBy,appliedBy } from "./Post";
import {appliedTo} from "./User"

const resolvers = {
    Query:{
        posts,
        post,
        user
    },
    Mutation:{
        signup,
        login,
        createPost,
        applyToPost,
        updatePost
    },
    Post:{
        postedBy,
        appliedBy
    },
    User:{
        appliedTo
    }
}


export {resolvers};