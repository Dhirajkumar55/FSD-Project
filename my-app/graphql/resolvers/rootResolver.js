import {signup, login, createPost} from "./Mutation"
import { posts } from "./Query";

const resolvers = {
    Query:{
        posts
    },
    Mutation:{
        signup,
        login,
        createPost
    }
}


export {resolvers};