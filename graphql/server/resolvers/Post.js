import Post from "../../../models/Post"

async function postedBy(parent, args, context, info){
    const res = await Post.findOne({_id:parent.id}).populate('postedBy').exec();
    return res.postedBy;
};

async function appliedBy(parent, args, context, info){
    const res = await Post.findOne({_id:parent.id}).populate('appliedBy').exec();
    return res.appliedBy;
};

export {postedBy,appliedBy}