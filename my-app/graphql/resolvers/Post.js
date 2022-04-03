import Post from "../../models/Post"

async function postedBy(parent, args, context, info){
    const res = await Post.findOne({_id:parent.id}).populate('postedBy').exec();
    return res.postedBy;
};

export {postedBy}