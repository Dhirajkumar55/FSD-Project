import User from "../../../models/User"

async function appliedTo(parent, args, context, info){
    const res = await User.findOne({_id: parent.id}).populate("appliedTo").exec()
    return res.appliedTo;
}

export {appliedTo};