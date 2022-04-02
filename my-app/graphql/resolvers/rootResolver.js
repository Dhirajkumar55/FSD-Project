import {signup, login} from "./Mutation"

const resolvers = {
    Mutation:{
        signup,
        login
    }
}


export {resolvers};