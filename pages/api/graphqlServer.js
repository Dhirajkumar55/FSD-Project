import {ApolloServer} from 'apollo-server-micro';
import dbConnect from "../../utils/dbConnect"
import Cors from 'micro-cors';
import {typeDefs} from '../../graphql/server/typedef';
import {resolvers} from "../../graphql/server/resolvers/rootResolver";
import {getUserId} from "../../utils/authorizationMiddleware"
import responseCachePlugin from "apollo-server-plugin-response-cache"
const cors = Cors();

dbConnect();


const apolloServer = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req}) => {
        
        // get the token from the authorization header
        const token = req.headers.authorization || "";

        // check if the token is valid and get the user details
        const user = req && req.headers.authorization? getUserId(req, token): null;
        
        return {
            ...req,
            user
        }
    },
    plugins : [responseCachePlugin()]
});

const server = apolloServer.start();

export default cors(async function handler(req, res, next) {

    if(req.method === 'OPTIONS'){
        res.status(200).end();
        return false;
    }
    await server;
    await apolloServer.createHandler({
        path: "/api/graphqlServer"
    })(req,res);
});

export const config = {
    api:{
        bodyParser:false,
    }
};