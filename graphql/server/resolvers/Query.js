import User from "../../../models/User";
import Post from "../../../models/Post";

async function posts(parent, args, context, info){
    if(args?.filter){
        const val = args?.filter;
        const res = await Post.find({postedBy:val});
        return res;
    }

    if(args?.orderBy?.duration){
        const val = args.orderBy.duration === "asc"?"duration":"-duration";
        const res = await Post.find({}).sort(val).exec();
        return res;
    }

    else if(args?.orderBy?.createdAt){
        const val = args.orderBy.createdAt === "asc"?"createdAt":"-createdAt";
        const res = await Post.find({}).sort(val).exec();
        return res;
    }

    else if(args?.orderBy?.membercount){
        const val = args.orderBy.membercount === "asc"?"membercount":"-membercount";
        const res = await Post.find({}).sort(val).exec();
        return res;
    }

    const res = await Post.find({});
    return res;
}


async function user(parent, args, context, info){
    const email = args.email;
    const res = await User.findOne({email}).populate('posts').exec();
    return res;
}

async function post(parent, args, context, info){
    const id = args.id;
    const res = await Post.findById(id);
    return res;
}

export {posts,user,post};