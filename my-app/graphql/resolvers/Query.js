import User from "../../models/User";
import Post from "../../models/Post";

async function posts(parent, args, context, info){
    const res = await Post.find({});
    return res;
}

export {posts};