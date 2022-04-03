import User from "../../models/User";
import Post from "../../models/Post";

async function posts(parent, args, context, info){
    const res = await Post.find({});
    return res;
}


async function user(parent, args, context, info){
    const email = args.email;
    const res = await User.findOne({email}).populate('posts').exec();
    return res;
}

export {posts,user};