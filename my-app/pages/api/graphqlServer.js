import {ApolloServer} from 'apollo-server-micro';
import dbConnect from "../../utils/dbConnect"
import Cors from 'micro-cors';
import {typeDefs} from '../../graphql/typedef';
import {resolvers} from "../../graphql/resolvers/rootResolver";

const cors = Cors();

dbConnect();

const apolloServer = new ApolloServer({typeDefs, resolvers});

const server = apolloServer.start();

export default cors(async function handler(req, res, next) {

    if(req.method === 'OPTIONS'){
        res.end();
        return false;
    }
    await server;
    await apolloServer.createHandler({
        path: "/api/graphqlServer"
    })(req,res);
});

export const config = {
    api:{
        bodyParser:false
    }
};