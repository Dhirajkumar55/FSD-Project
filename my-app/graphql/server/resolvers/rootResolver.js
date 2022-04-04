import {signup, login, createPost,applyToPost} from "./Mutation"
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
        applyToPost
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